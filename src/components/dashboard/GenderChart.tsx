import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// interface Student {
//   gender: 'Male' | 'Female';
// }

interface Student {
  _id: string;
  name: string;
  gender: 'Male' | 'Female';
}
interface PieData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#FF8042'];

// const fetchStudents = async (): Promise<Student[]> => {
//   const res = await axios.get('/student'); // Replace with your API
//   return res.data.data;
// };

const GenderChart: React.FC<{ students?: Student[] }> = ({ students }) => {
//   const { data: students = [], isLoading, refetch } = useQuery<Student[], Error>({
//   queryKey: ['students'],
//   queryFn: fetchStudents,
//   refetchInterval: 5000,
// });

// const maleCount = students.filter((s) => s.gender === 'Male').length;
// const femaleCount = students.filter((s) => s.gender === 'Female').length;

const maleCount = (students || []).filter(s => s.gender === 'Male').length;
const femaleCount = (students || []).filter(s => s.gender === 'Female').length;



  // Prepare chart data
  const pieData: PieData[] = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount },
  ];

  const barData = [
    { gender: 'Male', count: maleCount },
    { gender: 'Female', count: femaleCount },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-around items-center gap-8 p-4">
      {/* Pie Chart */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-2">Gender Ratio</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData as any}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-2">Gender Count</h2>
        <BarChart width={300} height={300} data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="gender" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default GenderChart;
