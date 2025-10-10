import React, { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useStore } from "../store/useStore";
import "./NotificationProvider.scss";

export default function NotificationProvider({ children }) {
  const { notifications, removeNotification } = useStore();

  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, removeNotification]);

  return (
    <Toast.Provider swipeDirection="right">
      {children}
      {notifications.map((n) => (
        <Toast.Root key={n.id} className={`toast toast--${n.variant}`} open>
          <Toast.Title className="toast__title">
            {n.variant === "success"
              ? "Success"
              : n.variant === "error"
              ? "Error"
              : "Notice"}
          </Toast.Title>
          <Toast.Description className="toast__desc">
            {n.message}
            {n.status && <span className="toast__status"> [{n.status}]</span>}
          </Toast.Description>
          <Toast.Close className="toast__close">×</Toast.Close>
        </Toast.Root>
      ))}
      <Toast.Viewport className="toast__viewport" />
    </Toast.Provider>
  );
}
