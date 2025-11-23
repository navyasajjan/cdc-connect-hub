import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";

interface ChildDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child: {
    name: string;
    age: number;
    status: string;
    therapyPlan: string;
    practitioner: string;
  };
}

export function ChildDetailModal({ open, onOpenChange, child }: ChildDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Child Profile</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="therapy">Therapy Plan</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{child.name}</h3>
                <p className="text-muted-foreground">{child.age} years old</p>
                <div className="mt-2">
                  <Badge variant="secondary">{child.status}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm text-muted-foreground">Parent/Guardian Information</h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>John Doe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>123 Main Street, City, State 12345</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm text-muted-foreground">Medical Information</h4>
              <p className="text-sm">No known allergies. Regular medication: None.</p>
            </div>
          </TabsContent>

          <TabsContent value="therapy" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Current Therapy Plan</h4>
                <p className="text-sm text-muted-foreground mb-3">{child.therapyPlan}</p>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Assigned to: {child.practitioner}</span>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Upcoming Sessions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Speech Therapy</span>
                    <span className="text-muted-foreground">Tomorrow, 10:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Occupational Therapy</span>
                    <span className="text-muted-foreground">Dec 25, 2:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Progress Notes</h4>
                <p className="text-sm text-muted-foreground">
                  Showing improvement in communication skills. Continues to engage well in sessions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-4">
            <div className="space-y-3">
              {[
                { date: "Dec 20, 2024", type: "Speech Therapy", status: "Completed" },
                { date: "Dec 18, 2024", type: "Occupational Therapy", status: "Completed" },
                { date: "Dec 15, 2024", type: "Speech Therapy", status: "Completed" },
                { date: "Dec 13, 2024", type: "Physical Therapy", status: "Completed" },
              ].map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{session.type}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{session.status}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Edit Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
