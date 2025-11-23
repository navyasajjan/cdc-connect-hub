import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "default";
  className?: string;
}

export const QuickActionButton = ({ 
  label, 
  icon: Icon, 
  onClick,
  variant = "default",
  className 
}: QuickActionButtonProps) => {
  const variantClass = variant === "primary" 
    ? "bg-primary text-primary-foreground hover:bg-primary-dark" 
    : variant === "secondary"
    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
    : "bg-card text-card-foreground hover:bg-accent";

  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 h-auto py-6 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-1",
        variantClass,
        className
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
};
