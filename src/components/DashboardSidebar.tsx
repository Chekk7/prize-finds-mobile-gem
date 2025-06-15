
import { BookOpen, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
          <Link 
            to="/guides" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <BookOpen className="w-5 h-5 text-brand-blue-600" />
            <span>Error Detection Guides</span>
          </Link>
          <Link 
            to="/account" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Crown className="w-5 h-5 text-brand-gold-600" />
            <span>Account Settings</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSidebar;
