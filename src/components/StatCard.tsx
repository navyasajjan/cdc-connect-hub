import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary-light border-primary",
  secondary: "bg-secondary-light border-secondary",
  success: "bg-success-light border-success",
  warning: "bg-warning-light border-warning",
};

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  subtitle, 
  trend, 
  variant = "default",
  className 
}: StatCardProps) => {
  return (
    <Card className={cn(
      "p-6 card-hover border-2 transition-all",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.value}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          variant === "default" ? "bg-primary-light" : "bg-background/50"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            variant === "default" ? "text-primary" : "text-foreground"
          )} />
        </div>
      </div>
    </Card>
  );
};
