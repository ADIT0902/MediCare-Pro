
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, User, Phone, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    medicalHistory: ""
  });

  // Mock patient data - now using state so it can be updated
  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8900",
      email: "john.doe@email.com",
      condition: "Hypertension",
      status: "Active",
      lastVisit: "2024-01-15",
      doctor: "Dr. Smith"
    },
    {
      id: "P002",
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      phone: "+1 234-567-8901",
      email: "jane.smith@email.com",
      condition: "Diabetes",
      status: "Discharged",
      lastVisit: "2024-01-10",
      doctor: "Dr. Johnson"
    },
    {
      id: "P003",
      name: "Mike Johnson",
      age: 28,
      gender: "Male",
      phone: "+1 234-567-8902",
      email: "mike.j@email.com",
      condition: "Fracture",
      status: "In Treatment",
      lastVisit: "2024-01-20",
      doctor: "Dr. Brown"
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.age || !newPatient.gender) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (First Name, Last Name, Age, Gender)",
        variant: "destructive"
      });
      return;
    }

    // Create new patient object
    const patientToAdd = {
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      name: `${newPatient.firstName} ${newPatient.lastName}`,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone || "Not provided",
      email: newPatient.email || "Not provided",
      condition: "General Checkup",
      status: "Active",
      lastVisit: new Date().toISOString().split('T')[0],
      doctor: "Not assigned"
    };

    // Add to patients list
    setPatients([...patients, patientToAdd]);

    toast({
      title: "Patient Added",
      description: `${newPatient.firstName} ${newPatient.lastName} has been successfully registered.`,
    });

    setIsAddDialogOpen(false);
    setNewPatient({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      medicalHistory: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter patient information to create a new record.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={newPatient.firstName}
                  onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={newPatient.lastName}
                  onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="30" 
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select 
                  onValueChange={(value) => setNewPatient({...newPatient, gender: value})}
                  value={newPatient.gender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 234-567-8900" 
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Patient address" 
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea 
                  id="medicalHistory" 
                  placeholder="Previous medical conditions, allergies, etc." 
                  value={newPatient.medicalHistory}
                  onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient}>Add Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search patients by name or ID..."
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
            <SelectItem value="all">All Patients</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="discharged">Discharged</SelectItem>
            <SelectItem value="in-treatment">In Treatment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>ID: {patient.id}</CardDescription>
                  </div>
                </div>
                <Badge variant={
                  patient.status === "Active" ? "default" :
                  patient.status === "In Treatment" ? "secondary" : "outline"
                }>
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  {patient.age} years, {patient.gender}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {patient.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last visit: {patient.lastVisit}
                </div>
                <div className="pt-2">
                  <Badge variant="outline">{patient.condition}</Badge>
                </div>
                <div className="text-xs text-gray-500">
                  Assigned to: {patient.doctor}
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-4">No patients match your search criteria.</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>Clear Search</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientModule;
