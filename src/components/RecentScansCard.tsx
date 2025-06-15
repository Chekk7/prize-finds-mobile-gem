
import { Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Scan {
  id: string;
  itemType: 'coin' | 'currency';
  errorType: string;
  estimatedValue: number;
  confidence: number;
  timestamp: Date;
  imageUrl: string;
}

const RecentScansCard = () => {
  // TODO: Replace with actual data from Skapi
  const dummyScans: Scan[] = [
    {
      id: '1',
      itemType: 'coin',
      errorType: 'Double Die Obverse',
      estimatedValue: 150,
      confidence: 92,
      timestamp: new Date('2024-01-15T10:30:00'),
      imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150'
    },
    {
      id: '2',
      itemType: 'currency',
      errorType: 'Misaligned Serial Numbers',
      estimatedValue: 75,
      confidence: 88,
      timestamp: new Date('2024-01-14T15:45:00'),
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150'
    },
    {
      id: '3',
      itemType: 'coin',
      errorType: 'Off-Center Strike',
      estimatedValue: 25,
      confidence: 78,
      timestamp: new Date('2024-01-13T09:15:00'),
      imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-brand-blue-600" />
          <span>Recent Scans</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {dummyScans.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No scans yet</p>
            <p className="text-sm text-gray-400">Start scanning to see your results here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dummyScans.map((scan) => (
              <div key={scan.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <img 
                  src={scan.imageUrl} 
                  alt={scan.errorType}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {scan.errorType}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {scan.itemType}
                    </Badge>
                    <Badge 
                      className={`text-xs ${getConfidenceColor(scan.confidence)}`}
                    >
                      {scan.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(scan.timestamp)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign size={16} />
                    <span>{scan.estimatedValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentScansCard;
