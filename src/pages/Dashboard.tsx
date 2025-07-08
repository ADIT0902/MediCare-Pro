import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientModule from '../components/PatientModule';
import DoctorModule from '../components/DoctorModule';
import AppointmentModule from '../components/AppointmentModule';
import AIAssistant from '../components/AIAssistant';
import PatientPortal from '../components/PatientPortal';

const Dashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [notifications] = useState(3);
  const navigate = useNavigate();

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: "Total Patients",
      value: "1,234",
      change: "+12%",
      icon: "👥",
      color: "#2563eb"
    },
    {
      title: "Today's Appointments",
      value: "45",
      change: "+5%",
      icon: "📅",
      color: "#16a34a"
    },
    {
      title: "Active Cases",
      value: "89",
      change: "-3%",
      icon: "📊",
      color: "#ea580c"
    },
    {
      title: "Emergency Cases",
      value: "7",
      change: "+2",
      icon: "❤️",
      color: "#dc2626"
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

  const showNotification = (message: string) => {
    alert(message); // Simple notification - can be enhanced
  };

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'add-patient':
        setActiveModule('patients');
        showNotification('Opening patient registration form');
        break;
      case 'schedule':
        setActiveModule('appointments');
        showNotification('Opening appointment scheduler');
        break;
      case 'ai-diagnosis':
        setActiveModule('ai-assistant');
        showNotification('Opening AI diagnostic assistant');
        break;
      case 'emergency':
        showNotification('Emergency response team notified');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate("/")}
                className="button button-secondary mr-3"
              >
                <span className="icon icon-arrow-left mr-2"></span>
                Back to Home
              </button>
              <span className="icon icon-xl icon-heart mr-3"></span>
              <h1 className="text-2xl font-bold text-gray-900">MediCare Hospital</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="button button-secondary">
                <span className="icon icon-search mr-2"></span>
                Search
              </button>
              <button className="button button-secondary relative">
                <span className="icon icon-bell"></span>
                {notifications > 0 && (
                  <span 
                    className="badge badge-danger absolute"
                    style={{ 
                      top: '-8px', 
                      right: '-8px', 
                      minWidth: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {notifications}
                  </span>
                )}
              </button>
              <button className="button button-secondary">
                <span className="icon icon-settings"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeModule === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveModule('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-tab ${activeModule === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveModule('patients')}
          >
            Patients
          </button>
          <button 
            className={`nav-tab ${activeModule === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveModule('doctors')}
          >
            Doctors
          </button>
          <button 
            className={`nav-tab ${activeModule === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveModule('appointments')}
          >
            Appointments
          </button>
          <button 
            className={`nav-tab ${activeModule === 'ai-assistant' ? 'active' : ''}`}
            onClick={() => setActiveModule('ai-assistant')}
          >
            AI Assistant
          </button>
          <button 
            className={`nav-tab ${activeModule === 'patient-portal' ? 'active' : ''}`}
            onClick={() => setActiveModule('patient-portal')}
          >
            Patient Portal
          </button>
        </div>

        {/* Dashboard Content */}
        {activeModule === 'dashboard' && (
          <div className="space-y-6">
            {/* Emergency Alerts */}
            {emergencyAlerts.length > 0 && (
              <div className="card" style={{ borderLeft: '4px solid #dc2626', background: '#fef2f2' }}>
                <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                  <span className="icon icon-heart mr-2"></span>
                  Emergency Alerts
                </h3>
                <div className="space-y-4">
                  {emergencyAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded">
                      <span className="text-sm">{alert.message}</span>
                      <span className={`badge ${alert.severity === 'high' ? 'badge-danger' : 'badge-warning'}`}>
                        {alert.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 gap-6">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">{stat.title}</h4>
                    <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <p className="text-sm text-gray-600">
                    <span style={{ color: stat.change.startsWith('+') ? '#16a34a' : '#dc2626' }}>
                      {stat.change}
                    </span>
                    {' '}from last month
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activities and Quick Actions */}
            <div className="grid grid-cols-1 gap-6">
              {/* Recent Activities */}
              <div className="card">
                <h3 className="font-semibold mb-2">Recent Activities</h3>
                <p className="text-sm text-gray-600 mb-4">Latest hospital activities and updates</p>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-sm text-gray-600">{activity.patient} • {activity.time}</p>
                      </div>
                      <span className={`badge ${
                        activity.status === "urgent" ? "badge-danger" :
                        activity.status === "success" ? "badge-success" : "badge-primary"
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <p className="text-sm text-gray-600 mb-4">Frequently used hospital operations</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="button button-primary flex flex-col items-center justify-center"
                    style={{ height: '5rem' }}
                    onClick={() => handleQuickAction('add-patient')}
                  >
                    <span className="icon icon-lg icon-plus mb-2"></span>
                    Add Patient
                  </button>
                  <button 
                    className="button button-secondary flex flex-col items-center justify-center"
                    style={{ height: '5rem' }}
                    onClick={() => handleQuickAction('schedule')}
                  >
                    <span className="icon icon-lg icon-calendar mb-2"></span>
                    Schedule Appointment
                  </button>
                  <button 
                    className="button button-secondary flex flex-col items-center justify-center"
                    style={{ height: '5rem' }}
                    onClick={() => handleQuickAction('ai-diagnosis')}
                  >
                    <span className="icon icon-lg icon-activity mb-2"></span>
                    AI Diagnosis
                  </button>
                  <button 
                    className="button button-secondary flex flex-col items-center justify-center"
                    style={{ height: '5rem' }}
                    onClick={() => handleQuickAction('emergency')}
                  >
                    <span className="icon icon-lg icon-heart mb-2"></span>
                    Emergency
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module Components */}
        {activeModule === 'patients' && <PatientModule />}
        {activeModule === 'doctors' && <DoctorModule />}
        {activeModule === 'appointments' && <AppointmentModule />}
        {activeModule === 'ai-assistant' && <AIAssistant />}
        {activeModule === 'patient-portal' && <PatientPortal />}
      </div>
    </div>
  );
};

export default Dashboard;