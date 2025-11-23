import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface AttendanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child: {
    name: string;
  };
}

export function AttendanceModal({ open, onOpenChange, child }: AttendanceModalProps) {
  const { toast } = useToast();
  const [attendance, setAttendance] = useState("present");
  const [arrivalTime, setArrivalTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const statusText = attendance === "present" 
      ? "marked as present" 
      : attendance === "late" 
        ? "marked as late arrival"
        : "marked as absent";
    
    toast({
      title: "Attendance updated",
      description: `${child.name} has been ${statusText}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Child</Label>
            <div className="p-3 bg-accent/50 rounded-md">
              <p className="font-medium">{child.name}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Attendance Status *</Label>
            <RadioGroup value={attendance} onValueChange={setAttendance}>
              <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-accent/50 cursor-pointer">
                <RadioGroupItem value="present" id="present" />
                <Label htmlFor="present" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Present
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-accent/50 cursor-pointer">
                <RadioGroupItem value="late" id="late" />
                <Label htmlFor="late" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Clock className="w-4 h-4 text-warning" />
                  Late Arrival
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-accent/50 cursor-pointer">
                <RadioGroupItem value="absent" id="absent" />
                <Label htmlFor="absent" className="flex items-center gap-2 cursor-pointer flex-1">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Absent
                </Label>
              </div>
            </RadioGroup>
          </div>

          {attendance === "late" && (
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <Input
                id="arrivalTime"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Attendance</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
