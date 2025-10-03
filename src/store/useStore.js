import create from 'zustand';

export const useStore = create(set => ({
  user: null,
  setUser: (user) => set({ user }),
  // Add more complex data later
  notifications: [],
  addNotification: (notification) => set(state => ({
    notifications: [...state.notifications, notification]
  })),
}));
