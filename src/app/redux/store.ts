import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './features/authenticationSlice';
import cooperativeReducer from './features/cooperativesSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    cooperative: cooperativeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the redux itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
