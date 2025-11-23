import { useEffect } from "react";
import { useNotifications } from "@/hooks/use-notifications";

// This component simulates real-time notification triggers
// In a real app, these would come from WebSocket/API events
export function NotificationTriggers() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Session reminder - 15 minutes before
    const reminderInterval = setInterval(() => {
      const sessions = [
        { child: "Emma S.", practitioner: "Dr. Sarah Chen", time: "15 minutes" },
        { child: "Noah J.", practitioner: "Dr. Michael Brown", time: "30 minutes" },
        { child: "Olivia R.", practitioner: "Dr. Emily Parker", time: "10 minutes" },
      ];
      
      const session = sessions[Math.floor(Math.random() * sessions.length)];
      addNotification({
        type: "reminder",
        title: "Session Reminder",
        message: `${session.child} has a session in ${session.time} with ${session.practitioner}`,
      });
    }, 45000); // Every 45 seconds for demo

    // Practitioner delays
    const delayInterval = setInterval(() => {
      const delays = [
        { practitioner: "Dr. Sarah Chen", minutes: 15, child: "Lucas M." },
        { practitioner: "Dr. James Wilson", minutes: 10, child: "Emma S." },
        { practitioner: "Dr. Emily Parker", minutes: 20, child: "Noah J." },
      ];
      
      const delay = delays[Math.floor(Math.random() * delays.length)];
      addNotification({
        type: "delay",
        title: "Practitioner Running Late",
        message: `${delay.practitioner} is running ${delay.minutes} minutes late for ${delay.child}'s session`,
      });
    }, 60000); // Every 60 seconds for demo

    // Parent/Child arrivals
    const arrivalInterval = setInterval(() => {
      const arrivals = [
        { child: "Emma S.", status: "has arrived" },
        { child: "Lucas M.", status: "has arrived early" },
        { child: "Noah J.", status: "is in the waiting area" },
      ];
      
      const arrival = arrivals[Math.floor(Math.random() * arrivals.length)];
      addNotification({
        type: "arrival",
        title: "Child Arrival",
        message: `${arrival.child} ${arrival.status}`,
      });
    }, 55000); // Every 55 seconds for demo

    // Session confirmations
    const confirmationInterval = setInterval(() => {
      const confirmations = [
        { child: "Olivia R.", date: "Tomorrow", time: "10:00 AM" },
        { child: "Noah J.", date: "Friday", time: "2:00 PM" },
        { child: "Emma S.", date: "Monday", time: "9:00 AM" },
      ];
      
      const confirmation = confirmations[Math.floor(Math.random() * confirmations.length)];
      addNotification({
        type: "confirmation",
        title: "Session Confirmed",
        message: `Parent confirmed ${confirmation.child}'s session for ${confirmation.date} at ${confirmation.time}`,
      });
    }, 70000); // Every 70 seconds for demo

    // Session cancellations
    const cancellationInterval = setInterval(() => {
      const cancellations = [
        { child: "Lucas M.", reason: "Child is unwell" },
        { child: "Emma S.", reason: "Family emergency" },
        { child: "Noah J.", reason: "Rescheduling needed" },
      ];
      
      const cancellation = cancellations[Math.floor(Math.random() * cancellations.length)];
      addNotification({
        type: "cancellation",
        title: "Session Cancelled",
        message: `${cancellation.child}'s session has been cancelled - ${cancellation.reason}`,
      });
    }, 80000); // Every 80 seconds for demo

    return () => {
      clearInterval(reminderInterval);
      clearInterval(delayInterval);
      clearInterval(arrivalInterval);
      clearInterval(confirmationInterval);
      clearInterval(cancellationInterval);
    };
  }, [addNotification]);

  return null;
}
