
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import ThemeControls from '@/components/ThemeControls';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/scan', label: 'Scan' },
    { path: '/guides', label: 'Guides' },
    { path: '/account', label: 'Account' },
  ];

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-blue-600 to-brand-gold-500 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Prize Finds</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions - Theme Controls + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeControls />
            {user ? (
              <div className="flex items-center space-x-4">
                {user.isPremium && (
                  <div className="flex items-center space-x-1 text-brand-gold-600">
                    <Crown size={16} />
                    <span className="text-sm font-medium">Premium</span>
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  Hi, {user.username || user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeControls />
            <button
              className="touch-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              
              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Hi, {user.username || user.email}
                      </span>
                      {user.isPremium && (
                        <div className="flex items-center space-x-1 text-brand-gold-600">
                          <Crown size={16} />
                          <span className="text-sm font-medium">Premium</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
