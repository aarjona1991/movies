import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import { phoneNumberAutoFormat } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useGetMoviesQuery } from "../../store/services/movie";
import { setPurchase } from "../../store/features/purchase/purchaseSlice";

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

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
    const [step, setStep] = useState<number>(1)
    const { refetch } = useGetMoviesQuery('film');
    const { movies } = useAppSelector((state) => state.movie);
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
        formik.resetForm()
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
        randomSeats()
    }, [movies, refetch, slug])

    const arrValidationSchema = [
        Yup.object().shape({
            selectedMovie: Yup.string()
                .required('Required'),
            date: Yup.string()
                .required('Required'),
            seat: Yup.string()
                .required('Required'),
        }),
        Yup.object().shape({
            name: Yup.string()
                .min(4, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string()
                .required('Required'),
        })
    ]

    const formik = useFormik({
        initialValues: {
            name: '',
            seat: '',
            email: '',
            phone: '',
            date: new Date().toISOString(),
            selectedMovie: slug ? slug : '',
        },
        validationSchema: arrValidationSchema[step - 1],
        onSubmit: values => {
            if (step === 1) {
                next()
            }
            if (step === 2) {
                dispatch(setPurchase(values))
                navigate('/thanks')
            }
        },
    });

    return (
        <>
            <form id="ticket-form" noValidate onSubmit={formik.handleSubmit}>
                {(step === 1) && (
                    <>
                        <div className="mb-4 form-group">
                            <label htmlFor="selectedMovie" className="small text-white">Seleccione película</label>
                            <select
                                id="selectedMovie"
                                name="selectedMovie"
                                className="form-select form-select-lg mb-3"
                                value={formik.values.selectedMovie}
                                onChange={
                                    (e: ChangeEvent<HTMLSelectElement>) => {
                                        formik.setFieldValue('selectedMovie', e.target.value)
                                    }
                                }
                                onBlur={formik.handleBlur}
                                required>
                                <option>Open this select menu</option>
                                {movies.map((m: Movie, idx: number) => (
                                    <option key={idx} value={m.title.replaceAll(' ', '-').toLowerCase()}>{m.title}</option>
                                ))}
                            </select>
                            {formik.touched.selectedMovie && formik.errors.selectedMovie ? (
                                <div className="text-danger small">{formik.errors.selectedMovie}</div>
                            ) : null}
                        </div>
                        <div className="mb-4 form-group">
                            <label htmlFor="funcion">Seleccione función</label>
                            <DatePicker
                                id="funcion"
                                selected={new Date(formik.values.date)}
                                onChange={(d: any) => {
                                    formik.setFieldValue('date', d)
                                }}
                                onBlur={formik.handleBlur}
                                showTimeInput={true}
                                onChangeRaw={(e: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('date', new Date(e.target.value))}
                                placeholderText="mm/dd/yyyy:HH:mm"
                                dateFormat={'MM/dd/yyyy HH:mm'}
                                className={"form-control position-relative"}
                                wrapperClassName="w-100"
                            />
                            {formik.touched.date && formik.errors.date ? (
                                <div className="text-danger small">{formik.errors.date}</div>
                            ) : null}
                        </div>
                        <div className="mb-4 form-group">
                            <label htmlFor="asiento">Seleccione Asiento</label>
                            <select
                                id="asiento"
                                name="seat"
                                className="form-select form-select-lg mb-3"
                                value={formik.values.seat}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => formik.setFieldValue('seat', e.target.value)}
                                required>
                                <option>Open this select menu</option>
                                {seats?.map((s: { row: number, seat: number }, idx: number) => (
                                    <option value={`Fila ${s.row} - Asiento - ${s.seat}`} key={idx}>{`Fila ${s.row} - Asiento - ${s.seat}`}</option>
                                ))}
                            </select>
                            {formik.touched.seat && formik.errors.seat ? (
                                <div className="text-danger small">{formik.errors.seat}</div>
                            ) : null}
                        </div>
                    </>
                )}

                {(step === 2) && (
                    <>
                        <div className="mb-3 form-group">
                            <label htmlFor="name" className="small text-white">Nombre completo</label>
                            <input type="text" name="name" className="form-control" id="nombre" value={formik.values.name} min={4} onChange={(e: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('name', e.target.value)} required />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-danger small">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="email">E-mail</label>
                            <input id="email" type="email" className="form-control" value={formik.values.email} onChange={(e: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)} required />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger small">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input type="tel" name="phone" id="telefono" className="form-control" value={formik.values.phone} onChange={(e) => formik.setFieldValue('phone', phoneNumberAutoFormat(e.target.value))} maxLength={11} required />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-danger small">{formik.errors.phone}</div>
                            ) : null}
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