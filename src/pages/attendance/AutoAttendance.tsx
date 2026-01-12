import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AttendanceToggle from '../../components/attendance/AttendanceToggle';
import { AttendanceStatus } from '../../types/enum';
import { postAttendance } from '../../api/attendance.api';
import { getStudentsByClass } from '../../api/student.api';
import type { IAttendanceData, IAttendanceResponse } from '../../types/attendance.types';

const AutoAttendance = () => {
  const [classId, setClassId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [students, setStudents] = useState<any[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, AttendanceStatus>>(
    {}
  );

  // Fetch students when class changes
  useEffect(() => {
    if (!classId) return;

    getStudentsByClass(classId).then(data => {
      setStudents(data);
      const initialStatus: any = {};
      data.forEach((s: any) => {
        initialStatus[s._id] = AttendanceStatus.PRESENT;
      });
      setStatusMap(initialStatus);
    });
  }, [classId]);

  // Auto-save mutation
//   const { mutate } = useMutation(postAttendance, {
//     onSuccess: () => toast.success('Attendance saved'),
//     onError: () => toast.error('Failed to save')
//   });

    // const { mutate } = useMutation<
    //   IAttendanceResponse,
    //   Error,
    //   IAttendanceData
    // >(postAttendance, {
    //   onSuccess: () => toast.success('Attendance saved'),
    //   onError: () => toast.error('Failed to save')
    // });

    // const { mutate } = useMutation<
    //   IAttendanceResponse,
    //   Error,
    //   IAttendanceData
    // >(postAttendance, {
    //   onSuccess: () => toast.success('Attendance saved'),
    //   onError: (error: any) => {
    //     toast.error(error.response?.data?.message || 'Failed to save');
    //   }
    // });

    const { mutate } = useMutation<
      IAttendanceResponse,
      Error,
      IAttendanceData
    >({
      mutationFn: postAttendance,
      onSuccess: () => toast.success('Attendance saved'),
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to save');
      }
    });




  const handleStatusChange = (
    studentId: string,
    status: AttendanceStatus
  ) => {
    setStatusMap(prev => ({ ...prev, [studentId]: status }));

    mutate({
      student: studentId,
      class: classId,
      course: courseId,
      date,
      status
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Auto Attendance
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          onChange={e => setClassId(e.target.value)}
        >
          <option value="">Select Class</option>
          {/* map classes */}
        </select>

        <select
          className="border p-2 rounded"
          onChange={e => setCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {/* map courses */}
        </select>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Student Name</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id} className="border-t">
              <td className="p-2">{student.name}</td>
              <td className="p-2">
                <AttendanceToggle
                  value={statusMap[student._id]}
                  onChange={status =>
                    handleStatusChange(student._id, status)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutoAttendance;
