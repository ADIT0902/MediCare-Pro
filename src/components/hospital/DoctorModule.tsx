
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, User, Phone, Mail, Calendar, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoctorModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
    department: "",
    qualifications: ""
  });

  const [doctors, setDoctors] = useState([
    {
      id: "D001",
      name: "Dr. John Smith",
      specialization: "Cardiology",
      experience: "15 years",
      phone: "+1 234-567-8900",
      email: "john.smith@hospital.com",
      department: "Cardiology",
      status: "Available",
      patients: 45,
      rating: 4.9
    },
    {
      id: "D002",
      name: "Dr. Sarah Johnson",
      specialization: "Neurology",
      experience: "12 years",
      phone: "+1 234-567-8901",
      email: "sarah.johnson@hospital.com",
      department: "Neurology",
      status: "Busy",
      patients: 38,
      rating: 4.8
    },
    {
      id: "D003",
      name: "Dr. Michael Brown",
      specialization: "Orthopedics",
      experience: "8 years",
      phone: "+1 234-567-8902",
      email: "michael.brown@hospital.com",
      department: "Orthopedics",
      status: "Available",
      patients: 32,
      rating: 4.7
    }
  ]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    if (!newDoctor.firstName || !newDoctor.lastName || !newDoctor.specialization || !newDoctor.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (First Name, Last Name, Specialization, Experience)",
        variant: "destructive"
      });
      return;
    }

    const doctorToAdd = {
      id: `D${String(doctors.length + 1).padStart(3, '0')}`,
      name: `Dr. ${newDoctor.firstName} ${newDoctor.lastName}`,
      specialization: newDoctor.specialization,
      experience: newDoctor.experience,
      phone: newDoctor.phone || "Not provided",
      email: newDoctor.email || "Not provided",
      department: newDoctor.department || newDoctor.specialization,
      status: "Available",
      patients: 0,
      rating: 0
    };

    setDoctors([...doctors, doctorToAdd]);

    toast({
      title: "Doctor Added",
      description: `Dr. ${newDoctor.firstName} ${newDoctor.lastName} has been successfully registered.`,
    });

    setIsAddDialogOpen(false);
    setNewDoctor({
      firstName: "",
      lastName: "",
      specialization: "",
      experience: "",
      phone: "",
      email: "",
      department: "",
      qualifications: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Doctor Management</h2>
          <p className="text-gray-600">Manage doctor profiles and schedules</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>Enter doctor information to create a new profile.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={newDoctor.firstName}
                  onChange={(e) => setNewDoctor({...newDoctor, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName" 
                  placeholder="Smith" 
                  value={newDoctor.lastName}
                  onChange={(e) => setNewDoctor({...newDoctor, lastName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Select 
                  onValueChange={(value) => setNewDoctor({...newDoctor, specialization: value})}
                  value={newDoctor.specialization}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                <Input 
                  id="experience" 
                  placeholder="5 years" 
                  value={newDoctor.experience}
                  onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 234-567-8900" 
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="doctor@hospital.com" 
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department" 
                  placeholder="Cardiology Department" 
                  value={newDoctor.department}
                  onChange={(e) => setNewDoctor({...newDoctor, department: e.target.value})}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Textarea 
                  id="qualifications" 
                  placeholder="MBBS, MD, Fellowship details..." 
                  value={newDoctor.qualifications}
                  onChange={(e) => setNewDoctor({...newDoctor, qualifications: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDoctor}>Add Doctor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search doctors by name, specialization, or ID..."
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
            <SelectItem value="all">All Doctors</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="off-duty">Off Duty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription>ID: {doctor.id}</CardDescription>
                  </div>
                </div>
                <Badge variant={
                  doctor.status === "Available" ? "default" :
                  doctor.status === "Busy" ? "secondary" : "outline"
                }>
                  {doctor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {doctor.specialization}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {doctor.experience} experience
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {doctor.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {doctor.email}
                </div>
                <div className="pt-2">
                  <Badge variant="outline">{doctor.department}</Badge>
                </div>
                <div className="text-xs text-gray-500">
                  Patients: {doctor.patients} | Rating: {doctor.rating}/5.0
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  View Schedule
                </Button>
                <Button size="sm" className="flex-1">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-4">No doctors match your search criteria.</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>Clear Search</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorModule;
