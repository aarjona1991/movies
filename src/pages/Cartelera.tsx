import { FC } from "react";
import { SlideCardDesign } from "../components/swiper/card-design/SlideCardDesign";

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

type Movies = {
    movies: Array<Movie>
};

const Cartelera: FC<Movies> = ({ movies }) => {
    return (
        <>
            <div id="cartelera" className="container">
                <div className="row mb-5 mt-4">
                    <h2 className="fw-medium">En cartelera</h2>
                </div>
                <div className="row">
                    {movies.map((movie: Movie, idx: number) => (
                        <SlideCardDesign key={idx + movie.url} title={movie.title} poster={movie.poster} />
                    ))}
                </div>
            </div>
        </>
    );
};

export { Cartelera };