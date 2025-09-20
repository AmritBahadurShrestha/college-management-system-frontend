import { useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

interface Student {
  id: number;
  name: string;
  roll: string;
  status: 'Present' | 'Absent' | null;
}

const AttendanceDashboard = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Amrit Bahadur', roll: '101', status: null },
    { id: 2, name: 'Sita Sharma', roll: '102', status: null },
    { id: 3, name: 'Ram Thapa', roll: '103', status: null },
    { id: 4, name: 'Gita Rai', roll: '104', status: null },
  ]);

  const markAttendance = (id: number, status: 'Present' | 'Absent') => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const submitAttendance = () => {
    console.log('Attendance submitted:', students);
    alert('Attendance submitted successfully!');
  };

  const total = students.length;
  const present = students.filter(s => s.status === 'Present').length;
  const absent = students.filter(s => s.status === 'Absent').length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold">Attendance Dashboard</h1>
          <p className="mt-2 text-sm md:text-base">Mark attendance for <span className="font-medium">{date}</span></p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all">
            <h2 className="text-gray-500 font-medium">Total Students</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">{total}</p>
          </div>
          <div className="bg-green-100 shadow-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all">
            <h2 className="text-green-700 font-medium">Present</h2>
            <p className="text-3xl font-bold text-green-800 mt-2">{present}</p>
          </div>
          <div className="bg-red-100 shadow-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all">
            <h2 className="text-red-700 font-medium">Absent</h2>
            <p className="text-3xl font-bold text-red-800 mt-2">{absent}</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 border-b text-left">Roll No</th>
                <th className="px-6 py-4 border-b text-left">Student Name</th>
                <th className="px-6 py-4 border-b text-center">Present</th>
                <th className="px-6 py-4 border-b text-center">Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student.id} className={`hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 border-b">{student.roll}</td>
                  <td className="px-6 py-4 border-b">{student.name}</td>
                  <td className="px-6 py-4 border-b text-center">
                    <button
                      onClick={() => markAttendance(student.id, 'Present')}
                      className={`text-white p-2 rounded-full transition-transform hover:scale-110 ${
                        student.status === 'Present' ? 'bg-green-600' : 'bg-green-200'
                      }`}
                    >
                      <AiOutlineCheck size={24} />
                    </button>
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    <button
                      onClick={() => markAttendance(student.id, 'Absent')}
                      className={`text-white p-2 rounded-full transition-transform hover:scale-110 ${
                        student.status === 'Absent' ? 'bg-red-600' : 'bg-red-200'
                      }`}
                    >
                      <AiOutlineClose size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={submitAttendance}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all font-semibold"
          >
            Submit Attendance
          </button>
        </div>

      </div>
    </div>
  );
};

export default AttendanceDashboard;
