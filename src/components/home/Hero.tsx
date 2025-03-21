
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Award, 
  Zap,
  ArrowRight 
} from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse-subtle"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl opacity-70 animate-pulse-subtle"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter animate-fade-in">
              Learn, Play, Excel with{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                EduQuest
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Master JEE and aptitude tests through interactive quizzes, games, and personalized learning experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/register">
                <Button size="lg" className="rounded-full h-12 px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/practice">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
                  Try a Practice Test
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Comprehensive Tests
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Earn Badges & Ranks
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Track Progress
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 glass-card p-6 animate-scale-in animate-float">
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/80 to-blue-600/80 shadow-xl">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm p-4 flex flex-col">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-grow flex flex-col space-y-4">
                  <div className="bg-white/20 rounded p-2 text-white text-sm">
                    Question 1: A body is thrown vertically upward with velocity u, the height reached by the body after time t is...
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-white text-sm">
                    <div className="bg-white/10 rounded p-2 hover:bg-white/20 transition cursor-pointer">
                      A. u·t - g·t²/2
                    </div>
                    <div className="bg-white/10 rounded p-2 hover:bg-white/20 transition cursor-pointer">
                      B. u·t + g·t²/2
                    </div>
                    <div className="bg-white/10 rounded p-2 hover:bg-white/20 transition cursor-pointer">
                      C. u·t - g·t
                    </div>
                    <div className="bg-primary/30 rounded p-2 border border-white/30">
                      D. u·t
                    </div>
                  </div>
                  <div className="mt-auto flex justify-between">
                    <div className="text-xs text-white/80">Time remaining: 00:45</div>
                    <div className="text-xs text-white/80">Question 1/30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
