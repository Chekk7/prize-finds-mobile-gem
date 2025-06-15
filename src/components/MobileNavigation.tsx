
import { Home, Camera, BookOpen, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/scan', icon: Camera, label: 'Scan' },
    { path: '/guides', icon: BookOpen, label: 'Guides' },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center p-2 touch-target transition-colors",
              location.pathname === path
                ? "text-brand-blue-600"
                : "text-gray-500 hover:text-brand-blue-600"
            )}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
