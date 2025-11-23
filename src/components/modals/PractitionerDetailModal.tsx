import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, Mail, Calendar, Award, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PractitionerDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  practitioner: {
    name: string;
    specialty: string;
    status: string;
    sessions: number;
  };
}

export function PractitionerDetailModal({ open, onOpenChange, practitioner }: PractitionerDetailModalProps) {
  const [isAvailable, setIsAvailable] = useState(practitioner.status === "Available");
  const { toast } = useToast();

  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
    toast({
      title: checked ? "Practitioner marked as available" : "Practitioner marked as unavailable",
      description: `${practitioner.name} is now ${checked ? "available" : "unavailable"} for sessions.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Practitioner Profile</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{practitioner.name}</h3>
                <p className="text-muted-foreground">{practitioner.specialty}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant={isAvailable ? "default" : "secondary"}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="availability" 
                      checked={isAvailable}
                      onCheckedChange={handleAvailabilityToggle}
                    />
                    <Label htmlFor="availability" className="text-sm cursor-pointer">
                      Available for sessions
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm text-muted-foreground">Contact Information</h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{practitioner.name.toLowerCase().replace(' ', '.')}@cdc.org</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm text-muted-foreground">Professional Details</h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span>License #: ST-12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>8 years experience</span>
                </div>
              </div>
            </div>

            <div className="bg-accent/50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold mb-2">Today's Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{practitioner.sessions}</p>
                  <p className="text-xs text-muted-foreground">Sessions Today</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-xs text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Today's Schedule</h4>
              {[
                { time: "09:00 AM - 10:00 AM", child: "Sarah Johnson", type: "Speech Therapy" },
                { time: "10:30 AM - 11:30 AM", child: "Mike Chen", type: "Speech Therapy" },
                { time: "02:00 PM - 03:00 PM", child: "Emily Davis", type: "Speech Therapy" },
                { time: "03:30 PM - 04:30 PM", child: "Available Slot", type: "Open" },
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{slot.time}</p>
                      <p className="text-xs text-muted-foreground">{slot.child}</p>
                    </div>
                  </div>
                  <Badge variant={slot.type === "Open" ? "outline" : "secondary"}>{slot.type}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Recent Sessions</h4>
              {[
                { date: "Dec 20, 2024", child: "Sarah Johnson", status: "Completed", notes: "Excellent progress" },
                { date: "Dec 20, 2024", child: "Mike Chen", status: "Completed", notes: "Good engagement" },
                { date: "Dec 19, 2024", child: "Emily Davis", status: "Completed", notes: "Needs more practice" },
                { date: "Dec 19, 2024", child: "Alex Brown", status: "Cancelled", notes: "Parent requested" },
              ].map((session, idx) => (
                <div key={idx} className="p-3 bg-card border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{session.child}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                    <Badge variant={session.status === "Completed" ? "default" : "secondary"}>
                      {session.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{session.notes}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Assign Session</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
