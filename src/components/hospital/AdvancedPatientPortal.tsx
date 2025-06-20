
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, FileText, Heart, Phone, Video, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdvancedPatientPortal = () => {
  const { toast } = useToast();

  const [patientData] = useState({
    name: "John Doe",
    id: "P001",
    age: 45,
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25"
  });

  const [appointments] = useState([
    {
      id: "A001",
      doctor: "Dr. Smith",
      date: "2024-01-25",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Scheduled"
    },
    {
      id: "A002", 
      doctor: "Dr. Johnson",
      date: "2024-02-05",
      time: "2:00 PM",
      type: "Consultation",
      status: "Pending"
    }
  ]);

  const [medicalRecords] = useState([
    {
      date: "2024-01-15",
      type: "Lab Results",
      doctor: "Dr. Smith",
      status: "Available"
    },
    {
      date: "2024-01-10",
      type: "X-Ray Report",
      doctor: "Dr. Brown",
      status: "Available"
    },
    {
      date: "2024-01-05",
      type: "Prescription",
      doctor: "Dr. Johnson",
      status: "Available"
    }
  ]);

  const [vitalSigns] = useState([
    { metric: "Blood Pressure", value: "120/80 mmHg", status: "Normal", date: "2024-01-15" },
    { metric: "Heart Rate", value: "72 bpm", status: "Normal", date: "2024-01-15" },
    { metric: "Temperature", value: "98.6°F", status: "Normal", date: "2024-01-15" },
    { metric: "Weight", value: "75 kg", status: "Normal", date: "2024-01-15" }
  ]);

  const handleVideoCall = () => {
    toast({
      title: "Video Call",
      description: "Starting video consultation...",
    });
  };

  const handleDownloadRecord = (record: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${record.type} from ${record.date}`,
    });
  };

  const handleUploadDocument = () => {
    toast({
      title: "Upload Document",
      description: "Document upload feature coming soon",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Patient Portal</h2>
          <p className="text-gray-600">Access your medical information and manage appointments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleVideoCall}>
            <Video className="h-4 w-4 mr-2" />
            Video Consultation
          </Button>
          <Button onClick={handleUploadDocument}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Patient Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{patientData.name}</h3>
              <p className="text-gray-600">Patient ID: {patientData.id}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-semibold">{patientData.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Blood Type</p>
              <p className="font-semibold">{patientData.bloodType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Visit</p>
              <p className="font-semibold">{patientData.lastVisit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Appointment</p>
              <p className="font-semibold">{patientData.nextAppointment}</p>
            </div>
          </div>
          {patientData.allergies.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Allergies</p>
              <div className="flex space-x-2">
                {patientData.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive">{allergy}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled appointments with healthcare providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                    <Badge variant={appointment.status === "Scheduled" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Access your test results, reports, and medical documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-gray-600">Dr. {record.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{record.date}</p>
                      <Badge variant="outline">{record.status}</Badge>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadRecord(record)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
              <CardDescription>Your latest vital signs and health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vitalSigns.map((vital, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{vital.metric}</h4>
                      <Badge variant={vital.status === "Normal" ? "default" : "destructive"}>
                        {vital.status}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{vital.value}</p>
                    <p className="text-sm text-gray-600">Recorded on {vital.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communication with your healthcare team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Dr. Smith</h4>
                    <span className="text-sm text-gray-600">2 hours ago</span>
                  </div>
                  <p className="text-sm">Your latest lab results are available. Please schedule a follow-up appointment to discuss the results.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Appointment Reminder</h4>
                    <span className="text-sm text-gray-600">1 day ago</span>
                  </div>
                  <p className="text-sm">You have an upcoming appointment with Dr. Smith on January 25th at 10:00 AM.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPatientPortal;
