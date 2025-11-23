import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Filter, UserPlus, Calendar, Phone, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const practitioners = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Speech Therapy",
    status: "available" as const,
    license: "SLP-12345",
    experience: "8 years",
    todaySessions: 6,
    phone: "(555) 123-4567",
    email: "s.chen@cdc.org",
    initials: "SC"
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Occupational Therapy",
    status: "in-session" as const,
    license: "OTR-67890",
    experience: "12 years",
    todaySessions: 5,
    phone: "(555) 234-5678",
    email: "j.wilson@cdc.org",
    initials: "JW"
  },
  {
    id: 3,
    name: "Dr. Emily Parker",
    specialty: "Physical Therapy",
    status: "available" as const,
    license: "PT-24680",
    experience: "6 years",
    todaySessions: 7,
    phone: "(555) 345-6789",
    email: "e.parker@cdc.org",
    initials: "EP"
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialty: "Behavioral Therapy",
    status: "unavailable" as const,
    license: "BCBA-13579",
    experience: "10 years",
    todaySessions: 0,
    phone: "(555) 456-7890",
    email: "m.brown@cdc.org",
    initials: "MB"
  },
];

export default function Practitioners() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPractitioners = practitioners.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Practitioners</h1>
          <p className="text-muted-foreground">Manage practitioner schedules and availability</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Practitioner
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
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

      {/* Practitioners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPractitioners.map((practitioner) => (
          <Card key={practitioner.id} className="p-6 card-hover">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 bg-primary text-primary-foreground">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {practitioner.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{practitioner.name}</h3>
                    <p className="text-sm text-muted-foreground">{practitioner.specialty}</p>
                  </div>
                </div>
                <StatusBadge 
                  status={practitioner.status} 
                  pulse={practitioner.status === "in-session"}
                />
              </div>

              {/* Details */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">License:</span>
                  <span className="font-medium">{practitioner.license}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{practitioner.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Today's Sessions:</span>
                  <Badge variant="secondary">{practitioner.todaySessions}</Badge>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs">{practitioner.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs truncate">{practitioner.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
