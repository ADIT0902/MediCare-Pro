import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "👥",
      title: "Patient Management",
      description: "Comprehensive patient records, medical history, and treatment tracking"
    },
    {
      icon: "📅",
      title: "Smart Scheduling",
      description: "AI-powered appointment scheduling with automated reminders"
    },
    {
      icon: "🧠",
      title: "AI Diagnostics",
      description: "Advanced symptom analysis and preliminary diagnosis suggestions"
    },
    {
      icon: "📊",
      title: "Real-time Monitoring",
      description: "Live patient status updates and emergency alert system"
    },
    {
      icon: "🛡️",
      title: "Secure & Compliant",
      description: "HIPAA-compliant data handling with enterprise-grade security"
    },
    {
      icon: "📄",
      title: "Digital Records",
      description: "Paperless medical records with instant access and sharing"
    }
  ];

  const stats = [
    { value: "10K+", label: "Patients Served" },
    { value: "500+", label: "Healthcare Providers" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e8f5e8 100%)' }}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="icon icon-xl icon-heart mr-3"></span>
              <h1 className="text-2xl font-bold" style={{ background: 'linear-gradient(45deg, #2563eb, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                MediCare Pro
              </h1>
            </div>
            <button 
              onClick={() => navigate("/dashboard")} 
              className="button button-primary"
              style={{ background: 'linear-gradient(45deg, #2563eb, #16a34a)' }}
            >
              Get Started
              <span className="icon icon-arrow-right" style={{ marginLeft: '0.5rem' }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container text-center">
          <div className="badge badge-primary mb-6" style={{ background: '#dbeafe', color: '#1e40af' }}>
            <span style={{ marginRight: '0.25rem' }}>⚡</span>
            AI-Powered Healthcare Management
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Revolutionary
            <span className="block" style={{ background: 'linear-gradient(45deg, #2563eb, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Hospital Management
            </span>
            System
          </h1>
          
          <p className="text-xl text-gray-600 mb-8" style={{ maxWidth: '48rem', margin: '0 auto 2rem', lineHeight: '1.7' }}>
            Streamline your healthcare operations with our cutting-edge AI-powered platform. 
            Manage patients, schedules, and medical records with unprecedented efficiency and accuracy.
          </p>
          
          <div className="flex flex-col gap-4 justify-center mb-8" style={{ alignItems: 'center' }}>
            <button 
              onClick={() => navigate("/dashboard")}
              className="button button-primary"
              style={{ 
                background: 'linear-gradient(45deg, #2563eb, #16a34a)', 
                fontSize: '1.125rem', 
                padding: '0.75rem 2rem' 
              }}
            >
              <span className="icon icon-hospital mr-2"></span>
              Start Managing Now
            </button>
            <button 
              className="button button-secondary"
              style={{ fontSize: '1.125rem', padding: '0.75rem 2rem' }}
            >
              <span className="icon icon-stethoscope mr-2"></span>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4" style={{ maxWidth: '64rem', margin: '0 auto' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Healthcare
            </h2>
            <p className="text-lg text-gray-600" style={{ maxWidth: '32rem', margin: '0 auto' }}>
              Our comprehensive platform includes all the tools modern healthcare facilities need to operate efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {features.map((feature, index) => (
              <div key={index} className="card" style={{ transition: 'all 0.3s ease' }}>
                <div 
                  className="mb-4" 
                  style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'linear-gradient(135deg, #3b82f6, #22c55e)', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600" style={{ lineHeight: '1.7' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20" style={{ background: 'linear-gradient(45deg, #2563eb, #16a34a)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-lg text-white" style={{ maxWidth: '32rem', margin: '0 auto', opacity: '0.9' }}>
              Our AI assistant helps healthcare professionals make better decisions faster.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
            <div>
              <div className="space-y-4">
                {[
                  "Symptom Analysis & Diagnosis Assistance",
                  "Drug Interaction Checker", 
                  "Medical Image Analysis",
                  "Patient Risk Assessment",
                  "Predictive Analytics",
                  "Natural Language Processing"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span style={{ color: '#86efac', fontSize: '1.5rem' }}>✅</span>
                    <span className="text-white text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <span className="icon icon-brain mr-3"></span>
                AI Assistant Preview
              </h3>
              <div className="space-y-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                  <p className="text-sm font-medium">Patient: John Doe</p>
                  <p className="text-sm">Symptoms: Fever, headache, fatigue</p>
                </div>
                <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                  <p className="text-sm font-medium">AI Analysis:</p>
                  <p className="text-sm">Possible viral infection. Recommend blood test and symptom monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container text-center" style={{ maxWidth: '64rem' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of healthcare professionals who trust MediCare Pro for their daily operations.
          </p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="button button-primary"
            style={{ 
              background: 'linear-gradient(45deg, #2563eb, #16a34a)', 
              fontSize: '1.125rem', 
              padding: '1rem 3rem' 
            }}
          >
            <span className="icon icon-clock mr-2"></span>
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ background: '#111827', color: 'white' }}>
        <div className="container text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="icon icon-heart" style={{ color: '#ef4444', marginRight: '0.5rem' }}></span>
            <span className="text-xl font-bold">MediCare Pro</span>
          </div>
          <p style={{ color: '#9ca3af' }}>
            © 2024 MediCare Pro. All rights reserved. Built with ❤️ for healthcare professionals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;