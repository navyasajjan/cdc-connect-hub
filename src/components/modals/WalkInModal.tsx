import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

interface WalkInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalkInModal({ open, onOpenChange }: WalkInModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    phone: "",
    therapyType: "",
    urgency: "normal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Walk-in registered",
      description: `${formData.childName} added to queue. Finding available therapist...`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Register Walk-In
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentName">Parent/Guardian Name *</Label>
            <Input
              id="parentName"
              required
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="childName">Child Name *</Label>
            <Input
              id="childName"
              required
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="therapyType">Required Therapy *</Label>
            <Select value={formData.therapyType} onValueChange={(value) => setFormData({ ...formData, therapyType: value })}>
              <SelectTrigger id="therapyType">
                <SelectValue placeholder="Select therapy type" />
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
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add to Queue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
