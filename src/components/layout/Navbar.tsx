
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User, 
  LogIn,
  BookOpen,
  Trophy,
  BarChart
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect py-2 shadow-md' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent transition-all"
          >
            EduQuest
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link to="/practice" className="story-link text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <BookOpen size={18} /> Practice
              </Link>
              <Link to="/leaderboard" className="story-link text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Trophy size={18} /> Leaderboard
              </Link>
              <Link to="/progress" className="story-link text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <BarChart size={18} /> Progress
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
                    <User size={16} />
                    Profile
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
                      <LogIn size={16} />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="rounded-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-effect animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/practice" className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <BookOpen size={18} /> Practice
            </Link>
            <Link to="/leaderboard" className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Trophy size={18} /> Leaderboard
            </Link>
            <Link to="/progress" className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <BarChart size={18} /> Progress
            </Link>
            <div className="pt-2 border-t border-border flex flex-col space-y-2">
              {isAuthenticated ? (
                <Link to="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <User size={16} className="mr-2" />
                    Profile
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full justify-start">
                      <LogIn size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
