
import { Camera, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Discover Hidden
          <span className="bg-gradient-to-r from-brand-blue-600 to-brand-gold-500 bg-clip-text text-transparent">
            {" "}Treasures
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered detection for valuable errors on coins and paper money. 
          Turn your collection into profit with expert analysis.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/register">
          <Button size="lg" className="gradient-brand text-white px-8 py-3">
            <Camera className="w-5 h-5 mr-2" />
            Start Scanning Free
          </Button>
        </Link>
        <Link to="/guides">
          <Button variant="outline" size="lg" className="px-8 py-3">
            <BookOpen className="w-5 h-5 mr-2" />
            Learn About Errors
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
