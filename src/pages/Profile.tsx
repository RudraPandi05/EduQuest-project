
import Layout from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, BookOpen, Trophy, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserProfile {
  email: string;
  name?: string;
  testsCompleted: number;
  points: number;
  badges: {name: string; icon: string; date: string}[];
  joinDate: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast.error('You must be logged in to view your profile');
      navigate('/login');
      return;
    }

    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        
        // For demo, create mock profile data
        setProfile({
          email: user.email,
          name: user.email.split('@')[0],
          testsCompleted: 12,
          points: 850,
          badges: [
            { name: 'Physics Master', icon: '🔭', date: '2024-03-15' },
            { name: 'Perfect Score', icon: '🏆', date: '2024-03-10' },
            { name: '5-Day Streak', icon: '🔥', date: '2024-03-08' }
          ],
          joinDate: '2024-03-01'
        });
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success('Successfully logged out');
    navigate('/login');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
            <p className="mb-6">There was an issue retrieving your profile.</p>
            <Button onClick={() => navigate('/login')}>Return to Login</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`} />
                  <AvatarFallback>
                    <User size={40} />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <Badge variant="outline" className="flex items-center gap-1 py-1">
                      <Trophy size={14} className="text-primary" />
                      {profile.points} Points
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 py-1">
                      <BookOpen size={14} className="text-primary" />
                      {profile.testsCompleted} Tests
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Settings size={18} />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={handleLogout}>
                    <LogOut size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="badges">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {profile.badges.map((badge, index) => (
                      <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="font-medium text-center">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Your test history will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Your performance statistics will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
