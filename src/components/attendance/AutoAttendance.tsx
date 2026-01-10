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

  // Fetch Classes
  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: getAllClassesList,
  });

  // Fetch Courses
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: getAllCoursesList,
  });

  // Fetch Students by selected class
  const { data: students, isFetching: studentsLoading } = useQuery({
    queryKey: ['students_by_class', classId],
    queryFn: () => getStudentsByClass(classId),
    enabled: !!classId,
  });

  // Populate attendance records whenever students change
  useEffect(() => {
    if (students?.data) {
      const initialRecords = students.data.map((s: any) => ({
        student: s._id,
        status: AttendanceStatus.PRESENT,
        remarks: '',
      }));
      setRecords(initialRecords);
    }
  }, [students]);

  // Mutation to submit bulk attendance
  const { mutate, isPending: submitting } = useMutation({
    mutationFn: postBulkAttendance,
    onSuccess: (res: any) => toast.success(res.message || 'Attendance saved!'),
    onError: (err: any) => toast.error(err.message || 'Failed to save attendance'),
  });

  // Submit handler
  const submitAttendance = () => {
    if (!classId || !courseId || !date) {
      toast.error('Please select Class, Course, and Date');
      return;
    }

    mutate({
      classId,
      course: courseId,
      date,
      records,
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Auto Attendance</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border p-2 rounded"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes?.data?.map((c: any) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses?.data?.map((c: any) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Students Table */}
      {studentsLoading ? (
        <p>Loading students...</p>
      ) : students?.data?.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Student Name</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.data.map((s: any, idx: number) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="border p-2">{s.fullName}</td>
                <td className="border p-2">
                  <select
                    className="border p-1 rounded"
                    value={records[idx]?.status}
                    onChange={(e) => {
                      const updated = [...records];
                      updated[idx].status = e.target.value;
                      setRecords(updated);
                    }}
                  >
                    <option value={AttendanceStatus.PRESENT}>PRESENT</option>
                    <option value={AttendanceStatus.ABSENT}>ABSENT</option>
                    <option value={AttendanceStatus.LEAVE}>LEAVE</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : classId ? (
        <p>No students found for this class.</p>
      ) : (
        <p>Please select a class to see students.</p>
      )}

      {/* Submit Button */}
      <button
        onClick={submitAttendance}
        disabled={submitting || !records.length}
        className={`mt-4 px-6 py-2 rounded text-white ${
          submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit Attendance'}
      </button>
    </div>
  );
};

export default AutoAttendance;
