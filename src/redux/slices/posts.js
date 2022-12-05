import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import axios from '../../axios';

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags');
  return data.tags;
});

export const removePost = createAsyncThunk('posts/removePost', (id) => {
  axios.delete(`/posts/${id}`);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.items = [...state.posts.items, action.payload];
    },
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
  extraReducers: (builder) => {
    // FETCH POSTS
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = 'success';
      state.posts.items = action.payload.posts;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts.status = 'error';
    });
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.posts.status = 'loading';
    });

    // FETCH TAGS
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.status = 'success';
      state.tags.items = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.tags.status = 'error';
    });
    builder.addCase(fetchTags.pending, (state, action) => {
      state.tags.status = 'loading';
    });

    // REMOVE POST
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.posts.status = 'success';
      state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.posts.status = 'error';
    });
    builder.addCase(removePost.pending, (state, action) => {
      state.posts.status = 'loading';
    });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
