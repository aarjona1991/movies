import { FC } from 'react';
import { Swiper as Slide, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SliderCoverDesign } from './slide-design/SliderCoverDesign';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

type SwiperSlider = {
    movies: Array<Movie>
};

const Swiper: FC<SwiperSlider> = ({ movies }) => {

    return (
        <>
            <Slide
                id='destacadas'
                // install Swiper modules
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
            >
                {movies.map((m: Movie, key: number) => (
                    <SwiperSlide key={m.title + key}>
                        <SliderCoverDesign
                            description={m.description}
                            images={m.images}
                            poster={m.poster}
                            rating={m.rating}
                            title={m.title}
                            url={m.url}
                        />
                    </SwiperSlide>
                ))}
            </Slide>
        </>
    );
};

export { Swiper };