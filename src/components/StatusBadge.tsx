import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "completed" | "cancelled" | "pending" | "in-session" | "available" | "unavailable" | "maintenance";
  className?: string;
  pulse?: boolean;
}

const statusConfig = {
  active: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Active"
  },
  completed: {
    bg: "bg-primary-light",
    text: "text-primary",
    label: "Completed"
  },
  cancelled: {
    bg: "bg-destructive-light",
    text: "text-destructive",
    label: "Cancelled"
  },
  pending: {
    bg: "bg-warning-light",
    text: "text-warning",
    label: "Pending"
  },
  "in-session": {
    bg: "bg-secondary-light",
    text: "text-secondary",
    label: "In Session"
  },
  available: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Available"
  },
  unavailable: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    label: "Unavailable"
  },
  maintenance: {
    bg: "bg-warning-light",
    text: "text-warning",
    label: "Maintenance"
  }
};

export const StatusBadge = ({ status, className, pulse = false }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.text.replace("text-", "bg-"), pulse && "status-pulse")} />
      {config.label}
    </span>
  );
};
