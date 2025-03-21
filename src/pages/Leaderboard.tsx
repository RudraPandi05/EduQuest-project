
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Trophy, Medal, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LeaderboardUser {
  id: number;
  name: string;
  score: number;
  position: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardUser[]>([]);
  const [monthlyLeaders, setMonthlyLeaders] = useState<LeaderboardUser[]>([]);
  const [allTimeLeaders, setAllTimeLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for the leaderboard
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: "Alex Thompson", score: 1250, position: 1 },
        { id: 2, name: "Jamie Rivera", score: 1150, position: 2 },
        { id: 3, name: "Morgan Lee", score: 1050, position: 3 },
        { id: 4, name: "Taylor Kim", score: 980, position: 4 },
        { id: 5, name: "Jordan Chen", score: 920, position: 5 },
        { id: 6, name: "Casey Wilson", score: 870, position: 6 },
        { id: 7, name: "Riley Garcia", score: 820, position: 7 },
        { id: 8, name: "Drew Martin", score: 780, position: 8 },
        { id: 9, name: "Quinn Patel", score: 730, position: 9 },
        { id: 10, name: "Avery Johnson", score: 690, position: 10 },
      ];

      // Get current user
      const userData = localStorage.getItem('user');
      let currentUser;
      if (userData) {
        try {
          currentUser = JSON.parse(userData);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }

      // Mark the current user
      const withCurrentUser = mockUsers.map(user => {
        if (currentUser && user.name.toLowerCase().includes(currentUser.email.split('@')[0].toLowerCase())) {
          return { ...user, isCurrentUser: true };
        }
        return user;
      });

      // Create different data for each tab
      setWeeklyLeaders(withCurrentUser.slice().sort(() => Math.random() - 0.5));
      setMonthlyLeaders(withCurrentUser.slice().sort(() => Math.random() - 0.5));
      setAllTimeLeaders(withCurrentUser);
      
      setLoading(false);
    }, 1000);
  }, []);

  const renderLeaderItem = (user: LeaderboardUser, index: number) => {
    const getPositionIcon = (position: number) => {
      switch (position) {
        case 1:
          return <Crown className="h-5 w-5 text-yellow-500" />;
        case 2:
          return <Medal className="h-5 w-5 text-zinc-400" />;
        case 3:
          return <Medal className="h-5 w-5 text-amber-700" />;
        default:
          return <span className="text-sm text-muted-foreground w-5">{position}</span>;
      }
    };

    return (
      <div 
        key={user.id} 
        className={`flex items-center justify-between p-4 rounded-lg mb-2 transition-colors ${
          user.isCurrentUser 
            ? 'bg-primary/10 border border-primary/20' 
            : index % 2 === 0 
              ? 'bg-muted/30' 
              : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8">
            {getPositionIcon(user.position)}
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm sm:text-base">{user.name}</p>
            {user.isCurrentUser && (
              <p className="text-xs text-primary">You</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <span className="font-bold">{user.score}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">points</span>
        </div>
      </div>
    );
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          EduQuest Leaderboard
        </h1>
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weekly">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="weekly">This Week</TabsTrigger>
                  <TabsTrigger value="monthly">This Month</TabsTrigger>
                  <TabsTrigger value="alltime">All Time</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly" className="animate-fade-in">
                  <div className="space-y-1">
                    {weeklyLeaders.map((user, i) => renderLeaderItem(user, i))}
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="animate-fade-in">
                  <div className="space-y-1">
                    {monthlyLeaders.map((user, i) => renderLeaderItem(user, i))}
                  </div>
                </TabsContent>
                
                <TabsContent value="alltime" className="animate-fade-in">
                  <div className="space-y-1">
                    {allTimeLeaders.map((user, i) => renderLeaderItem(user, i))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
