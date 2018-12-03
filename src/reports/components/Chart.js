import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';

export default function Chart({ title, data }) {
  return (
    <div className="bg-blue-lightest p-2 mb-2">
      <h3 className="font-normal pb-1 mb-2 border-b border-blue-dark">
        {title}
      </h3>
      <PieChart width={800} height={400}>
        <Legend />
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          outerRadius={120}
          startAngle={90}
          endAngle={450}
          minAngle={1}
          paddingAngle={1}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map(d => <Cell key={d.name} fill={d.color} />)}
        </Pie>
      </PieChart>
    </div>
  );
}
