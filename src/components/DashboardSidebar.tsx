
import { BookOpen, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScanUsageCard from '@/components/ScanUsageCard';

const DashboardSidebar = () => {
  return (
    <div className="space-y-6">
      <ScanUsageCard />
      
      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link to="/guides">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 p-3 h-auto"
            >
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Error Detection Guides</span>
            </Button>
          </Link>
          <Link to="/account">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 p-3 h-auto"
            >
              <Crown className="w-5 h-5 text-accent" />
              <span>Account Settings</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSidebar;
