import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Building2, MapPin, Users, Plus } from "lucide-react";

const facilities = [
  { id: 1, name: "Room 101", type: "Speech Therapy", capacity: 2, floor: 1, status: "in-session" as const, currentSession: "Emma S. - Dr. Sarah Chen" },
  { id: 2, name: "Room 102", type: "Behavioral Therapy", capacity: 1, floor: 1, status: "available" as const },
  { id: 3, name: "Room 103", type: "Occupational Therapy", capacity: 3, floor: 1, status: "in-session" as const, currentSession: "Lucas M. - Dr. James Wilson" },
  { id: 4, name: "Room 201", type: "Speech Therapy", capacity: 2, floor: 2, status: "available" as const },
  { id: 5, name: "Room 202", type: "Group Activities", capacity: 8, floor: 2, status: "available" as const },
  { id: 6, name: "Room 203", type: "Sensory Integration", capacity: 4, floor: 2, status: "maintenance" as const },
  { id: 7, name: "Room 204", type: "Physical Therapy", capacity: 3, floor: 2, status: "available" as const },
  { id: 8, name: "Room 205", type: "Physical Therapy", capacity: 3, floor: 2, status: "in-session" as const, currentSession: "Olivia R. - Dr. Emily Parker" },
];

const facilityStats = [
  { label: "Total Rooms", value: 12, color: "bg-primary" },
  { label: "Available", value: 8, color: "bg-success" },
  { label: "In Use", value: 3, color: "bg-secondary" },
  { label: "Maintenance", value: 1, color: "bg-warning" },
];

export default function Facilities() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Facility & Room Management</h1>
          <p className="text-muted-foreground">Monitor and manage therapy rooms and spaces</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add Facility
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {facilityStats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-12 rounded-full ${stat.color}`} />
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floor Plans */}
      <div className="space-y-6">
        {[1, 2].map((floor) => (
          <Card key={floor} className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Floor {floor}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {facilities
                .filter((f) => f.floor === floor)
                .map((facility) => (
                  <div
                    key={facility.id}
                    className="relative p-5 rounded-xl border-2 border-border bg-card card-hover"
                  >
                    <div className="absolute top-3 right-3">
                      <StatusBadge 
                        status={facility.status} 
                        pulse={facility.status === "in-session"} 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">{facility.type}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Floor {facility.floor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Capacity: {facility.capacity}</span>
                        </div>
                      </div>

                      {facility.currentSession && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">Current Session</p>
                          <p className="text-xs font-medium">{facility.currentSession}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          disabled={facility.status === "in-session"}
                        >
                          Assign
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
