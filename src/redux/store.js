import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';

const RootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

const store = configureStore({ reducer: RootReducer });

export default store;
