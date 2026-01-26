import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getStudentById } from '../../api/student.api';

const StudentView = () => {
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
      <h2 className="text-xl font-bold mb-4">Student Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <p><b>Name:</b> {student.fullName}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Phone:</b> {student.phone}</p>
        <p><b>Gender:</b> {student.gender}</p>
        <p><b>Program:</b> {student.program}</p>
        <p><b>Semester:</b> {student.semester}</p>
        <p><b>Courses:</b> {student.courses.map((c:any) => c.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default StudentView;
