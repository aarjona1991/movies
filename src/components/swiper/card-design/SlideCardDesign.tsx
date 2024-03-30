import { FC } from "react";

type Movie = {
    title: string,
    poster: string,
}

const SlideCardDesign: FC<Movie> = ({
    title,
    poster,
}) => {
    return (
        <>
            <div className="card mb-4 border-0 custom-card">
                <h5 className="fw-light small title">{title}</h5>
                <img className="img-fluid" src={poster} alt={title} />
                <a className="btn btn-primary rounded-top-0" href="/comprar-ticket">Comprar Ticket</a>
            </div>
        </>
    );
};

export { SlideCardDesign };