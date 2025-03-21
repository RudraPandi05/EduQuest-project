
import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "EduQuest completely transformed my JEE preparation. The gamification elements kept me motivated, and the detailed explanations helped me understand complex concepts.",
    name: "Priya Sharma",
    title: "JEE Advanced Qualifier",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5
  },
  {
    id: 2,
    quote: "The adaptive difficulty system is brilliant! It challenged me just enough to improve without becoming discouraged. I've seen significant progress in my test scores.",
    name: "Arjun Patel",
    title: "Engineering Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 5
  },
  {
    id: 3,
    quote: "The video explanations for incorrect answers were a game-changer. Being able to immediately understand where I went wrong helped solidify my understanding.",
    name: "Rahul Verma",
    title: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    rating: 4
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-200/30 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of students who've transformed their test preparation with EduQuest.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:flex-1">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                
                <div>
                  <p className="font-semibold">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {testimonials.map((_, index) => (
              <Button 
                key={index} 
                size="icon"
                variant={index === activeIndex ? "default" : "outline"}
                className="rounded-full w-3 h-3 p-0"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            
            <Button 
              size="icon" 
              variant="outline" 
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
