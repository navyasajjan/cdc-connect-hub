import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const mockAppointments: Record<string, any[]> = {
  "09:00 AM": [{ child: "Emma S.", practitioner: "Dr. Sarah Chen", therapy: "Speech Therapy", status: "in-session" }],
  "09:30 AM": [{ child: "Lucas M.", practitioner: "Dr. James Wilson", therapy: "Occupational Therapy", status: "in-session" }],
  "10:00 AM": [{ child: "Olivia R.", practitioner: "Dr. Emily Parker", therapy: "Physical Therapy", status: "pending" }],
  "02:00 PM": [{ child: "Noah J.", practitioner: "Dr. Michael Brown", therapy: "Behavioral Therapy", status: "pending" }],
};

export default function Appointments() {
  const [currentDate] = useState(new Date());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointment & Slot Booking</h1>
          <p className="text-muted-foreground">Manage therapy sessions and facility bookings</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Book New Slot
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold text-lg">
                {currentDate.toLocaleDateString("en-US", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </span>
            </div>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="sm">Week View</Button>
            <Button variant="outline" size="sm">Month View</Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <StatusBadge status="available" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="pending" />
            <span className="text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="in-session" pulse />
            <span className="text-muted-foreground">In Session</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="completed" />
            <span className="text-muted-foreground">Completed</span>
          </div>
        </div>
      </Card>

      {/* Time Slots Grid */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Daily Schedule</h2>
        <div className="space-y-2">
          {timeSlots.map((time) => {
            const appointments = mockAppointments[time] || [];
            const isEmpty = appointments.length === 0;

            return (
              <div
                key={time}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isEmpty 
                    ? "bg-muted/30 border-dashed border-border hover:bg-muted/50" 
                    : "bg-card border-border card-hover"
                }`}
              >
                <div className="w-24 text-sm font-semibold text-muted-foreground">
                  {time}
                </div>
                
                {isEmpty ? (
                  <div className="flex-1 flex items-center justify-center gap-2 text-muted-foreground">
                    <span className="text-sm">Available slot</span>
                    <Button size="sm" variant="ghost">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.map((apt, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-accent rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-sm">{apt.child}</p>
                          <p className="text-xs text-muted-foreground">{apt.therapy}</p>
                          <p className="text-xs text-muted-foreground">{apt.practitioner}</p>
                        </div>
                        <StatusBadge 
                          status={apt.status} 
                          pulse={apt.status === "in-session"} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
