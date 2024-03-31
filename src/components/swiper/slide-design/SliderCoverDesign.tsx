import { FC } from "react";

//Types
type Movie = {
    title: string,
    url: string,
    poster: string,
    description: string,
    rating: number,
    images: Array<string>,
}

const SliderCoverDesign: FC<Movie> = ({
    title,
    url,
    poster,
    description,
    rating,
    images
}) => {
    return (
        <>
            <div className="position-relative w-100 h-100 slider-cover-design">
                <img id="background-cover" className='w-100 h-100 position-absolute top-0 img-fluid object-fit-cover' src={images[images.length - 1]} alt={title} />
                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div className="container position-absolute">
                        <div className="card border-0 bg-transparent">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={poster} className="img-fluid" alt={title} />
                                </div>
                                <div className="col-md-8">
                                    <div className="mt-lg-4 card-body">
                                        <h5 className="display-3 card-title">{title}</h5>
                                        <hr className="d-none d-lg-block" />
                                        <p className="card-text d-none d-lg-block">{description}</p>
                                    </div>
                                    <div className="mt-lg-4 w-100 d-flex align-items-center justify-content-center">
                                        <a href={url} target="_blank" rel="noreferrer" className="btn mx-3 d-flex flex-column align-items-center">
                                            <img className="img-buttons" src="/media/play.svg" alt="trailer" />
                                            <span>Ver Trailer</span>
                                        </a>
                                        <a href="/comprar-ticket" className="btn mx-3 d-flex flex-column align-items-center">
                                            <img className="img-buttons" src="/media/movie-ticket-original.svg" alt="trailer" />
                                            <span>Comprar Ticket</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="rating-badge">
                                <img src="/media/star.svg" alt="star" />
                                {rating} / 10
                                <span className="fw-medium small text-white">IMDB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { SliderCoverDesign };