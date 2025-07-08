import React, { useState } from 'react';

const PatientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const patientData = {
    name: "John Doe",
    id: "P001",
    age: 45,
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25"
  };

  const appointments = [
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
  ];

  const medicalRecords = [
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
  ];

  const vitalSigns = [
    { metric: "Blood Pressure", value: "120/80 mmHg", status: "Normal", date: "2024-01-15" },
    { metric: "Heart Rate", value: "72 bpm", status: "Normal", date: "2024-01-15" },
    { metric: "Temperature", value: "98.6°F", status: "Normal", date: "2024-01-15" },
    { metric: "Weight", value: "75 kg", status: "Normal", date: "2024-01-15" }
  ];

  const handleVideoCall = () => {
    alert("Starting video consultation...");
  };

  const handleDownloadRecord = (record: any) => {
    alert(`Downloading ${record.type} from ${record.date}`);
  };

  const handleUploadDocument = () => {
    alert("Document upload feature coming soon");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Patient Portal</h2>
          <p className="text-gray-600">Access your medical information and manage appointments</p>
        </div>
        <div className="flex space-x-2">
          <button className="button button-secondary" onClick={handleVideoCall}>
            <span className="icon icon-video mr-2"></span>
            Video Consultation
          </button>
          <button className="button button-primary" onClick={handleUploadDocument}>
            Upload Document
          </button>
        </div>
      </div>

      {/* Patient Overview */}
      <div className="card">
        <h3 className="font-semibold mb-4 flex items-center">
          <div 
            className="flex items-center justify-center mr-3"
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
            <h3 className="text-xl font-semibold">{patientData.name}</h3>
            <p className="text-gray-600">Patient ID: {patientData.id}</p>
          </div>
        </h3>
        <div className="grid grid-cols-2 gap-4">
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
                <span key={index} className="badge badge-danger">{allergy}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`nav-tab ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => setActiveTab('records')}
        >
          Medical Records
        </button>
        <button 
          className={`nav-tab ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          Vital Signs
        </button>
        <button 
          className={`nav-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'appointments' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
          <p className="text-sm text-gray-600 mb-4">Your scheduled appointments with healthcare providers</p>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded">
                <div className="flex items-center space-x-4">
                  <span className="icon icon-calendar" style={{ color: '#3b82f6' }}></span>
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
                <span className={`badge ${appointment.status === "Scheduled" ? "badge-success" : "badge-warning"}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Medical Records</h3>
          <p className="text-sm text-gray-600 mb-4">Access your test results, reports, and medical documents</p>
          <div className="space-y-4">
            {medicalRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded">
                <div className="flex items-center space-x-4">
                  <span className="icon icon-file" style={{ color: '#16a34a' }}></span>
                  <div>
                    <p className="font-medium">{record.type}</p>
                    <p className="text-sm text-gray-600">Dr. {record.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{record.date}</p>
                  <span className="badge badge-primary">{record.status}</span>
                </div>
                <button 
                  className="button button-secondary"
                  onClick={() => handleDownloadRecord(record)}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'vitals' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Vital Signs</h3>
          <p className="text-sm text-gray-600 mb-4">Your latest vital signs and health metrics</p>
          <div className="grid grid-cols-1 gap-4">
            {vitalSigns.map((vital, index) => (
              <div key={index} className="p-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{vital.metric}</h4>
                  <span className={`badge ${vital.status === "Normal" ? "badge-success" : "badge-danger"}`}>
                    {vital.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{vital.value}</p>
                <p className="text-sm text-gray-600">Recorded on {vital.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Messages</h3>
          <p className="text-sm text-gray-600 mb-4">Communication with your healthcare team</p>
          <div className="space-y-4">
            <div className="p-4 border rounded">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Dr. Smith</h4>
                <span className="text-sm text-gray-600">2 hours ago</span>
              </div>
              <p className="text-sm">Your latest lab results are available. Please schedule a follow-up appointment to discuss the results.</p>
            </div>
            <div className="p-4 border rounded">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Appointment Reminder</h4>
                <span className="text-sm text-gray-600">1 day ago</span>
              </div>
              <p className="text-sm">You have an upcoming appointment with Dr. Smith on January 25th at 10:00 AM.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPortal;