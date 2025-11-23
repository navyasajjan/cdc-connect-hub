import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, UserPlus, Eye, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AddChildModal } from "@/components/modals/AddChildModal";
import { ChildDetailModal } from "@/components/modals/ChildDetailModal";
import { AttendanceModal } from "@/components/modals/AttendanceModal";

const children = [
  {
    id: "C-001",
    name: "Emma S.",
    age: 5,
    therapyPlan: "Speech & Language",
    practitioner: "Dr. Sarah Chen",
    parent: "Jennifer S.",
    nextSession: "Today, 9:00 AM",
    attendance: "95%",
    initials: "ES"
  },
  {
    id: "C-002",
    name: "Lucas M.",
    age: 7,
    therapyPlan: "Occupational Therapy",
    practitioner: "Dr. James Wilson",
    parent: "Michael M.",
    nextSession: "Today, 9:30 AM",
    attendance: "88%",
    initials: "LM"
  },
  {
    id: "C-003",
    name: "Olivia R.",
    age: 4,
    therapyPlan: "Physical Therapy",
    practitioner: "Dr. Emily Parker",
    parent: "Rachel R.",
    nextSession: "Today, 10:00 AM",
    attendance: "92%",
    initials: "OR"
  },
  {
    id: "C-004",
    name: "Noah J.",
    age: 6,
    therapyPlan: "Behavioral Therapy",
    practitioner: "Dr. Michael Brown",
    parent: "Sarah J.",
    nextSession: "Tomorrow, 2:00 PM",
    attendance: "97%",
    initials: "NJ"
  },
];

export default function Children() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addChildOpen, setAddChildOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.parent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (child: any) => {
    setSelectedChild({ name: child.name, age: child.age, status: "Active", therapyPlan: child.therapyPlan, practitioner: child.practitioner });
    setDetailOpen(true);
  };

  const handleSchedule = (child: any) => {
    setSelectedChild({ name: child.name });
    setAttendanceOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Children & Parents</h1>
          <p className="text-muted-foreground">Manage child registrations and parent information</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-dark" onClick={() => setAddChildOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Register New Child
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by child name, ID, or parent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChildren.map((child) => (
          <Card key={child.id} className="p-6 card-hover">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <Avatar className="w-14 h-14 bg-secondary text-secondary-foreground">
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold text-lg">
                    {child.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">Age: {child.age} years</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {child.id}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Therapy Plan</p>
                  <Badge className="bg-primary-light text-primary">{child.therapyPlan}</Badge>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned Practitioner</p>
                  <p className="text-sm font-medium">{child.practitioner}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Parent/Guardian</p>
                  <p className="text-sm font-medium">{child.parent}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Next Session</p>
                  <p className="text-sm font-medium text-primary">{child.nextSession}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Attendance Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success rounded-full" 
                        style={{ width: child.attendance }}
                      />
                    </div>
                    <span className="text-sm font-medium">{child.attendance}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleViewDetails(child)}>
                  <Eye className="w-4 h-4 mr-1" />
                  View Profile
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleSchedule(child)}>
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddChildModal open={addChildOpen} onOpenChange={setAddChildOpen} />
      {selectedChild && (
        <>
          <ChildDetailModal 
            open={detailOpen} 
            onOpenChange={setDetailOpen}
            child={selectedChild}
          />
          <AttendanceModal 
            open={attendanceOpen} 
            onOpenChange={setAttendanceOpen}
            child={selectedChild}
          />
        </>
      )}
    </div>
  );
}
