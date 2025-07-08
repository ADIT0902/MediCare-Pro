import React, { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
  department: string;
  status: string;
  patients: number;
  rating: number;
}

const DoctorModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const [doctors, setDoctors] = useState<Doctor[]>([
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
      alert("Please fill in all required fields (First Name, Last Name, Specialization, Experience)");
      return;
    }

    const doctorToAdd: Doctor = {
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
    alert(`Dr. ${newDoctor.firstName} ${newDoctor.lastName} has been successfully registered.`);
    setIsAddModalOpen(false);
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Doctor Management</h2>
          <p className="text-gray-600">Manage doctor profiles and schedules</p>
        </div>
        <button 
          className="button button-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span className="icon icon-plus mr-2"></span>
          Add Doctor
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search doctors by name, specialization, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <span className="icon icon-search absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}></span>
        </div>
        <select className="select" style={{ width: '12rem' }}>
          <option value="all">All Doctors</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="off-duty">Off Duty</option>
        </select>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="card cursor-pointer">
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
                  <span className="icon icon-lg icon-stethoscope" style={{ color: '#2563eb' }}></span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">ID: {doctor.id}</p>
                </div>
              </div>
              <span className={`badge ${
                doctor.status === "Available" ? "badge-success" :
                doctor.status === "Busy" ? "badge-warning" : "badge-primary"
              }`}>
                {doctor.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="icon icon-user mr-2"></span>
                {doctor.specialization}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-calendar mr-2"></span>
                {doctor.experience} experience
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-phone mr-2"></span>
                {doctor.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-mail mr-2"></span>
                {doctor.email}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <span className="badge badge-primary">{doctor.department}</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Patients: {doctor.patients} | Rating: {doctor.rating}/5.0
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="button button-secondary">View Schedule</button>
                  <button className="button button-primary">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="card text-center py-12">
          <span className="icon icon-xl icon-stethoscope" style={{ color: '#9ca3af', marginBottom: '1rem' }}></span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600 mb-4">No doctors match your search criteria.</p>
          <button className="button button-secondary" onClick={() => setSearchTerm("")}>
            Clear Search
          </button>
        </div>
      )}

      {/* Add Doctor Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
            <p className="text-gray-600 mb-6">Enter doctor information to create a new profile.</p>
            
            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input 
                  type="text"
                  placeholder="John" 
                  value={newDoctor.firstName}
                  onChange={(e) => setNewDoctor({...newDoctor, firstName: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input 
                  type="text"
                  placeholder="Smith" 
                  value={newDoctor.lastName}
                  onChange={(e) => setNewDoctor({...newDoctor, lastName: e.target.value})}
                  className="input"
                />
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">Specialization *</label>
                <select 
                  value={newDoctor.specialization}
                  onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                  className="select"
                >
                  <option value="">Select specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Experience *</label>
                <input 
                  type="text"
                  placeholder="5 years" 
                  value={newDoctor.experience}
                  onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                  className="input"
                />
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input 
                  type="tel"
                  placeholder="+1 234-567-8900" 
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email"
                  placeholder="doctor@hospital.com" 
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                  className="input"
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Department</label>
              <input 
                type="text"
                placeholder="Cardiology Department" 
                value={newDoctor.department}
                onChange={(e) => setNewDoctor({...newDoctor, department: e.target.value})}
                className="input"
              />
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Qualifications</label>
              <textarea 
                placeholder="MBBS, MD, Fellowship details..." 
                value={newDoctor.qualifications}
                onChange={(e) => setNewDoctor({...newDoctor, qualifications: e.target.value})}
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
                onClick={handleAddDoctor}
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorModule;