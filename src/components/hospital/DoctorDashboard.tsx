import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  Users, 
  Stethoscope, 
  FileText, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Video,
  Phone
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  urgency: 'low' | 'medium' | 'high';
}

interface PatientAlert {
  id: string;
  patientName: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [consultationNotes, setConsultationNotes] = useState("");

  const [todaysAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "John Doe",
      time: "09:00 AM",
      type: "Consultation",
      status: 'completed',
      urgency: 'low'
    },
    {
      id: "2", 
      patientName: "Jane Smith",
      time: "10:30 AM",
      type: "Follow-up",
      status: 'in-progress',
      urgency: 'medium'
    },
    {
      id: "3",
      patientName: "Mike Johnson", 
      time: "02:00 PM",
      type: "Emergency",
      status: 'upcoming',
      urgency: 'high'
    },
    {
      id: "4",
      patientName: "Sarah Wilson",
      time: "03:30 PM", 
      type: "Consultation",
      status: 'upcoming',
      urgency: 'low'
    }
  ]);

  const [patientAlerts] = useState<PatientAlert[]>([
    {
      id: "1",
      patientName: "John Doe",
      message: "Blood pressure reading above normal range",
      severity: 'warning',
      timestamp: "10 min ago"
    },
    {
      id: "2",
      patientName: "Mike Johnson", 
      message: "Emergency consultation requested",
      severity: 'critical',
      timestamp: "2 min ago"
    },
    {
      id: "3",
      patientName: "Sarah Wilson",
      message: "Lab results available for review",
      severity: 'info',
      timestamp: "1 hour ago"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'upcoming': return <Calendar className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const handleVideoCall = (patientName?: string) => {
    if (patientName) {
      setSelectedPatient(patientName);
    }
    setIsVideoCallOpen(true);
    toast({
      title: "Video Call Started",
      description: `Starting video call${patientName ? ` with ${patientName}` : ''}...`,
    });
  };

  const handleQuickConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handlePhoneCall = (patientName: string) => {
    toast({
      title: "Phone Call",
      description: `Calling ${patientName}...`,
    });
  };

  const handleViewNotes = (patientName: string) => {
    toast({
      title: "Patient Notes",
      description: `Opening medical records for ${patientName}`,
    });
  };

  const handleConsultationSubmit = () => {
    if (!selectedPatient || !consultationNotes.trim()) {
      toast({
        title: "Error",
        description: "Please select a patient and add consultation notes",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Saved",
      description: `Consultation notes saved for ${selectedPatient}`,
    });
    setIsConsultationOpen(false);
    setSelectedPatient("");
    setConsultationNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h2>
          <p className="text-gray-600">Welcome back, Dr. Sarah Smith</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isVideoCallOpen} onOpenChange={setIsVideoCallOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => handleVideoCall()}>
                <Video className="h-4 w-4 mr-2" />
                Start Video Call
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Video Call</DialogTitle>
                <DialogDescription>
                  Video call interface would be integrated here with services like Zoom, WebRTC, or Twilio.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Video call starting...</p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedPatient ? `Connecting to ${selectedPatient}` : 'Ready to connect'}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => setIsVideoCallOpen(false)}
                >
                  End Call
                </Button>
                <Button variant="outline" className="flex-1">
                  Mute
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleQuickConsultation}>
                <Stethoscope className="h-4 w-4 mr-2" />
                Quick Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Quick Consultation</DialogTitle>
                <DialogDescription>
                  Record consultation notes and patient information
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Patient</label>
                  <Input 
                    placeholder="Enter patient name"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Consultation Notes</label>
                  <Textarea 
                    placeholder="Enter consultation notes, symptoms, diagnosis, treatment plan..."
                    value={consultationNotes}
                    onChange={(e) => setConsultationNotes(e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleConsultationSubmit} className="flex-1">
                    Save Consultation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setIsConsultationOpen(false);
                      setSelectedPatient("");
                      setConsultationNotes("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysAppointments.length}</div>
            <p className="text-xs text-muted-foreground">2 completed, 2 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientAlerts.length}</div>
            <p className="text-xs text-muted-foreground">1 critical, 2 others</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule Progress</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <Progress value={50} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
          <TabsTrigger value="alerts">Patient Alerts</TabsTrigger>
          <TabsTrigger value="consultations">Recent Consultations</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {appointment.patientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-medium">{appointment.time}</p>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(appointment.status)}
                          <span className="text-sm capitalize">{appointment.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      <Badge variant={getUrgencyColor(appointment.urgency) as any}>
                        {appointment.urgency}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePhoneCall(appointment.patientName)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleViewNotes(appointment.patientName)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleVideoCall(appointment.patientName)}
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Alerts</CardTitle>
              <CardDescription>Real-time notifications requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertCircle className={`h-5 w-5 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'warning' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium">{alert.patientName}</p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Consultations</CardTitle>
              <CardDescription>Latest patient interactions and notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">John Doe - Hypertension Follow-up</p>
                      <p className="text-sm text-gray-600">Blood pressure stable, continue current medication</p>
                    </div>
                    <Badge>Completed</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Today, 9:30 AM</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Jane Smith - Migraine Consultation</p>
                      <p className="text-sm text-gray-600">Prescribed new medication, scheduled follow-up in 2 weeks</p>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Today, 10:30 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Patients Treated</span>
                      <span>145/150</span>
                    </div>
                    <Progress value={97} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Consultation Quality</span>
                      <span>4.9/5.0</span>
                    </div>
                    <Progress value={98} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Treatment Success Rate</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialization Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cardiology Cases</span>
                    <Badge>58 this month</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Consultations</span>
                    <Badge variant="secondary">12 this month</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Follow-up Appointments</span>
                    <Badge variant="outline">75 this month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
