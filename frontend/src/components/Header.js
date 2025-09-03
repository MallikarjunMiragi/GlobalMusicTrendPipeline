import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, User } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.header
      className="bg-surface/80 backdrop-blur-xl border-b border-accent-cyan/20 p-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-neon bg-clip-text text-transparent">
            Global Music Trends Analysis
          </h1>
          <p className="text-gray-400 mt-1">Real-time insights from Indian music market</p>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search artists, songs, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-dark-100/50 border border-accent-cyan/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all duration-200 w-80"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {[Bell, Settings, User].map((Icon, index) => (
              <motion.button
                key={index}
                className="p-3 bg-dark-100/50 rounded-xl hover:bg-accent-cyan/20 transition-colors duration-200 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} className="text-gray-400 hover:text-accent-cyan transition-colors" />
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-neon rounded-full animate-pulse"></div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
