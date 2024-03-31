import { createSlice } from '@reduxjs/toolkit'
import { movieApi } from '../../services/movie'

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

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        featured: []
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addMatcher(movieApi.endpoints.getMovies.matchFulfilled, (state, action) => {
                if (action.meta.arg.originalArgs === 'film') {
                    Object.assign(state.movies, action.payload.movies); //All movies from JSON
                    const featured = Array.from(state.movies).filter((m: Movie) => m.featured === true) //Filtering Movies from STATE
                    Object.assign(state.featured, featured)
                }
            })
    }
})

// Action creators are generated for each case reducer function
export default movieSlice.reducer