import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';
import RegionalMap from './charts/RegionalMap';
import { TrendingUp, Users, Music, Globe } from 'lucide-react';

// Mock data for demonstration
const mockData = {
  stats: {
    totalStreams: '2.4B',
    activeListeners: '180M',
    trendingArtists: '15.2K',
    globalReach: '195',
  },
  streamingGrowth: [
    { month: 'Jan', streams: 1200, listeners: 800 },
    { month: 'Feb', streams: 1350, listeners: 920 },
    { month: 'Mar', streams: 1800, listeners: 1100 },
    { month: 'Apr', streams: 2200, listeners: 1300 },
    { month: 'May', streams: 2600, listeners: 1500 },
    { month: 'Jun', streams: 2400, listeners: 1400 },
  ],
  topGenres: [
    { name: 'Bollywood', streams: 850, color: '#00D4FF' },
    { name: 'Hip Hop', streams: 720, color: '#8B5CF6' },
    { name: 'Pop', streams: 680, color: '#00FF88' },
    { name: 'Regional', streams: 550, color: '#A855F7' },
    { name: 'Classical', streams: 420, color: '#F59E0B' },
    { name: 'Electronic', streams: 380, color: '#EF4444' },
    { name: 'Rock', streams: 320, color: '#10B981' },
    { name: 'Jazz', streams: 280, color: '#F97316' },
  ],
  platformShare: [
    { name: 'JioSaavn', value: 35, color: '#00D4FF' },
    { name: 'Spotify', value: 28, color: '#1DB954' },
    { name: 'YouTube Music', value: 22, color: '#FF0000' },
    { name: 'Apple Music', value: 15, color: '#FC3C44' },
  ],
};

const Dashboard = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <StatCard
                title="Total Streams"
                value={mockData.stats.totalStreams}
                icon={TrendingUp}
                color="cyan"
                trend="+12.5%"
              />
              <StatCard
                title="Active Listeners"
                value={mockData.stats.activeListeners}
                icon={Users}
                color="violet"
                trend="+8.2%"
              />
              <StatCard
                title="Trending Artists"
                value={mockData.stats.trendingArtists}
                icon={Music}
                color="neon"
                trend="+15.7%"
              />
              <StatCard
                title="Global Reach"
                value={mockData.stats.globalReach}
                icon={Globe}
                color="purple"
                trend="+2"
                subtitle="countries"
              />
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <LineChart data={mockData.streamingGrowth} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DonutChart data={mockData.platformShare} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <BarChart data={mockData.topGenres} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <RegionalMap />
              </motion.div>
            </div>
          </div>
        );
      
      default:
        return (
          <motion.div
            className="flex items-center justify-center h-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-accent-cyan mb-4">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
              </h3>
              <p className="text-gray-400">Content for this section is coming soon...</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default Dashboard;
