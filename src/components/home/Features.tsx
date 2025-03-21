
import { 
  BookOpen, 
  Trophy, 
  Video, 
  BarChart, 
  Puzzle, 
  Download,
  Clock
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="glass-card p-6 hover-scale">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: 'Comprehensive Tests',
      description: 'Practice with 30+ questions per session or take full-length tests with 90+ questions to simulate exam conditions.'
    },
    {
      icon: <Trophy className="h-6 w-6 text-primary" />,
      title: 'Gamified Learning',
      description: 'Earn badges, climb leaderboards, and maintain streaks to make learning engaging and motivate consistent practice.'
    },
    {
      icon: <Video className="h-6 w-6 text-primary" />,
      title: 'Video Explanations',
      description: 'Watch embedded video tutorials related to challenging concepts for enhanced learning and clarification.'
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: 'Performance Tracking',
      description: 'Get detailed performance breakdowns and identify strengths and weaknesses through in-depth analytics.'
    },
    {
      icon: <Puzzle className="h-6 w-6 text-primary" />,
      title: 'Educational Games',
      description: 'Learn through interactive games including periodic table explorer, math puzzles, and reasoning challenges.'
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: 'Offline Access',
      description: 'Download quizzes as PDFs for offline practice and continue learning even without internet connectivity.'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'Adaptive Learning',
      description: 'Experience AI-powered adaptive difficulty that adjusts to your skill level for optimal learning progress.'
    }
  ];
  
  return (
    <section className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute top-40 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming How You Prepare</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            EduQuest combines cutting-edge educational techniques with gamification to create an engaging learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
              <Feature
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
