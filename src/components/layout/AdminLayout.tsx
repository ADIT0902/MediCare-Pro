import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Users, 
  Activity, 
  Heart, 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PatientModule from '../hospital/PatientModule';
import DoctorModule from '../hospital/DoctorModule';
import AppointmentModule from '../hospital/AppointmentModule';
import AIAssistant from '../hospital/AIAssistant';
import GlobalSearch from '../hospital/GlobalSearch';
import { useToast } from '@/hooks/use-toast';

const AdminLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const dashboardStats = [
    {
      title: "Total Patients",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Doctors",
      value: "156",
      change: "+8%",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Today's Appointments",
      value: "45",
      change: "+5%",
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      title: "Emergency Cases",
      value: "7",
      change: "+2",
      icon: Heart,
      color: "text-red-600"
    }
  ];

  const recentActivities = [
    { type: "New Doctor Registered", name: "Dr. Emily Johnson", time: "5 min ago", status: "success" },
    { type: "Patient Admitted", name: "John Doe", time: "10 min ago", status: "urgent" },
    { type: "System Backup Completed", name: "Database", time: "30 min ago", status: "normal" },
    { type: "New Department Added", name: "Oncology", time: "1 hour ago", status: "normal" }
  ];

  const systemAlerts = [
    { message: "Server maintenance scheduled for tonight", severity: "medium" },
    { message: "New security update available", severity: "low" },
    { message: "Database backup completed successfully", severity: "low" }
  ];

  const handleSearchResultSelect = (moduleType: string) => {
    setActiveModule(moduleType);
  };

  const handleModuleChange = (moduleType: string) => {
    setActiveModule(moduleType);
    if (moduleType !== "dashboard") {
      toast({
        title: `${moduleType.charAt(0).toUpperCase() + moduleType.slice(1)} Module`,
        description: `You've switched to the ${moduleType} module`
      });
    }
  };

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'add-patient':
        setActiveModule('patients');
        toast({ title: "Add Patient", description: "Opening patient registration form" });
        break;
      case 'add-doctor':
        setActiveModule('doctors');
        toast({ title: "Add Doctor", description: "Opening doctor registration form" });
        break;
      case 'schedule':
        setActiveModule('appointments');
        toast({ title: "Schedule Appointment", description: "Opening appointment scheduler" });
        break;
      case 'ai-diagnosis':
        setActiveModule('ai-assistant');
        toast({ title: "AI Diagnosis", description: "Opening AI diagnostic assistant" });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediCare Pro - Admin</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <GlobalSearch 
        isOpen={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
        onResultSelect={handleSearchResultSelect}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeModule} onValueChange={handleModuleChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* System Alerts */}
            {systemAlerts.length > 0 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {systemAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm">{alert.message}</span>
                        <Badge variant={alert.severity === "medium" ? "secondary" : "outline"}>
                          {alert.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {stat.change}
                      </span>
                      {' '}from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activities and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activities</CardTitle>
                  <CardDescription>Latest administrative activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{activity.type}</p>
                          <p className="text-xs text-muted-foreground">{activity.name} • {activity.time}</p>
                        </div>
                        <Badge variant={
                          activity.status === "urgent" ? "destructive" :
                          activity.status === "success" ? "default" : "secondary"
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Quick Actions</CardTitle>
                  <CardDescription>Administrative operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center" 
                            onClick={() => handleQuickAction('add-patient')}>
                      <Plus className="h-6 w-6 mb-2" />
                      Add Patient
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center"
                            onClick={() => handleQuickAction('add-doctor')}>
                      <Shield className="h-6 w-6 mb-2" />
                      Add Doctor
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center"
                            onClick={() => handleQuickAction('schedule')}>
                      <Calendar className="h-6 w-6 mb-2" />
                      Manage Appointments
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center"
                            onClick={() => handleQuickAction('ai-diagnosis')}>
                      <Activity className="h-6 w-6 mb-2" />
                      AI Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <PatientModule />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorModule />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentModule />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLayout;