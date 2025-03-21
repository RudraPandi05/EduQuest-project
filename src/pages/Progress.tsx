
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Book, Brain, Calculator, Atom, Microscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Renamed the component to avoid naming conflict with the Progress UI component
const ProgressPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    toast.error('You must be logged in to view your progress');
    navigate('/login');
  }
  
  // Mock data for progress stats
  const subjectProgress = [
    { name: 'Physics', progress: 75, icon: <Atom className="h-5 w-5 text-blue-500" /> },
    { name: 'Chemistry', progress: 60, icon: <Calculator className="h-5 w-5 text-green-500" /> },
    { name: 'Math', progress: 82, icon: <Brain className="h-5 w-5 text-purple-500" /> },
    { name: 'Biology', progress: 45, icon: <Microscope className="h-5 w-5 text-orange-500" /> },
  ];
  
  const weeklyData = [
    { day: 'Mon', tests: 2, questions: 24, score: 75 },
    { day: 'Tue', tests: 3, questions: 32, score: 82 },
    { day: 'Wed', tests: 1, questions: 14, score: 65 },
    { day: 'Thu', tests: 4, questions: 48, score: 79 },
    { day: 'Fri', tests: 2, questions: 28, score: 88 },
    { day: 'Sat', tests: 3, questions: 36, score: 91 },
    { day: 'Sun', tests: 1, questions: 12, score: 76 },
  ];
  
  const topicData = [
    { name: 'Mechanics', value: 25 },
    { name: 'Thermodynamics', value: 15 },
    { name: 'Optics', value: 20 },
    { name: 'Electromagnetism', value: 30 },
    { name: 'Modern Physics', value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Progress Dashboard</h1>
            <p className="text-muted-foreground">
              Track your learning journey and see how far you've come.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {subjectProgress.map((subject, index) => (
            <Card key={index} className="glass-card hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{subject.name}</CardTitle>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {subject.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{subject.progress}%</div>
                {/* Fixed the type error by passing the value as a valid number */}
                <Progress value={subject.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={weeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" name="Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Topics Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Test Name</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Score</th>
                    <th className="text-left py-3 px-4">Time Spent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">Physics Practice Test</td>
                    <td className="py-3 px-4">2 days ago</td>
                    <td className="py-3 px-4">85%</td>
                    <td className="py-3 px-4">18m 45s</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">Chemistry Chapter 5</td>
                    <td className="py-3 px-4">3 days ago</td>
                    <td className="py-3 px-4">92%</td>
                    <td className="py-3 px-4">12m 30s</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">Math Integration Quiz</td>
                    <td className="py-3 px-4">5 days ago</td>
                    <td className="py-3 px-4">78%</td>
                    <td className="py-3 px-4">21m 12s</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="py-3 px-4">Biology Cell Structure</td>
                    <td className="py-3 px-4">1 week ago</td>
                    <td className="py-3 px-4">81%</td>
                    <td className="py-3 px-4">15m 36s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProgressPage;
