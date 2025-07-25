import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Activity, Heart, Plus, Search, Bell, Settings, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PatientModule from "@/components/hospital/PatientModule";
import DoctorModule from "@/components/hospital/DoctorModule";
import AppointmentModule from "@/components/hospital/AppointmentModule";
import AIAssistant from "@/components/hospital/AIAssistant";
import GlobalSearch from "@/components/hospital/GlobalSearch";
import AdvancedPatientPortal from "@/components/hospital/AdvancedPatientPortal";
import DoctorDashboard from "@/components/hospital/DoctorDashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: "Total Patients",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Today's Appointments",
      value: "45",
      change: "+5%",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Active Cases",
      value: "89",
      change: "-3%",
      icon: Activity,
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
    { type: "Patient Admitted", patient: "John Doe", time: "10 min ago", status: "urgent" },
    { type: "Surgery Completed", patient: "Jane Smith", time: "30 min ago", status: "success" },
    { type: "Lab Results Ready", patient: "Mike Johnson", time: "1 hour ago", status: "normal" },
    { type: "Discharge Approved", patient: "Sarah Wilson", time: "2 hours ago", status: "normal" }
  ];

  const emergencyAlerts = [
    { message: "Patient in Room 301 needs immediate attention", severity: "high" },
    { message: "ICU at 95% capacity", severity: "medium" },
    { message: "Blood bank low on O- type", severity: "medium" }
  ];

  const handleSearchResultSelect = (moduleType: string) => {
    setActiveModule(moduleType);
  };

  const handleModuleChange = (moduleType: string) => {
    setActiveModule(moduleType);
    
    // Show toast when switching to a module
    if (moduleType !== "dashboard") {
      toast({
        title: `${moduleType.charAt(0).toUpperCase() + moduleType.slice(1)} Module`,
        description: `You've switched to the ${moduleType} module`
      });
    }
  };

  const handleEmergencyProtocol = () => {
    toast({ 
      title: "Emergency Protocol", 
      description: "Emergency response team notified" 
    });
  };

  const handleScheduleAppointment = () => {
    setActiveModule("appointments");
    toast({
      title: "Schedule Appointment",
      description: "Opening appointment scheduler"
    });
  };

  const handleAIDiagnosis = () => {
    setActiveModule("ai-assistant");
    toast({
      title: "AI Diagnosis",
      description: "Opening AI diagnostic assistant"
    });
  };

  const handleAddPatient = () => {
    setActiveModule("patients");
    toast({
      title: "Add Patient",
      description: "Opening patient registration form"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="mr-3"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MediCare Hospital</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
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
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="patient-portal">Patient Portal</TabsTrigger>
            <TabsTrigger value="doctor-dashboard">Doctor Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Emergency Alerts */}
            {emergencyAlerts.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Emergency Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {emergencyAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm">{alert.message}</span>
                        <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
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
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest hospital activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{activity.type}</p>
                          <p className="text-xs text-muted-foreground">{activity.patient} • {activity.time}</p>
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

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used hospital operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center" 
                            onClick={handleAddPatient}>
                      <Plus className="h-6 w-6 mb-2" />
                      Add Patient
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center"
                            onClick={handleScheduleAppointment}>
                      <Calendar className="h-6 w-6 mb-2" />
                      Schedule Appointment
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center"
                            onClick={handleAIDiagnosis}>
                      <Activity className="h-6 w-6 mb-2" />
                      AI Diagnosis
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center"
                            onClick={handleEmergencyProtocol}>
                      <Heart className="h-6 w-6 mb-2" />
                      Emergency
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

          <TabsContent value="patient-portal">
            <AdvancedPatientPortal />
          </TabsContent>

          <TabsContent value="doctor-dashboard">
            <DoctorDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
