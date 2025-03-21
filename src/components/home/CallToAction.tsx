
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-subtle z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center glass-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Ready to Transform Your Learning Experience?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Join thousands of students who are acing their exams with EduQuest's interactive learning platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/register">
              <Button size="lg" className="rounded-full h-12 px-8">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
                Contact Us
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            No credit card required. Start with a free account today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
