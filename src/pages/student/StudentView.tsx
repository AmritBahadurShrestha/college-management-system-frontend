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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-indigo-600 font-medium animate-pulse">
          Loading student details...
        </p>
      </div>
    );
  }

  const student = data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">

      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={() => navigate('/student')}
          className="inline-flex items-center gap-2
                     px-4 py-2 rounded-lg
                     bg-white text-indigo-600 font-medium
                     shadow-sm border border-indigo-100
                     hover:bg-indigo-600 hover:text-white
                     hover:shadow-md hover:-translate-y-0.5
                     transition-all duration-200
                     cursor-pointer"
        >
          ← Back to List
        </button>
      </div>

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">

          {/* Profile Image */}
          <div className="h-32 w-32 rounded-xl overflow-hidden border shadow-sm bg-gray-50 flex-shrink-0">
            <img
              src={student.profile?.path}
              alt={student.fullName}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {student.fullName}
            </h2>
            <p className="text-gray-500 mt-1">{student.email}</p>
            <p className="text-gray-500">{student.phone}</p>

            <div className="mt-3 inline-block px-3 py-1 rounded-full text-sm
                            bg-indigo-100 text-indigo-700 font-medium">
              {student.gender}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Academic Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Academic Information
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><b>Program:</b> {student.program}</p>
              <p><b>Semester:</b> {student.semester}</p>
              <p>
                <b>Courses:</b>{' '}
                {student.courses.map((c: any) => c.name).join(', ')}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Other Details
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><b>Roll No:</b> {student.rollNumber}</p>
              <p><b>Registration No:</b> {student.registrationNumber}</p>
              <p><b>Address:</b> {student.address}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentView;
