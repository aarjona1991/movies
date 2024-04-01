import { FC } from "react";
import { Navigation } from 'swiper/modules';
import { Swiper as Slide, SwiperSlide } from 'swiper/react';
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
            <div id="cartelera-container" className="w-100" style={{
                backgroundImage: `url('/media/popcorn.svg')`,
                backgroundRepeat: 'repeat-y',
                backgroundPosition: 'right',
            }}>
                <div id="cartelera" className="container">
                    <div className="row mb-5 mt-4">
                        <h2 className="fw-medium">En cartelera</h2>
                    </div>
                    <div className="row d-none d-lg-flex">
                        {movies.map((movie: Movie, idx: number) => (
                            <SlideCardDesign key={idx + movie.url} title={movie.title} poster={movie.poster} />
                        ))}
                    </div>
                    <div className="row d-lg-none">
                        <Slide
                            // install Swiper modules
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesOffsetBefore={25}
                            slidesPerView={2}
                            navigation={false}
                        >
                            {movies.map((m: Movie, key: number) => (
                                <SwiperSlide key={m.title + key}>
                                    <SlideCardDesign title={m.title} poster={m.poster} />
                                </SwiperSlide>
                            ))}
                        </Slide>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Cartelera };