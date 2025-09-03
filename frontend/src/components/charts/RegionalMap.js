import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Users } from 'lucide-react';

const RegionalMap = () => {
  const regions = [
    { name: 'North America', popularity: 85, listeners: '45M', growth: '+12%', color: 'accent-cyan' },
    { name: 'Europe', popularity: 78, listeners: '38M', growth: '+8%', color: 'accent-violet' },
    { name: 'Asia Pacific', popularity: 92, listeners: '67M', growth: '+18%', color: 'accent-neon' },
    { name: 'South America', popularity: 71, listeners: '22M', growth: '+15%', color: 'accent-purple' },
  ];

  return (
    <motion.div
      className="bg-surface/50 backdrop-blur-xl border border-accent-purple/20 rounded-2xl p-6 hover:border-accent-purple/40 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Regional Music Popularity</h3>
        <MapPin className="text-accent-purple" size={24} />
      </div>
      
      <div className="space-y-4">
        {regions.map((region, index) => (
          <motion.div
            key={region.name}
            className="p-4 bg-dark-100/30 rounded-xl hover:bg-dark-100/50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{region.name}</h4>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-accent-cyan">
                  <Users size={16} className="mr-1" />
                  <span>{region.listeners}</span>
                </div>
                <div className="flex items-center text-accent-neon">
                  <TrendingUp size={16} className="mr-1" />
                  <span>{region.growth}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-dark-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r from-${region.color} to-${region.color}/60`}
                  style={{ width: `${region.popularity}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${region.popularity}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-1 block">
                Popularity Score: {region.popularity}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 rounded-xl border border-accent-purple/20">
        <p className="text-sm text-gray-300 text-center">
          🌍 Global music trends analyzed across 195+ countries
        </p>
      </div>
    </motion.div>
  );
};

export default RegionalMap;
