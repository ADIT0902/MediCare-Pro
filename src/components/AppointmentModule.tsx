import React, { useState } from 'react';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  priority: string;
}

const AppointmentModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    type: "",
    notes: ""
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
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
      alert("Please fill in all required fields");
      return;
    }

    const appointmentToAdd: Appointment = {
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
    alert(`Appointment for ${newAppointment.patientName} has been scheduled.`);
    setIsAddModalOpen(false);
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Appointment Management</h2>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <button 
          className="button button-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span className="icon icon-plus mr-2"></span>
          Schedule Appointment
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search appointments by patient, doctor, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <span className="icon icon-search absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}></span>
        </div>
        <select className="select" style={{ width: '12rem' }}>
          <option value="all">All Appointments</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="card cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                <p className="text-sm text-gray-600">ID: {appointment.id}</p>
              </div>
              <span className={`badge ${
                appointment.status === "Scheduled" ? "badge-success" :
                appointment.status === "Completed" ? "badge-primary" : "badge-warning"
              }`}>
                {appointment.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="icon icon-stethoscope mr-2"></span>
                {appointment.doctorName}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-calendar mr-2"></span>
                {appointment.date}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="icon icon-clock mr-2"></span>
                {appointment.time}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="badge badge-primary">{appointment.type}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Priority: {appointment.priority}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="button button-secondary">Reschedule</button>
                  <button className="button button-primary">Complete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="card text-center py-12">
          <span className="icon icon-xl icon-calendar" style={{ color: '#9ca3af', marginBottom: '1rem' }}></span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600 mb-4">No appointments match your search criteria.</p>
          <button className="button button-secondary" onClick={() => setSearchTerm("")}>
            Clear Search
          </button>
        </div>
      )}

      {/* Add Appointment Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Schedule New Appointment</h2>
            <p className="text-gray-600 mb-6">Enter appointment details to schedule a new appointment.</p>
            
            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">Patient Name *</label>
                <input 
                  type="text"
                  placeholder="John Doe" 
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Doctor *</label>
                <select 
                  value={newAppointment.doctorName}
                  onChange={(e) => setNewAppointment({...newAppointment, doctorName: e.target.value})}
                  className="select"
                >
                  <option value="">Select doctor</option>
                  <option value="Dr. Smith">Dr. Smith - Cardiology</option>
                  <option value="Dr. Johnson">Dr. Johnson - Neurology</option>
                  <option value="Dr. Brown">Dr. Brown - Orthopedics</option>
                </select>
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input 
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time *</label>
                <input 
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  className="input"
                />
              </div>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Appointment Type</label>
              <select 
                value={newAppointment.type}
                onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                className="select"
              >
                <option value="">Select type</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Check-up">Check-up</option>
              </select>
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
                onClick={handleAddAppointment}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentModule;