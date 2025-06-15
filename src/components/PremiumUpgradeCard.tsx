
import { Crown, Zap, BookOpen, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const PremiumUpgradeCard = () => {
  const { user } = useAuth();

  if (!user || user.isPremium) return null;

  return (
    <Card className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-6 h-6" />
          <span>Upgrade to Premium</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Unlimited daily scans</span>
          </div>
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Advanced error detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Premium guides & reports</span>
          </div>
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Detailed value analysis</span>
          </div>
        </div>
        <Link to="/account">
          <Button 
            className="w-full bg-white text-amber-600 hover:bg-gray-100"
            size="lg"
          >
            Upgrade Now - $9.99/month
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PremiumUpgradeCard;
