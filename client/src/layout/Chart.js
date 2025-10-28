import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data }) => {
  return (
    <BarChart
      width={550}  
      height={300}
      data={data}
      margin={{
        top: 5, left: 5, bottom: 30, 
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="month" 
        angle={0} 
        textAnchor="end" 
        height={60} 
        tick={{ fontSize: 12 }} 
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalAmount" name="รายได้รวม" fill="#8884d8" barSize={15} />
    </BarChart>
  );
};

export default Chart;
