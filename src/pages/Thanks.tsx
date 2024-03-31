import { useState } from "react";
import moment from "moment";
import { useAppSelector } from "../store";

type Purchase = {
    date: number,
    email: string,
    movie: string,
    name: string,
    phone: string,
    seat: string
}
const Thanks = () => {
    const [purchase] = useState<Purchase>(useAppSelector((state) => state.purchase) as Purchase);
    return (
        <>
            <div className="position-relative vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="container position-absolute">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5 d-flex flex-column align-items-center">
                            <p className="fw-bold fs-4 text-muted text-center">Comprar ticket</p>
                            <h3 className="fw-bold text-white text-center">¡Felicitaciones {purchase.name}!</h3>
                            <img className="my-2" src="/media/ticket.svg" alt="ticket" />
                            <p className="fw-bold fs-4 text-white text-center">Tu entrada para la función {moment(purchase.date).format('MM/DD/yyyy')} a las {moment(purchase.date).format('HH:mm')} a sido canjeada</p>

                            <h4 className="mt-4 fw-bold text-white text-center">¡Te esperamos!</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Thanks };