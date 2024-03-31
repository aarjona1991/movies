import { configureStore } from '@reduxjs/toolkit';

import movieReducer from './features/movie/movieSlice';
import purchaseReducer from './features/purchase/purchaseSlice';

import { movieApi } from './services/movie';

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        purchase: purchaseReducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(movieApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch