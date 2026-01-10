import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AttendanceStatus } from '../../types/enum';
import { getAllClassesList } from '../../api/class.api';
import { getAllCoursesList } from '../../api/course.api';
import { getStudentsByClass } from '../../api/student.api';
import { postBulkAttendance } from '../../api/attendance.api';

const AutoAttendance = () => {

  const [classId, setClassId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [records, setRecords] = useState<any[]>([]);

  // Fetch dropdowns
  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: getAllClassesList
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: getAllCoursesList
  });

  // Fetch students class-wise
  const { data: students } = useQuery({
    queryKey: ['students_by_class', classId],
    queryFn: () => getStudentsByClass(classId),
    enabled: !!classId
  });

  // Auto create attendance records
  useEffect(() => {
    if (students?.data) {
      setRecords(
        students.data.map((s: any) => ({
          student: s._id,
          status: AttendanceStatus.PRESENT,
          remarks: ''
        }))
      );
    }
  }, [students]);

  // Submit bulk attendance
  const { mutate, isPending } = useMutation({
    mutationFn: postBulkAttendance,
    onSuccess: (res) => toast.success(res.message),
    onError: (err: any) => toast.error(err.message)
  });

  const submitAttendance = () => {
    if (!classId || !courseId || !date) {
      toast.error('Please select class, course and date');
      return;
    }

    mutate({
      classId,
      course: courseId,
      date,
      records
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
      {students?.data?.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Student</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.data.map((s: any, index: number) => (
              <tr key={s._id}>
                <td className="border p-2">{s.fullName}</td>
                <td className="border p-2">
                  <select
                    value={records[index]?.status}
                    onChange={e => {
                      const updated = [...records];
                      updated[index].status = e.target.value;
                      setRecords(updated);
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
      )}

      {/* Submit */}
      <button
        onClick={submitAttendance}
        disabled={isPending}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        {isPending ? 'Saving...' : 'Submit Attendance'}
      </button>
    </div>
  );
};

export default AutoAttendance;
