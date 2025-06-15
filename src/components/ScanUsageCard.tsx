
import { Crown, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';

const ScanUsageCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const usagePercentage = (user.scansToday / user.maxDailyScans) * 100;
  const canScan = user.scansToday < user.maxDailyScans || user.isPremium;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-primary" />
            <span>Daily Scans</span>
          </div>
          {user.isPremium && (
            <div className="flex items-center space-x-1 text-accent">
              <Crown size={16} />
              <span className="text-sm font-medium">Unlimited</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user.isPremium ? (
          <>
            <div className="flex justify-between text-sm">
              <span>Today's usage</span>
              <span>{user.scansToday} / {user.maxDailyScans}</span>
            </div>
            <Progress value={usagePercentage} className="w-full" />
            {!canScan && (
              <div className="text-center text-sm text-destructive">
                Daily limit reached. Upgrade for unlimited scans!
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              You have unlimited scans with Premium
            </p>
            <p className="text-lg font-semibold text-accent">
              {user.scansToday} scans today
            </p>
          </div>
        )}
        
        {!user.isPremium && (
          <Link to="/account">
            <Button className="w-full gradient-brand text-white" size="sm">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default ScanUsageCard;
