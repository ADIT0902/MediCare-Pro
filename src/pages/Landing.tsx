
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Calendar, 
  Activity, 
  Brain, 
  Shield, 
  Clock, 
  FileText,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Hospital,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records, medical history, and treatment tracking"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered appointment scheduling with automated reminders"
    },
    {
      icon: Brain,
      title: "AI Diagnostics",
      description: "Advanced symptom analysis and preliminary diagnosis suggestions"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Live patient status updates and emergency alert system"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA-compliant data handling with enterprise-grade security"
    },
    {
      icon: FileText,
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

  const aiFeatures = [
    "Symptom Analysis & Diagnosis Assistance",
    "Drug Interaction Checker",
    "Medical Image Analysis",
    "Patient Risk Assessment",
    "Predictive Analytics",
    "Natural Language Processing"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MediCare Pro
              </h1>
            </div>
            <Button onClick={() => navigate("/dashboard")} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            AI-Powered Healthcare Management
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Revolutionary
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block">
              Hospital Management
            </span>
            System
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your healthcare operations with our cutting-edge AI-powered platform. 
            Manage patients, schedules, and medical records with unprecedented efficiency and accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3"
            >
              <Hospital className="mr-2 h-5 w-5" />
              Start Managing Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-2 hover:bg-gray-50"
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Healthcare
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform includes all the tools modern healthcare facilities need to operate efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Our AI assistant helps healthcare professionals make better decisions faster.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0" />
                    <span className="text-white text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="mr-3 h-6 w-6" />
                  AI Assistant Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium">Patient: John Doe</p>
                    <p className="text-sm">Symptoms: Fever, headache, fatigue</p>
                  </div>
                  <div className="bg-green-400/20 p-3 rounded-lg">
                    <p className="text-sm font-medium">AI Analysis:</p>
                    <p className="text-sm">Possible viral infection. Recommend blood test and symptom monitoring.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of healthcare professionals who trust MediCare Pro for their daily operations.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-12 py-4"
          >
            <Clock className="mr-2 h-5 w-5" />
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-xl font-bold">MediCare Pro</span>
          </div>
          <p className="text-gray-400">
            © 2024 MediCare Pro. All rights reserved. Built with ❤️ for healthcare professionals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
