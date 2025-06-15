
import { useState } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import { useAuth } from '@/context/AuthContext';
import { useScannedImages } from '@/context/ScannedImagesContext';
import { useToast } from '@/hooks/use-toast';

const Scan = () => {
  const { user } = useAuth();
  const { addScannedImage } = useScannedImages();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const canScan = user && (user.isPremium || user.scansToday < user.maxDailyScans);

  // Mock error detection results
  const mockErrorTypes = [
    { type: "Common Coin Error", guideId: 1 },
    { type: "Double Die Error", guideId: 2 },
    { type: "Currency Misalignment", guideId: 3 },
    { type: "Serial Number Anomaly", guideId: 4 },
    { type: "Off-Center Strike", guideId: 5 },
    { type: "Ink Smear", guideId: 6 }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleScan = async () => {
    if (!selectedFile || !canScan) return;

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      // Mock error detection - randomly select an error type
      const randomError = mockErrorTypes[Math.floor(Math.random() * mockErrorTypes.length)];
      
      // Save the scanned image with the detected error
      addScannedImage(selectedFile, randomError.type, randomError.guideId);
      
      setIsScanning(false);
      setSelectedFile(null);
      
      toast({
        title: "Scan Complete!",
        description: `Detected: ${randomError.type}. Check the Guides page to see your image!`,
      });
      
      console.log('Scan completed - Error detected:', randomError.type);
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in required</h1>
          <p className="text-gray-600 mb-6">Please sign in to start scanning your items</p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20 md:pb-8">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Scan Your Item
          </h1>
          <p className="text-gray-600">
            Upload a clear photo of your coin or currency to detect valuable errors
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-brand-blue-600" />
                <span>Upload Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!canScan && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle size={20} />
                    <span className="font-medium">Daily limit reached</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    You've used all {user?.maxDailyScans} daily scans. Upgrade to Premium for unlimited scans.
                  </p>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                  disabled={!canScan}
                />
                <label htmlFor="image-upload" className={`cursor-pointer ${!canScan ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Choose a photo to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG files up to 10MB
                  </p>
                </label>
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">File selected: {selectedFile.name}</p>
                    <p className="text-sm text-green-600">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  
                  <Button
                    onClick={handleScan}
                    disabled={isScanning || !canScan}
                    className="w-full gradient-brand text-white"
                    size="lg"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5 mr-2" />
                        Start Scan
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card>
            <CardHeader>
              <CardTitle>Scanning Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Good Lighting</h4>
                    <p className="text-sm text-gray-600">Use natural light or bright indoor lighting for best results</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Clear Focus</h4>
                    <p className="text-sm text-gray-600">Ensure the item is in sharp focus with minimal blur</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Fill the Frame</h4>
                    <p className="text-sm text-gray-600">Make sure the coin or bill fills most of the image</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Avoid Shadows</h4>
                    <p className="text-sm text-gray-600">Position lighting to minimize shadows on the item</p>
                  </div>
                </div>
              </div>

              {user && !user.isPremium && (
                <div className="mt-6 p-4 bg-brand-gold-50 border border-brand-gold-200 rounded-lg">
                  <h4 className="font-medium text-brand-gold-800 mb-2">Premium Features</h4>
                  <ul className="text-sm text-brand-gold-700 space-y-1">
                    <li>• Unlimited daily scans</li>
                    <li>• Advanced error detection</li>
                    <li>• Detailed value estimates</li>
                    <li>• Downloadable reports</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
};

export default Scan;
