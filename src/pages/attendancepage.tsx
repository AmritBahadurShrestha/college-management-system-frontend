interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
  remarks?: string;
}

const AttendancePage = () => {
  // Sample attendance data
  const attendanceData: AttendanceRecord[] = [
    { date: '2025-08-01', status: 'Present' },
    { date: '2025-08-02', status: 'Absent', remarks: 'Sick' },
    { date: '2025-08-03', status: 'Present' },
    { date: '2025-08-04', status: 'Leave', remarks: 'Personal' },
    { date: '2025-08-05', status: 'Present' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6">Attendance</h1>

        {/* Search / Filter */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="date"
            className="px-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Search by remarks..."
            className="px-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">{record.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        record.status === 'Present'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'Absent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{record.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-friendly stacked cards */}
        <div className="md:hidden mt-4 space-y-3">
          {attendanceData.map((record, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="text-gray-900">{record.date}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-700">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    record.status === 'Present'
                      ? 'bg-green-100 text-green-800'
                      : record.status === 'Absent'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {record.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Remarks:</span>
                <span className="text-gray-900">{record.remarks || '-'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
