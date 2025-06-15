
import { Moon, Sun, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeControls = () => {
  const { isDarkMode, isBlueFilterEnabled, toggleDarkMode, toggleBlueFilter } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {/* Blue Light Filter Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleBlueFilter}
        className={cn(
          "p-2 touch-target transition-colors",
          isBlueFilterEnabled 
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        )}
        title={isBlueFilterEnabled ? "Disable Blue Light Filter" : "Enable Blue Light Filter"}
      >
        {isBlueFilterEnabled ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>

      {/* Dark Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDarkMode}
        className={cn(
          "p-2 touch-target transition-colors",
          isDarkMode 
            ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" 
            : "text-gray-600 hover:text-yellow-500"
        )}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    </div>
  );
};

export default ThemeControls;
