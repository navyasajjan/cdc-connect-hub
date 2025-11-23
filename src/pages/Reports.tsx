import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, TrendingUp, Users, Clock, Building2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const recentActivities = [
  { time: "08:45 AM", action: "Emma S. checked in for Speech Therapy with Dr. Sarah Chen" },
  { time: "09:12 AM", action: "Room 103 assigned to Lucas M. - Occupational Therapy session started" },
  { time: "09:35 AM", action: "Dr. Emily Parker marked session with Olivia R. as completed" },
  { time: "10:05 AM", action: "New appointment booked for Noah J. - Tomorrow 2:00 PM" },
  { time: "10:28 AM", action: "Room 206 marked under maintenance - estimated completion 2 hours" },
];

const reportTypes = [
  { id: 1, title: "Daily Sessions Report", description: "Complete session logs for today", icon: Calendar },
  { id: 2, title: "Practitioner Occupancy", description: "Therapist utilization metrics", icon: Users },
  { id: 3, title: "Facility Usage Analytics", description: "Room and space utilization stats", icon: Building2 },
  { id: 4, title: "No-Show Analysis", description: "Missed appointments breakdown", icon: Clock },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Logs, Reports & Analytics</h1>
        <p className="text-muted-foreground">View activity logs and generate operational reports</p>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Sessions Completed"
          value={18}
          icon={TrendingUp}
          subtitle="Today"
          variant="success"
          trend={{ value: "+12% from yesterday", isPositive: true }}
        />
        <StatCard
          title="No-Shows"
          value={2}
          icon={Clock}
          subtitle="Today"
          variant="warning"
        />
        <StatCard
          title="Practitioner Occupancy"
          value="87%"
          icon={Users}
          subtitle="Average today"
          variant="primary"
        />
        <StatCard
          title="Facility Usage"
          value="75%"
          icon={Building2}
          subtitle="Peak hours"
          variant="secondary"
        />
      </div>

      {/* Report Types */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Generate Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-5 bg-accent/50 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-light rounded-xl">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Activity Log</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
            >
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-muted-foreground">
                {activity.time}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.action}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
