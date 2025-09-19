import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DoctorDashboard from '../hospital/DoctorDashboard';
import AppointmentModule from '../hospital/AppointmentModule';
import AIAssistant from '../hospital/AIAssistant';
import PatientModule from '../hospital/PatientModule';
import GlobalSearch from '../hospital/GlobalSearch';
import { useToast } from '@/hooks/use-toast';

const DoctorLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleSearchResultSelect = (moduleType: string) => {
    setActiveModule(moduleType);
  };

  const handleModuleChange = (moduleType: string) => {
    setActiveModule(moduleType);
    if (moduleType !== "dashboard") {
      toast({
        title: `${moduleType.charAt(0).toUpperCase() + moduleType.slice(1)} Module`,
        description: `You've switched to the ${moduleType} module`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediCare Pro - Doctor Portal</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.name} - {user?.specialization}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">5</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <GlobalSearch 
        isOpen={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
        onResultSelect={handleSearchResultSelect}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeModule} onValueChange={handleModuleChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">My Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="patients">My Patients</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DoctorDashboard />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentModule />
          </TabsContent>

          <TabsContent value="patients">
            <PatientModule />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorLayout;