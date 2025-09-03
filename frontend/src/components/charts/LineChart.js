import React from 'react';
import { motion } from 'framer-motion';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ data }) => {
  return (
    <motion.div
      className="bg-surface/50 backdrop-blur-xl border border-accent-cyan/20 rounded-2xl p-6 hover:border-accent-cyan/40 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Global Streaming Growth</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-cyan rounded-full mr-2"></div>
            <span className="text-gray-300">Streams (M)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-violet rounded-full mr-2"></div>
            <span className="text-gray-300">Listeners (M)</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1A1A24',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Line 
              type="monotone" 
              dataKey="streams" 
              stroke="#00D4FF" 
              strokeWidth={3}
              dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#00D4FF', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="listeners" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default LineChart;
