import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import playerReducer from './slices/playerSlice';
import { audioMiddleware } from './middleware/audioMiddleware';

// Define the root state type
export interface RootState {
  player: ReturnType<typeof playerReducer>;
}

// Create the store with all reducers
export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['player/addPlayer', 'player/updatePlayerState'],
        ignoredPaths: ['player.tracks'],
      },
    }).concat(audioMiddleware),
});

// Export typed hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 