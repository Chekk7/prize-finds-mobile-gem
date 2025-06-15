
import { Camera, Crown, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import ScanUsageCard from '@/components/ScanUsageCard';
import RecentScansCard from '@/components/RecentScansCard';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 dark:from-background dark:to-accent/5">
        <Header />
        
        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Discover Hidden
                <span className="bg-gradient-to-r from-brand-blue-600 to-brand-gold-500 bg-clip-text text-transparent">
                  {" "}Treasures
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-brand-blue-600" />
                  </div>
                  <CardTitle>AI-Powered Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Upload photos and get instant analysis of potential errors with confidence ratings
                  </p>
                </CardContent>
              </Card>

              <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-brand-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-brand-gold-600" />
                  </div>
                  <CardTitle>Value Estimation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Get estimated market values based on current collector demand and rarity
                  </p>
                </CardContent>
              </Card>

              <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Expert Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Learn from comprehensive guides on grading, authentication, and error types
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 dark:from-background dark:to-accent/5 pb-20 md:pb-8">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username || user.email}!
          </h1>
          <p className="text-gray-600">
            Ready to discover valuable errors in your collection?
          </p>
        </div>

        {/* Quick Action Section */}
        <div className="mb-8">
          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Your Next Scan
                  </h2>
                  <p className="text-gray-600">
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

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <RecentScansCard />
            
            {/* Premium Upgrade Card for Free Users */}
            {!user.isPremium && (
              <Card className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 text-white border-0 shadow-lg">
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
                  <Button 
                    className="w-full bg-white text-brand-gold-600 hover:bg-gray-100"
                    size="lg"
                  >
                    Upgrade Now - $9.99/month
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
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
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-brand-blue-600" />
                  <span>Error Detection Guides</span>
                </Link>
                <Link 
                  to="/account" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Crown className="w-5 h-5 text-brand-gold-600" />
                  <span>Account Settings</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
};

export default Index;
