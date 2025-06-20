
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, User, Stethoscope, Calendar, Brain } from "lucide-react";

interface GlobalSearchProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onResultSelect: (moduleType: string) => void;
}

const GlobalSearch = ({ isOpen, onOpenChange, onResultSelect }: GlobalSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = [
    {
      type: "patient",
      title: "John Doe",
      description: "Patient ID: P001 - Hypertension",
      module: "patients"
    },
    {
      type: "doctor",
      title: "Dr. Sarah Smith",
      description: "Cardiology - Available",
      module: "doctors"
    },
    {
      type: "appointment",
      title: "Appointment A001",
      description: "John Doe with Dr. Smith - Today 9:00 AM",
      module: "appointments"
    },
    {
      type: "ai",
      title: "AI Analysis",
      description: "Symptom analysis for respiratory symptoms",
      module: "ai-assistant"
    }
  ].filter(result => 
    searchTerm === "" || 
    result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "patient": return <User className="h-4 w-4" />;
      case "doctor": return <Stethoscope className="h-4 w-4" />;
      case "appointment": return <Calendar className="h-4 w-4" />;
      case "ai": return <Brain className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "patient": return "bg-blue-100 text-blue-800";
      case "doctor": return "bg-green-100 text-green-800";
      case "appointment": return "bg-purple-100 text-purple-800";
      case "ai": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleResultClick = (result: any) => {
    onResultSelect(result.module);
    onOpenChange(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Global Search</DialogTitle>
          <DialogDescription>
            Search across patients, doctors, appointments, and AI analyses
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for patients, doctors, appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`p-2 rounded-full ${getTypeColor(result.type)}`}>
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{result.title}</p>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {result.type}
                    </Badge>
                  </div>
                </Button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? "No results found" : "Start typing to search..."}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
