import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => {
  const colorClasses = {
    cyan: 'from-accent-cyan/20 to-accent-cyan/5 border-accent-cyan/30 text-accent-cyan',
    violet: 'from-accent-violet/20 to-accent-violet/5 border-accent-violet/30 text-accent-violet',
    neon: 'from-accent-neon/20 to-accent-neon/5 border-accent-neon/30 text-accent-neon',
    purple: 'from-accent-purple/20 to-accent-purple/5 border-accent-purple/30 text-accent-purple',
  };

  return (
    <motion.div
      className={`relative overflow-hidden bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
            <Icon size={24} className="text-white" />
          </div>
          {trend && (
            <span className={`text-sm font-semibold ${colorClasses[color].split(' ')[2]}`}>
              {trend}
            </span>
          )}
        </div>
        
        <div>
          <h3 className="text-gray-300 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-white">{value}</p>
            {subtitle && (
              <span className="text-gray-400 text-sm ml-2">{subtitle}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${colorClasses[color].split(' ')[2]} rounded-full opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StatCard;
