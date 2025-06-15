
import { Camera, Crown, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16">
      <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-brand-blue-100 dark:bg-brand-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-brand-blue-600" />
          </div>
          <CardTitle>AI-Powered Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Upload photos and get instant analysis of potential errors with confidence ratings
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-brand-gold-100 dark:bg-brand-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-brand-gold-600" />
          </div>
          <CardTitle>Value Estimation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Get estimated market values based on current collector demand and rarity
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle>Expert Guides</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Learn from comprehensive guides on grading, authentication, and error types
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureCards;
