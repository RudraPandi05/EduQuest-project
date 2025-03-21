
import { Link } from 'react-router-dom';
import { 
  Heart,
  Facebook, 
  Twitter, 
  Instagram 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              EduQuest
            </Link>
            <p className="text-muted-foreground">
              Making learning engaging and effective through gamification and interactive experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice" className="text-muted-foreground hover:text-primary transition-colors">
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link to="/full-length" className="text-muted-foreground hover:text-primary transition-colors">
                  Full-Length Tests
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-muted-foreground hover:text-primary transition-colors">
                  Educational Games
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-muted-foreground hover:text-primary transition-colors">
                  Video Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} EduQuest. All rights reserved. Made with <Heart size={16} className="text-red-500" /> for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
