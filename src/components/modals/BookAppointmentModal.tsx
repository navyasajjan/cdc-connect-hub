import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/hooks/use-notifications";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM"
];

export function BookAppointmentModal({ open, onOpenChange }: BookAppointmentModalProps) {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    childName: "",
    therapyType: "",
    practitioner: "",
    timeSlot: "",
    facility: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = date ? format(date, "PPP") : "";
    toast({
      title: "Appointment booked successfully",
      description: `Session scheduled for ${dateStr} at ${formData.timeSlot}`,
    });
    
    addNotification({
      type: "confirmation",
      title: "Appointment Booked",
      message: `Session for ${formData.childName} scheduled on ${dateStr} at ${formData.timeSlot} with ${formData.practitioner}`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Therapy Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child Name *</Label>
                <Select value={formData.childName} onValueChange={(value) => setFormData({ ...formData, childName: value })}>
                  <SelectTrigger id="childName">
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="therapyType">Therapy Type *</Label>
                <Select value={formData.therapyType} onValueChange={(value) => setFormData({ ...formData, therapyType: value })}>
                  <SelectTrigger id="therapyType">
                    <SelectValue placeholder="Select therapy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speech">Speech Therapy</SelectItem>
                    <SelectItem value="occupational">Occupational Therapy</SelectItem>
                    <SelectItem value="physical">Physical Therapy</SelectItem>
                    <SelectItem value="behavioral">Behavioral Therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="practitioner">Practitioner *</Label>
                <Select value={formData.practitioner} onValueChange={(value) => setFormData({ ...formData, practitioner: value })}>
                  <SelectTrigger id="practitioner">
                    <SelectValue placeholder="Select practitioner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-patel">Dr. Sarah Patel</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Michael Johnson</SelectItem>
                    <SelectItem value="dr-williams">Dr. Emily Williams</SelectItem>
                    <SelectItem value="dr-brown">Dr. James Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">Time Slot *</Label>
                <Select value={formData.timeSlot} onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}>
                  <SelectTrigger id="timeSlot">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facility">Facility *</Label>
                <Select value={formData.facility} onValueChange={(value) => setFormData({ ...formData, facility: value })}>
                  <SelectTrigger id="facility">
                    <SelectValue placeholder="Auto-assign or select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-assign</SelectItem>
                    <SelectItem value="room-101">Speech Therapy Room 101</SelectItem>
                    <SelectItem value="room-102">Occupational Room 102</SelectItem>
                    <SelectItem value="room-103">Physical Therapy Room 103</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date *</Label>
                <div className="border rounded-md p-3 bg-card">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes</Label>
            <Input
              id="notes"
              placeholder="Any special requirements or notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Book Appointment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
