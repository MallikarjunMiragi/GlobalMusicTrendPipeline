import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Globe,
  Music,
  TrendingUp,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'regional', label: 'Regional Trends', icon: Globe },
  { id: 'genres', label: 'Genre Popularity', icon: Music },
  { id: 'streaming', label: 'Streaming Analytics', icon: TrendingUp },
  { id: 'artists', label: 'Artist Insights', icon: Users },
  { id: 'predictions', label: 'Predictions', icon: Zap },
];

const Sidebar = ({ activeSection, setActiveSection, isCollapsed, setIsCollapsed }) => {
  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-surface border-r border-accent-cyan/20 z-20 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo and Toggle */}
      <div className="p-6 border-b border-accent-cyan/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.h2
              className="text-xl font-bold bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Music AI
            </motion.h2>
          )}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-dark-100 hover:bg-accent-cyan/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <motion.button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 shadow-lg shadow-accent-cyan/20'
                    : 'hover:bg-dark-100/50 hover:border-accent-cyan/20 border border-transparent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  size={20}
                  className={`${
                    isActive ? 'text-accent-cyan' : 'text-gray-400 group-hover:text-accent-cyan'
                  } transition-colors`}
                />
                {!isCollapsed && (
                  <span
                    className={`ml-3 font-medium ${
                      isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    } transition-colors`}
                  >
                    {item.label}
                  </span>
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute right-2 w-2 h-2 bg-accent-cyan rounded-full"
                    layoutId="activeIndicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </motion.button>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-dark-100 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-dark-100 rotate-45"></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent-cyan/5 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default Sidebar;
