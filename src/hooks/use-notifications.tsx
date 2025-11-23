import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, Clock, AlertCircle, CheckCircle, XCircle, Calendar } from "lucide-react";

export type NotificationType = "reminder" | "delay" | "confirmation" | "cancellation" | "arrival" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "reminder":
        return Bell;
      case "delay":
        return Clock;
      case "confirmation":
        return CheckCircle;
      case "cancellation":
        return XCircle;
      case "arrival":
        return Calendar;
      default:
        return AlertCircle;
    }
  };

  const getNotificationVariant = (type: NotificationType) => {
    switch (type) {
      case "confirmation":
        return "default";
      case "delay":
      case "cancellation":
        return "destructive";
      default:
        return "default";
    }
  };

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Show toast for real-time alert
    const Icon = getNotificationIcon(notification.type);
    toast({
      title: notification.title,
      description: notification.message,
      variant: getNotificationVariant(notification.type),
      // @ts-ignore
      icon: <Icon className="w-4 h-4" />,
    });
  }, [toast]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Simulate some notifications on mount for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: "reminder",
        title: "Upcoming Session",
        message: "Emma S. has a session in 15 minutes with Dr. Sarah Chen",
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      addNotification({
        type: "delay",
        title: "Practitioner Delay",
        message: "Dr. James Wilson running 10 minutes late for Lucas M.'s session",
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
