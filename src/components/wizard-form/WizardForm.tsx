import { ChangeEvent, useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { phoneNumberAutoFormat } from "../../utils";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useGetMoviesQuery } from "../../store/services/movie";
import { setPurchase } from "../../store/features/purchase/purchaseSlice";

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

//Types
type Movie = {
    title: string,
    url: string,
    poster: string,
    description: string,
    rating: number,
    images: Array<string>,
    featured: boolean
}
const WizardForm = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [seat, setSeat] = useState<string>()
    const [name, setName] = useState<string>()
    const [step, setStep] = useState<number>(1)
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>();
    const { refetch } = useGetMoviesQuery('film');
    const [date, setDate] = useState<Date>(new Date())
    const { movies } = useAppSelector((state) => state.movie);
    const [selectedMovie, setSelectedMovie] = useState<string>()
    const [seats, setSeats] = useState<Array<any> | undefined>(undefined);

    const next = () => {
        setStep(step + 1);
    }
    const prev = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }
    const reset = () => {
        setDate(new Date())
        setName(undefined)
        setSeat(undefined)
        setEmail(undefined)
        setPhone(undefined)
        setSelectedMovie(undefined)
    }
    const onHandleSubmit = (event: any) => {
        event.preventDefault()
        let valid = false
        if (step === 1) {
            valid = validate([selectedMovie, date, seat]);
            if (valid)
                next()
        }
        if (step === 2) {
            valid = validate([name, email, phone]);
            if (valid) {
                const purchase = {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "movie": selectedMovie,
                    "date": date,
                    "seat": seat
                }
                dispatch(setPurchase(purchase))
                navigate('/thanks')
            }
        }

        if (!valid)
            toast.error('El formulario contiene errores', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
    }
    const validate = (arr: Array<any>) => {
        return Array.from(arr).every(field => field !== undefined);
    }
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = phoneNumberAutoFormat(e.target.value);
        setPhone(targetValue);
    }
    const randomSeats = () => {
        const arr: Array<{ row: number, seat: number }> = [];
        for (let i = 0; i < 10; i++) {
            const x = Math.floor(Math.random() * 20) + 1;
            if ((arr.length > 0) && arr.find(s => s.seat === x)) {
                i = i - 1;
            } else {
                if ((x > 20) === false) {
                    arr.push({ row: Math.floor(Math.random() * 10) + 1, seat: x });
                }
            }
        }
        const sortedArr = arr.sort((a, b) => a.row - b.row);
        setSeats(sortedArr);
    }

    useEffect(() => {
        if (!movies) {
            refetch()
        }
        if (slug) {
            setSelectedMovie(slug)
        }
        randomSeats()
    }, [movies, refetch, slug])

    return (
        <>
            <form id="ticket-form" noValidate onSubmit={onHandleSubmit}>
                {(step === 1) && (
                    <>
                        <div className="mb-4 form-group">
                            <label htmlFor="movie" className="small text-white">Seleccione película</label>
                            <Form.Select id="movie" className="form-select form-select-lg mb-3" value={selectedMovie} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedMovie(e.target.value)} required>
                                <option>Open this select menu</option>
                                {movies.map((m: Movie, idx: number) => (
                                    <option key={idx} value={m.title.replaceAll(' ', '-').toLowerCase()}>{m.title}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="mb-4 form-group">
                            <label htmlFor="funcion">Seleccione función</label>
                            <DatePicker
                                id="funcion"
                                selected={date}
                                onChange={(d: any) => setDate(d)}
                                showTimeInput={true}
                                onChangeRaw={(e: ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))}
                                placeholderText="mm/dd/yyyy:HH:mm"
                                dateFormat={'MM/dd/yyyy HH:mm'}
                                className={"form-control position-relative"}
                                wrapperClassName="w-100"
                            />
                        </div>
                        <div className="mb-4 form-group">
                            <label htmlFor="asiento">Seleccione Asiento</label>
                            <Form.Select id="asiento" className="form-select form-select-lg mb-3" value={seat} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSeat(e.target.value)} required>
                                <option>Open this select menu</option>
                                {seats?.map((s: { row: number, seat: number }, idx: number) => (
                                    <option value={`Fila ${s.row} - Asiento - ${s.seat}`} key={idx}>{`Fila ${s.row} - Asiento - ${s.seat}`}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </>
                )}

                {(step === 2) && (
                    <>
                        <div className="mb-3 form-group">
                            <label htmlFor="name" className="small text-white">Nombre completo</label>
                            <Form.Control type="text" name="name" className="form-control" id="nombre" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="email">E-mail</label>
                            <Form.Control id="email" type="email" className="form-control" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <Form.Control type="tel" name="phone" id="telefono" className="form-control" value={phone} onChange={onChangePhone} maxLength={11} required />
                        </div>
                    </>
                )}

                <div id="buttons" className="mt-5 d-flex justify-content-end">
                    {(step === 1) && (
                        <>
                            <button
                                type="submit"
                                className="px-5 btn btn-outline-primary btn-lg text-white">Continuar</button>
                            <button type="button" className="px-5 btn btn-lg text-secondary" onClick={reset}>Reiniciar</button>
                        </>
                    )}
                    {(step === 2) && (
                        <>
                            <button
                                type="submit"
                                className="px-5 btn btn-success border-primary btn-lg text-white"
                            >Finalizar</button>
                            <button
                                type="button"
                                className="px-5 btn btn-lg text-secondary"
                                onClick={prev}>Volver</button>
                        </>
                    )}
                </div>
                <ToastContainer />
            </form>
        </>
    );
};

export { WizardForm };