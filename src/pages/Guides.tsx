
import { BookOpen, DollarSign, Search, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import { useToast } from '@/hooks/use-toast';
import { useScannedImages } from '@/context/ScannedImagesContext';

const Guides = () => {
  const { toast } = useToast();
  const { getImageForGuide } = useScannedImages();

  const guides = [
    {
      id: 1,
      title: "Common Coin Errors",
      description: "Learn to identify the most valuable coin minting errors",
      category: "Coins",
      difficulty: "Beginner",
      estimatedValue: "$10-500",
      defaultImage: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=300&h=200&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Double Die Detection",
      description: "Master the art of spotting valuable double die errors",
      category: "Coins",
      difficulty: "Intermediate",
      estimatedValue: "$50-2000",
      defaultImage: "https://images.unsplash.com/photo-1589992693383-c4d57e938168?w=300&h=200&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Currency Misalignment Errors",
      description: "Identify valuable printing errors on paper money",
      category: "Currency",
      difficulty: "Beginner",
      estimatedValue: "$25-300",
      defaultImage: "https://images.unsplash.com/photo-1614028674026-a65e814c1334?w=300&h=200&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Serial Number Anomalies",
      description: "Find rare serial number errors worth collecting",
      category: "Currency",
      difficulty: "Advanced",
      estimatedValue: "$100-5000",
      defaultImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&h=200&fit=crop&q=80"
    },
    {
      id: 5,
      title: "Off-Center Strikes",
      description: "Understand the value of off-center striking errors",
      category: "Coins",
      difficulty: "Intermediate",
      estimatedValue: "$15-800",
      defaultImage: "https://images.unsplash.com/photo-1544378730-6edb7b5a1cd3?w=300&h=200&fit=crop&q=80"
    },
    {
      id: 6,
      title: "Ink Smear Varieties",
      description: "Spot valuable ink smear errors on bills",
      category: "Currency",
      difficulty: "Beginner",
      estimatedValue: "$20-150",
      defaultImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&q=80"
    }
  ];

  const handleGuideClick = (guide: any) => {
    toast({
      title: `Opening ${guide.title}`,
      description: "Guide content will be available soon. This feature is coming in the next update!",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    return category === 'Coins' 
      ? 'bg-brand-blue-100 text-brand-blue-800 hover:bg-brand-blue-200'
      : 'bg-brand-gold-100 text-brand-gold-800 hover:bg-brand-gold-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20 md:pb-8">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Error Detection Guides
          </h1>
          <p className="text-gray-600">
            Learn to identify valuable errors and maximize your collection's worth
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <Card className="gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Search className="w-5 h-5" />
                  <span>Search coming soon - Browse our curated guides below</span>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">All Categories</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">All Levels</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const scannedImage = getImageForGuide(guide.id);
            const imageToUse = scannedImage ? scannedImage.url : guide.defaultImage;
            const isScannedImage = !!scannedImage;

            return (
              <Card 
                key={guide.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105"
                onClick={() => handleGuideClick(guide)}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  <img 
                    src={imageToUse} 
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                  {isScannedImage && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">Your Scan</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(guide.category)}>
                      {guide.category}
                    </Badge>
                    <Badge className={getDifficultyColor(guide.difficulty)}>
                      {guide.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign size={16} />
                      <span className="text-sm font-medium">{guide.estimatedValue}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-brand-blue-600 group-hover:text-brand-blue-700">
                      <BookOpen size={16} />
                      <span className="text-sm">Read Guide</span>
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-brand-blue-50 to-brand-gold-50 border-0">
            <CardContent className="p-8">
              <BookOpen className="w-16 h-16 text-brand-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">More Guides Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                We're continuously adding new guides to help you become an expert error detector
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                <div>• Advanced grading techniques</div>
                <div>• Authentication methods</div>
                <div>• Market value analysis</div>
                <div>• Rare error varieties</div>
              </div>
              <Button 
                variant="outline" 
                className="hover:bg-brand-blue-50"
                onClick={() => toast({
                  title: "Coming Soon!",
                  description: "We'll notify you when new guides are available."
                })}
              >
                Get Notified
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
};

export default Guides;
