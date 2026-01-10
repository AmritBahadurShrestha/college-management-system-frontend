import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AttendanceStatus } from '../../types/enum';
import { getAllClassesList } from '../../api/class.api';
import { getAllCoursesList } from '../../api/course.api';
import { getStudentsByClass } from '../../api/student.api';
import { postBulkAttendance } from '../../api/attendance.api';

const AttendanceAutoPage = () => {
  const [classId, setClassId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceList, setAttendanceList] = useState<any[]>([]);

  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: getAllClassesList
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: getAllCoursesList
  });

  const { data: students } = useQuery({
    queryKey: ['students_by_class', classId],
    queryFn: () => getStudentsByClass(classId),
    enabled: !!classId
  });

  useEffect(() => {
    if (students?.data) {
      setAttendanceList(
        students.data.map((s: any) => ({
          student: s._id,
          status: AttendanceStatus.PRESENT,
          remarks: ''
        }))
      );
    }
  }, [students]);

  const { mutate, isPending } = useMutation({
    mutationFn: postBulkAttendance,
    onSuccess: (res) => toast.success(res.message),
    onError: (err: any) => toast.error(err.message)
  });

  const submitAttendance = () => {
    if (!classId || !courseId || !date) {
      toast.error('All fields required');
      return;
    }

    mutate({
      classId,
      course: courseId,
      date,
      records: attendanceList
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow">
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select onChange={e => setClassId(e.target.value)}>
          <option value="">Select Class</option>
          {classes?.data.map((c: any) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select onChange={e => setCourseId(e.target.value)}>
          <option value="">Select Course</option>
          {courses?.data.map((c: any) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input type="date" onChange={e => setDate(e.target.value)} />
      </div>

      {/* Attendance Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students?.data.map((s: any, idx: number) => (
            <tr key={s._id}>
              <td>{s.fullName}</td>
              <td>
                <select
                  value={attendanceList[idx]?.status}
                  onChange={e => {
                    const updated = [...attendanceList];
                    updated[idx].status = e.target.value;
                    setAttendanceList(updated);
                  }}
                >
                  <option value="PRESENT">PRESENT</option>
                  <option value="ABSENT">ABSENT</option>
                  <option value="LEAVE">LEAVE</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={submitAttendance}
        disabled={isPending}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      >
        {isPending ? 'Saving...' : 'Submit Attendance'}
      </button>
    </div>
  );
};

export default AttendanceAutoPage;
