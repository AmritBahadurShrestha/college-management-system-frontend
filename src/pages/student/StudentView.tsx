import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getStudentById } from '../../api/student.api';

const StudentView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['get_student_by_id', id],
    queryFn: () => getStudentById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading student...</p>;

  const student = data?.data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Student Details</h2>

        <button
          onClick={() => navigate('/student')}
          className="px-4 py-2 text-sm font-medium rounded-lg
                     bg-gray-200 text-gray-700
                     hover:bg-indigo-500 hover:text-white
                     transition-all"
        >
          ← Back to List
        </button>
      </div>

      {/* Profile */}
      <div className="flex gap-6 mb-6">
        <img
          src={student.profile?.path}
          alt={student.fullName}
          className="h-28 w-28 rounded-lg border object-cover"
        />

        <div>
          <p className="text-lg font-semibold">{student.fullName}</p>
          <p className="text-gray-500">{student.email}</p>
          <p className="text-gray-500">{student.phone}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4">
        <p><b>Gender:</b> {student.gender}</p>
        <p><b>Program:</b> {student.program}</p>
        <p><b>Semester:</b> {student.semester}</p>
        <p><b>Courses:</b> {student.courses.map((c:any) => c.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default StudentView;
