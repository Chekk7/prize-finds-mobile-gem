
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import QuickActionCard from '@/components/QuickActionCard';
import PremiumUpgradeCard from '@/components/PremiumUpgradeCard';
import DashboardSidebar from '@/components/DashboardSidebar';
import RecentScansCard from '@/components/RecentScansCard';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <HeroSection />
          <FeatureCards />
        </main>

        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.username || user.email}!
          </h1>
          <p className="text-muted-foreground">
            Ready to discover valuable errors in your collection?
          </p>
        </div>

        <QuickActionCard />

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <RecentScansCard />
            <PremiumUpgradeCard />
          </div>

          {/* Right Column - Sidebar */}
          <DashboardSidebar />
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
};

export default Index;
