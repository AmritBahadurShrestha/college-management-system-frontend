import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import AttendanceToggle from '../../components/attendance/AttendanceToggle';
import { AttendanceStatus } from '../../types/enum';

import { postAttendance } from '../../api/attendance.api';
import { getStudentsByClass } from '../../api/student.api';
import { getAllClassesList } from '../../api/class.api';
import { getAllCoursesList } from '../../api/course.api';

import type {
  IAttendanceData,
  IAttendanceResponse
} from '../../types/attendance.types';

interface IClass {
  _id: string;
  name: string;
}

interface ICourse {
  _id: string;
  name: string;
}

interface IStudent {
  _id: string;
  name: string;
}

const AutoAttendance = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);

  const [classId, setClassId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [statusMap, setStatusMap] = useState<
    Record<string, AttendanceStatus>
  >({});

  /* Fetch Classes & Courses */
  useEffect(() => {
    getAllClassesList().then(res => {
      setClasses(res.data || res);
    });

    getAllCoursesList().then(res => {
      setCourses(res.data || res);
    });
  }, []);

  /* Fetch Students by Class */
  useEffect(() => {
  if (!classId) return;

  getStudentsByClass(classId)
    .then(res => {
      const studentsData = res?.data || []; // this is the array
      setStudents(studentsData);

      const initialStatus: Record<string, AttendanceStatus> = {};
      studentsData.forEach((s: IStudent) => {
        initialStatus[s._id] = AttendanceStatus.PRESENT;
      });
      setStatusMap(initialStatus);
    })
    .catch(err => {
      toast.error(err?.message || 'Failed to fetch students');
      setStudents([]);
    });
}, [classId]);


  /* Auto-save Attendance Mutation */
  const { mutate } = useMutation<
    IAttendanceResponse,
    Error,
    IAttendanceData
  >({
    mutationFn: postAttendance,
    onSuccess: () => {
      toast.success('Attendance saved');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save');
    }
  });

  /* Handle Status Change */
  const handleStatusChange = (
    studentId: string,
    status: AttendanceStatus
  ) => {
    if (!classId || !courseId) {
      toast.error('Please select class and course first');
      return;
    }

    setStatusMap(prev => ({ ...prev, [studentId]: status }));

    mutate({
      student: studentId,
      class: classId,
      course: courseId,
      date,
      status
    });
  };

  {/* UI */}
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Auto Attendance
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={classId}
          onChange={e => setClassId(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={courseId}
          onChange={e => setCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Students Table */}
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Student Name</th>
            <th className="p-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={2} className="p-4 text-center text-gray-500">
                No students found
              </td>
            </tr>
          )}

          {students.map(student => (
            <tr key={student._id} className="border-t">
              <td className="p-2">{student.name}</td>
              <td className="p-2 text-center">
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
};

export default AutoAttendance;
