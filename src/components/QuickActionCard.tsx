
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const QuickActionCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mb-8">
      <Card className="gradient-card border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Start Your Next Scan
              </h2>
              <p className="text-muted-foreground">
                Upload a photo of your coin or currency to detect valuable errors
              </p>
            </div>
            <Link to="/scan">
              <Button 
                size="lg" 
                className="gradient-brand text-white w-full md:w-auto"
                disabled={!user.isPremium && user.scansToday >= user.maxDailyScans}
              >
                <Camera className="w-5 h-5 mr-2" />
                Scan Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionCard;
