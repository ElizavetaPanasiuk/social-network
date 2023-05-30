import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Notification = {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
};

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push({ id: action.payload.id, message: action.payload.message, type: action.payload.type });
    },
    removeNotification: (state, action: PayloadAction<{ id: number }>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload.id);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
