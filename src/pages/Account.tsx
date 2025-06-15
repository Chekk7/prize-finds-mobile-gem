
import { Crown, User, Camera, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import { useAuth } from '@/context/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your account</p>
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
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and subscription preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-brand-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <p className="text-gray-900">{user.username || 'Not set'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Account Type</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {user.isPremium ? (
                      <Badge className="bg-brand-gold-100 text-brand-gold-800">
                        <Crown className="w-4 h-4 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="mr-4">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" onClick={logout}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-brand-blue-600" />
                  <span>Usage Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-blue-600">{user.scansToday}</div>
                    <div className="text-sm text-gray-600">Scans Today</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-600">Total Scans</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-gold-600">5</div>
                    <div className="text-sm text-gray-600">Errors Found</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Section */}
          <div className="space-y-6">
            {user.isPremium ? (
              <Card className="bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5" />
                    <span>Premium Active</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-4">
                    You have access to all premium features including unlimited scans and advanced analysis.
                  </p>
                  <Button className="w-full bg-white text-brand-gold-600 hover:bg-gray-100">
                    Manage Subscription
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-brand-gold-200 bg-brand-gold-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-brand-gold-800">
                    <Crown className="w-5 h-5" />
                    <span>Upgrade to Premium</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-brand-gold-700 mb-4">
                    <div>✓ Unlimited daily scans</div>
                    <div>✓ Advanced error detection</div>
                    <div>✓ Detailed value estimates</div>
                    <div>✓ Premium guides & reports</div>
                    <div>✓ Priority support</div>
                  </div>
                  <Button className="w-full gradient-brand text-white">
                    Upgrade for $9.99/month
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Scan Limits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Scan Limit</CardTitle>
              </CardHeader>
              <CardContent>
                {user.isPremium ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">∞</div>
                    <div className="text-sm text-gray-600">Unlimited scans</div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Used today</span>
                      <span>{user.scansToday} / {user.maxDailyScans}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-blue-600 h-2 rounded-full" 
                        style={{width: `${(user.scansToday / user.maxDailyScans) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
};

export default Account;
