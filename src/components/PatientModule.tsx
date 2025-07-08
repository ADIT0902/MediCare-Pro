import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  condition: string;
  status: string;
  lastVisit: string;
  doctor: string;
}

const PatientModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const [patients, setPatients] = useState<Patient[]>([
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
      alert("Please fill in all required fields (First Name, Last Name, Age, Gender)");
      return;
    }

    const patientToAdd: Patient = {
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

    setPatients([...patients, patientToAdd]);
    alert(`${newPatient.firstName} ${newPatient.lastName} has been successfully registered.`);
    setIsAddModalOpen(false);
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
        <button 
          className="button button-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span className="icon icon-plus mr-2"></span>
          Add Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <span className="icon icon-search absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}></span>
        </div>
        <select className="select" style={{ width: '12rem' }}>
          <option value="all">All Patients</option>
          <option value="active">Active</option>
          <option value="discharged">Discharged</option>
          <option value="in-treatment">In Treatment</option>
        </select>
      </div>

      {/* Patient List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="card cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="flex items-center justify-center"
                  style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: '#dbeafe', 
                    borderRadius: '50%' 
                  }}
                >
                  <span className="icon icon-lg icon-user" style={{ color: '#2563eb' }}></span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <p className="text-sm text-gray-600">ID: {patient.id}</p>
                </div>
              </div>
              <span className={`badge ${
                patient.status === "Active" ? "badge-success" :
                patient.status === "In Treatment" ? "badge-warning" : "badge-primary"
              }`}>
                {patient.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="icon icon-user mr-2"></span>
                {patient.age} years, {patient.gender}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-phone mr-2"></span>
                {patient.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-mail mr-2"></span>
                {patient.email}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-calendar mr-2"></span>
                Last visit: {patient.lastVisit}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <span className="badge badge-primary">{patient.condition}</span>
                  <p className="text-sm text-gray-600 mt-1">Assigned to: {patient.doctor}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="button button-secondary">View Details</button>
                  <button className="button button-primary">Edit</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="card text-center py-12">
          <span className="icon icon-xl icon-user" style={{ color: '#9ca3af', marginBottom: '1rem' }}></span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600 mb-4">No patients match your search criteria.</p>
          <button className="button button-secondary" onClick={() => setSearchTerm("")}>
            Clear Search
          </button>
        </div>
      )}

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
            <p className="text-gray-600 mb-6">Enter patient information to create a new record.</p>
            
            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input 
                  type="text"
                  placeholder="John" 
                  value={newPatient.firstName}
                  onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input 
                  type="text"
                  placeholder="Doe" 
                  value={newPatient.lastName}
                  onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
                  className="input"
                />
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input 
                  type="number"
                  placeholder="30" 
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select 
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  className="select"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input 
                  type="tel"
                  placeholder="+1 234-567-8900" 
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email"
                  placeholder="john@example.com" 
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  className="input"
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Address</label>
              <textarea 
                placeholder="Patient address" 
                value={newPatient.address}
                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                className="textarea"
              />
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Medical History</label>
              <textarea 
                placeholder="Previous medical conditions, allergies, etc." 
                value={newPatient.medicalHistory}
                onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                className="textarea"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button 
                className="button button-secondary" 
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="button button-primary" 
                onClick={handleAddPatient}
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientModule;