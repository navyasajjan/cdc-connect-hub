import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  Building2, 
  Clock, 
  UserPlus, 
  Calendar,
  Home,
  ClipboardCheck,
  AlertCircle
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { QuickActionButton } from "@/components/QuickActionButton";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AddChildModal } from "@/components/modals/AddChildModal";
import { BookAppointmentModal } from "@/components/modals/BookAppointmentModal";
import { WalkInModal } from "@/components/modals/WalkInModal";

const upcomingSessions = [
  { id: 1, time: "09:00 AM", child: "Emma S.", practitioner: "Dr. Sarah Chen", therapy: "Speech Therapy", room: "Room 201", status: "pending" as const },
  { id: 2, time: "09:30 AM", child: "Lucas M.", practitioner: "Dr. James Wilson", therapy: "Occupational Therapy", room: "Room 103", status: "in-session" as const },
  { id: 3, time: "10:00 AM", child: "Olivia R.", practitioner: "Dr. Emily Parker", therapy: "Physical Therapy", room: "Room 205", status: "pending" as const },
  { id: 4, time: "10:30 AM", child: "Noah J.", practitioner: "Dr. Michael Brown", therapy: "Behavioral Therapy", room: "Room 102", status: "pending" as const },
];

const alerts = [
  { id: 1, type: "warning", message: "Dr. Sarah Chen running 15 mins late" },
  { id: 2, type: "info", message: "Room 205 cleaning in progress - 10 mins remaining" },
  { id: 3, type: "success", message: "3 new parent confirmations received" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [addChildOpen, setAddChildOpen] = useState(false);
  const [bookAppointmentOpen, setBookAppointmentOpen] = useState(false);
  const [walkInOpen, setWalkInOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Reception Team</h1>
        <p className="text-muted-foreground">Here's what's happening at the CDC today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Practitioners On Duty"
          value={12}
          icon={UserCheck}
          subtitle="Out of 15 total"
          variant="primary"
        />
        <StatCard
          title="Children Scheduled"
          value={28}
          icon={Users}
          subtitle="Today's appointments"
          variant="secondary"
        />
        <StatCard
          title="Facilities Available"
          value="8/12"
          icon={Building2}
          subtitle="Rooms ready"
          variant="success"
        />
        <StatCard
          title="Pending Confirmations"
          value={4}
          icon={Clock}
          subtitle="Awaiting response"
          variant="warning"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton
            label="Register Child"
            icon={UserPlus}
            variant="primary"
            onClick={() => setAddChildOpen(true)}
          />
          <QuickActionButton
            label="Book Slot"
            icon={Calendar}
            variant="secondary"
            onClick={() => setBookAppointmentOpen(true)}
          />
          <QuickActionButton
            label="Check-In Walk-In"
            icon={ClipboardCheck}
            onClick={() => setWalkInOpen(true)}
          />
          <QuickActionButton
            label="Update Facility"
            icon={Home}
            onClick={() => navigate("/facilities")}
          />
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Today's Appointment Timeline</h2>
            <Button variant="outline" size="sm" onClick={() => navigate("/appointments")}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div 
                key={session.id}
                className="flex items-center gap-4 p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors"
              >
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-semibold">{session.time}</p>
                  <StatusBadge status={session.status} pulse={session.status === "in-session"} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{session.child}</p>
                  <p className="text-sm text-muted-foreground">{session.therapy}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{session.practitioner}</p>
                  <p className="text-xs text-muted-foreground">{session.room}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Alerts & Notifications</h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex gap-3 p-4 bg-warning-light rounded-xl border border-warning/20"
              >
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Notifications
            </Button>
          </div>
        </Card>
      </div>

      <AddChildModal open={addChildOpen} onOpenChange={setAddChildOpen} />
      <BookAppointmentModal open={bookAppointmentOpen} onOpenChange={setBookAppointmentOpen} />
      <WalkInModal open={walkInOpen} onOpenChange={setWalkInOpen} />
    </div>
  );
}
