// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
// import axios from 'axios';

// interface Student {
//   gender: 'Male' | 'Female';
//   // other fields...
// }

// const COLORS = ['#0088FE', '#FF8042']; // Male: Blue, Female: Orange

// const GenderChart: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch students from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get('/api/students'); // replace with your API
//         setStudents(res.data.data); 
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Process data for charts
//   const genderCount = students.reduce(
//     (acc, student) => {
//       if (student.gender === 'Male') acc.Male += 1;
//       if (student.gender === 'Female') acc.Female += 1;
//       return acc;
//     },
//     { Male: 0, Female: 0 }
//   );

//   const pieData = [
//     { name: 'Male', value: genderCount.Male },
//     { name: 'Female', value: genderCount.Female },
//   ];

//   const barData = [
//     { gender: 'Male', count: genderCount.Male },
//     { gender: 'Female', count: genderCount.Female },
//   ];

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="flex flex-col md:flex-row justify-around items-center gap-8 p-4">
//       {/* Pie Chart */}
//       <div>
//         <h2 className="text-lg font-semibold text-center mb-2">Gender Ratio</h2>
//         <PieChart width={300} height={300}>
//           <Pie
//             data={pieData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {pieData.map((entry, index) => (
//               <Cell key={entry.name} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>

//       {/* Bar Chart */}
//       <div>
//         <h2 className="text-lg font-semibold text-center mb-2">Gender Count</h2>
//         <BarChart
//           width={300}
//           height={300}
//           data={barData}
//           margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="gender" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#82ca9d" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default GenderChart;





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

const GenderCharts: React.FC<{ students?: Student[] }> = ({ students }) => {
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




// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// interface Student {
//   _id: string;
//   name: string;
//   gender: 'Male' | 'Female';
// }

// interface PieData {
//   name: string;
//   value: number;
// }

// const COLORS = ['#0088FE', '#FF8042'];

// const GenderCharts: React.FC<{ students?: Student[] }> = ({ students }) => {
//   const maleCount = (students || []).filter(s => s.gender === 'Male').length;
//   const femaleCount = (students || []).filter(s => s.gender === 'Female').length;

//   const pieData: PieData[] = [
//     { name: 'Male', value: maleCount },
//     { name: 'Female', value: femaleCount },
//   ];

//   return (
//     <PieChart width={300} height={300}>
//       <Pie
//         data={pieData as any}
//         dataKey="value"
//         nameKey="name"
//         cx="50%"
//         cy="50%"
//         outerRadius={100}
//         label
//       >
//         {pieData.map((_, index) => (
//           <Cell key={index} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

export default GenderCharts;

