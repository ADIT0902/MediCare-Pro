
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, User, Bot, Stethoscope, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIAssistant = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm your AI medical assistant. I can help with symptom analysis, drug interactions, and medical consultations. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [analysisResults] = useState([
    {
      title: "Symptom Analysis",
      result: "Based on symptoms: fever, headache, fatigue",
      confidence: "85%",
      suggestion: "Possible viral infection. Recommend blood test."
    },
    {
      title: "Drug Interaction",
      result: "Checking: Aspirin + Warfarin",
      confidence: "95%",
      suggestion: "High risk interaction. Monitor INR levels closely."
    },
    {
      title: "Risk Assessment",
      result: "Patient: John Doe, Age: 65",
      confidence: "78%",
      suggestion: "Moderate risk for cardiovascular events."
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: chatHistory.length + 1,
      type: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString()
    };

    const botResponse = {
      id: chatHistory.length + 2,
      type: "bot",
      message: "I've analyzed your query. Based on the symptoms described, I recommend conducting further diagnostic tests. This appears to be consistent with a viral infection, but we should rule out bacterial causes.",
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory([...chatHistory, userMessage, botResponse]);
    setMessage("");

    toast({
      title: "Message Sent",
      description: "AI is analyzing your query...",
    });
  };

  const handleQuickAnalysis = (type: string) => {
    toast({
      title: `${type} Analysis`,
      description: `Starting ${type.toLowerCase()} analysis...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Medical Assistant</h2>
          <p className="text-gray-600">Advanced AI-powered medical analysis and consultation</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Brain className="h-4 w-4 mr-2" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Analysis Tools */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2" />
                Quick Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAnalysis("Symptom")}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Symptom Analysis
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAnalysis("Drug Interaction")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Drug Interaction
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAnalysis("Risk Assessment")}
              >
                <Brain className="h-4 w-4 mr-2" />
                Risk Assessment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.map((result, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">{result.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{result.result}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        {result.confidence}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Consultation Chat
              </CardTitle>
              <CardDescription>
                Describe symptoms, ask medical questions, or request analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%] ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        chat.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>
                        {chat.type === 'user' ? 
                          <User className="h-4 w-4 text-white" /> : 
                          <Bot className="h-4 w-4 text-white" />
                        }
                      </div>
                      <div className={`p-3 rounded-lg ${
                        chat.type === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-white border'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{chat.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Describe symptoms, ask medical questions, or request analysis..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <Button onClick={handleSendMessage} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analysis Results */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Results</CardTitle>
          <CardDescription>Latest medical analysis and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysisResults.map((result, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{result.result}</p>
                  <p className="text-sm font-medium mb-3">{result.suggestion}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Confidence: {result.confidence}</Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
