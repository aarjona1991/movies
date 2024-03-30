import { useEffect } from 'react';
import { Swiper } from '../components/swiper/Swiper';
import { useAppSelector } from '../store';
import { useGetMoviesQuery } from '../store/services/movie';
import { Cartelera } from './Cartelera';

const Home = () => {
    const { refetch } = useGetMoviesQuery('film');
    const { movies, featured: featuredMovies } = useAppSelector((state) => state.movie);
    useEffect(() => {
        if (!featuredMovies) {
            refetch()
        }
    }, [featuredMovies, refetch])
    return (
        <>
            <Swiper movies={featuredMovies} />
            <Cartelera movies={movies} />
        </>
    );
};

export { Home };