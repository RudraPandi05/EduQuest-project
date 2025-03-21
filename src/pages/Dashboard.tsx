
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import BadgeCard from '@/components/dashboard/BadgeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  ActivityIcon,
  BookOpen,
  Trophy,
  Clock,
  Award,
  Zap,
  Brain,
  Atom,
  BadgeCheck,
  Calculator,
  BookOpenCheck,
  Microscope,
  Lightbulb,
  Infinity,
  Puzzle
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);
  
  // Mock user data
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name || 'User'}! Track your progress and continue learning.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/practice">
              <Button className="flex items-center gap-2">
                <BookOpen size={16} />
                Start Practice
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Tests Completed"
            value={12}
            icon={<ActivityIcon size={18} />}
            change={{ value: 23, positive: true }}
          />
          <StatCard
            title="Total Points"
            value={834}
            icon={<Trophy size={18} />}
            change={{ value: 10, positive: true }}
          />
          <StatCard
            title="Study Streak"
            value="7 days"
            icon={<Zap size={18} />}
            description="Keep it going!"
          />
          <StatCard
            title="Avg. Time Per Question"
            value="1m 28s"
            icon={<Clock size={18} />}
            change={{ value: 12, positive: true }}
          />
        </div>
        
        {/* Study Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-1 glass-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Physics Practice Test</p>
                  <p className="text-xs text-muted-foreground">Completed yesterday • Score: 85%</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Atom size={20} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Chemistry Chapter 5 Test</p>
                  <p className="text-xs text-muted-foreground">Completed 3 days ago • Score: 92%</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calculator size={20} className="text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Math Integration Quiz</p>
                  <p className="text-xs text-muted-foreground">Completed 5 days ago • Score: 78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-2 glass-card">
            <CardHeader>
              <CardTitle>Study Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Lightbulb size={16} className="text-yellow-500" />
                    </div>
                    <h3 className="font-medium">Improve in Physics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're scoring lower in Newton's Laws. Review the concepts and try these practice tests.
                  </p>
                  <Link to="/practice">
                    <Button size="sm" variant="outline" className="w-full">
                      Practice Now
                    </Button>
                  </Link>
                </div>
                
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Infinity size={16} className="text-green-500" />
                    </div>
                    <h3 className="font-medium">Math Challenge</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Continue your calculus mastery with these advanced integration problems.
                  </p>
                  <Link to="/practice">
                    <Button size="sm" variant="outline" className="w-full">
                      Take Challenge
                    </Button>
                  </Link>
                </div>
                
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Atom size={16} className="text-blue-500" />
                    </div>
                    <h3 className="font-medium">Chemistry Review</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're doing great with Periodic Table. Try these organic chemistry questions next.
                  </p>
                  <Link to="/practice">
                    <Button size="sm" variant="outline" className="w-full">
                      Start Review
                    </Button>
                  </Link>
                </div>
                
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Puzzle size={16} className="text-purple-500" />
                    </div>
                    <h3 className="font-medium">Logic Games</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sharpen your reasoning skills with these logic puzzles and aptitude challenges.
                  </p>
                  <Link to="/games">
                    <Button size="sm" variant="outline" className="w-full">
                      Play Games
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges Section */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Your Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <BadgeCard
            title="Math Master"
            description="Score 90% or higher on 5 math tests"
            icon={<Calculator size={24} />}
            progress={100}
            unlocked={true}
          />
          <BadgeCard
            title="Physics Pro"
            description="Complete all physics practice tests"
            icon={<Atom size={24} />}
            progress={75}
            unlocked={false}
          />
          <BadgeCard
            title="Chemistry Whiz"
            description="Answer 50 chemistry questions correctly"
            icon={<Microscope size={24} />}
            progress={60}
            unlocked={false}
          />
          <BadgeCard
            title="Perfect Score"
            description="Get 100% on any full-length test"
            icon={<Award size={24} />}
            progress={100}
            unlocked={true}
          />
          <BadgeCard
            title="Quick Thinker"
            description="Average less than 45 seconds per question"
            icon={<Zap size={24} />}
            progress={30}
            unlocked={false}
          />
          <BadgeCard
            title="Study Streak"
            description="Practice for 7 days in a row"
            icon={<BadgeCheck size={24} />}
            progress={100}
            unlocked={true}
          />
          <BadgeCard
            title="Conceptual Genius"
            description="Watch 20 explanation videos"
            icon={<Lightbulb size={24} />}
            progress={25}
            unlocked={false}
          />
          <BadgeCard
            title="Well-Rounded"
            description="Complete tests in all subjects"
            icon={<BookOpenCheck size={24} />}
            progress={65}
            unlocked={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
