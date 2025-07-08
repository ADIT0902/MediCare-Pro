import React, { useState } from 'react';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm your AI medical assistant. I can help with symptom analysis, drug interactions, and medical consultations. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const analysisResults = [
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
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: chatHistory.length + 1,
      type: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString()
    };

    const botResponse: ChatMessage = {
      id: chatHistory.length + 2,
      type: "bot",
      message: "I've analyzed your query. Based on the symptoms described, I recommend conducting further diagnostic tests. This appears to be consistent with a viral infection, but we should rule out bacterial causes.",
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory([...chatHistory, userMessage, botResponse]);
    setMessage("");
    alert("AI is analyzing your query...");
  };

  const handleQuickAnalysis = (type: string) => {
    alert(`Starting ${type.toLowerCase()} analysis...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Medical Assistant</h2>
          <p className="text-gray-600">Advanced AI-powered medical analysis and consultation</p>
        </div>
        <div className="badge" style={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', color: 'white' }}>
          <span className="icon icon-brain mr-2"></span>
          AI Powered
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Quick Analysis Tools */}
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center">
            <span className="icon icon-stethoscope mr-2"></span>
            Quick Analysis
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <button 
              className="button button-secondary w-full justify-start"
              onClick={() => handleQuickAnalysis("Symptom")}
            >
              <span className="icon icon-activity mr-2"></span>
              Symptom Analysis
            </button>
            <button 
              className="button button-secondary w-full justify-start"
              onClick={() => handleQuickAnalysis("Drug Interaction")}
            >
              <span className="icon icon-file mr-2"></span>
              Drug Interaction
            </button>
            <button 
              className="button button-secondary w-full justify-start"
              onClick={() => handleQuickAnalysis("Risk Assessment")}
            >
              <span className="icon icon-brain mr-2"></span>
              Risk Assessment
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
          <h3 className="font-semibold mb-2 flex items-center">
            <span className="icon icon-brain mr-2"></span>
            AI Consultation Chat
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Describe symptoms, ask medical questions, or request analysis
          </p>
          
          {/* Chat History */}
          <div 
            className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded"
            style={{ maxHeight: '400px' }}
          >
            {chatHistory.map((chat) => (
              <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div 
                    className="flex items-center justify-center"
                    style={{ 
                      width: '2rem', 
                      height: '2rem', 
                      borderRadius: '50%',
                      background: chat.type === 'user' ? '#3b82f6' : '#8b5cf6'
                    }}
                  >
                    <span className={`icon ${chat.type === 'user' ? 'icon-user' : 'icon-brain'}`} style={{ color: 'white' }}></span>
                  </div>
                  <div className={`p-3 rounded ${
                    chat.type === 'user' ? 'bg-blue-100' : 'bg-white border'
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
            <textarea
              placeholder="Describe symptoms, ask medical questions, or request analysis..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea flex-1"
              rows={2}
            />
            <button onClick={handleSendMessage} className="button button-primary">
              Send
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="card">
          <h3 className="font-semibold mb-4">AI Analysis Results</h3>
          <p className="text-sm text-gray-600 mb-6">Latest medical analysis and recommendations</p>
          <div className="grid grid-cols-1 gap-6">
            {analysisResults.map((result, index) => (
              <div key={index} className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <h4 className="font-semibold mb-2">{result.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{result.result}</p>
                <p className="text-sm font-medium mb-3">{result.suggestion}</p>
                <div className="flex justify-between items-center">
                  <span className="badge badge-primary">Confidence: {result.confidence}</span>
                  <button className="button button-secondary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;