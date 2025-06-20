
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Search, User, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppointmentModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    type: "",
    notes: ""
  });

  const [appointments, setAppointments] = useState([
    {
      id: "A001",
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      date: "2024-01-20",
      time: "09:00 AM",
      type: "Consultation",
      status: "Scheduled",
      priority: "Normal"
    },
    {
      id: "A002",
      patientName: "Jane Smith",
      doctorName: "Dr. Johnson",
      date: "2024-01-20",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Completed",
      priority: "Normal"
    },
    {
      id: "A003",
      patientName: "Mike Johnson",
      doctorName: "Dr. Brown",
      date: "2024-01-21",
      time: "02:00 PM",
      type: "Emergency",
      status: "Scheduled",
      priority: "High"
    }
  ]);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.doctorName || !newAppointment.date || !newAppointment.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const appointmentToAdd = {
      id: `A${String(appointments.length + 1).padStart(3, '0')}`,
      patientName: newAppointment.patientName,
      doctorName: newAppointment.doctorName,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type || "Consultation",
      status: "Scheduled",
      priority: "Normal"
    };

    setAppointments([...appointments, appointmentToAdd]);

    toast({
      title: "Appointment Scheduled",
      description: `Appointment for ${newAppointment.patientName} has been scheduled.`,
    });

    setIsAddDialogOpen(false);
    setNewAppointment({
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
      type: "",
      notes: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Appointment Management</h2>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Enter appointment details to schedule a new appointment.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input 
                  id="patientName" 
                  placeholder="John Doe" 
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor *</Label>
                <Select 
                  onValueChange={(value) => setNewAppointment({...newAppointment, doctorName: value})}
                  value={newAppointment.doctorName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Smith">Dr. Smith - Cardiology</SelectItem>
                    <SelectItem value="Dr. Johnson">Dr. Johnson - Neurology</SelectItem>
                    <SelectItem value="Dr. Brown">Dr. Brown - Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select 
                  onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}
                  value={newAppointment.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAppointment}>Schedule Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search appointments by patient, doctor, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Appointments</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                  <CardDescription>ID: {appointment.id}</CardDescription>
                </div>
                <Badge variant={
                  appointment.status === "Scheduled" ? "default" :
                  appointment.status === "Completed" ? "secondary" : "outline"
                }>
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  {appointment.doctorName}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {appointment.date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {appointment.time}
                </div>
                <div className="pt-2">
                  <Badge variant="outline">{appointment.type}</Badge>
                </div>
                <div className="text-xs text-gray-500">
                  Priority: {appointment.priority}
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  Reschedule
                </Button>
                <Button size="sm" className="flex-1">
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-4">No appointments match your search criteria.</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>Clear Search</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentModule;
