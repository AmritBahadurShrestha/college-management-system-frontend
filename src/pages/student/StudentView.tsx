import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getStudentById } from '../../api/student.api';
import StudentSkeleton from '../../skeleton/StudentSkeleton';
import { 
  MdArrowBack, 
  MdPrint, 
  MdPerson, 
  MdCalendarToday, 
  MdEmail, 
  MdPhone,
  MdSchool,
  MdDescription,
  MdClass
} from 'react-icons/md';

const StudentView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['get_student_by_id', id],
    queryFn: () => getStudentById(id as string),
    enabled: !!id,
  });

    if (isLoading) {
        return <StudentSkeleton />;
    }

  const student = data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 flex justify-center items-start">

      {/* Main Container */}
      <div className="max-w-5xl w-full">
        
        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button
            onClick={() => navigate('/student')}
            className="inline-flex items-center gap-2
                       px-6 py-3 rounded-2xl
                       bg-white text-indigo-600 font-semibold
                       shadow-lg border-2 border-indigo-100
                       hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                       hover:shadow-xl hover:scale-105
                       transition-all duration-300
                       cursor-pointer"
          >
            <MdArrowBack className="w-5 h-5" />
            Back to List
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2
                       px-6 py-3 rounded-2xl
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold
                       shadow-lg
                       hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-105
                       transition-all duration-300
                       cursor-pointer"
          >
            <MdPrint className="w-5 h-5" />
            Print / Save PDF
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Gradient Header Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Section */}
          <div className="px-8 pb-8">
            {/* Profile Image - Overlapping Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-16 relative z-10">
              <div className="h-32 w-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-gray-50 flex-shrink-0">
                <img
                  src={student.profile?.path}
                  alt={student.fullName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left mt-16 md:mt-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {student.fullName}
                </h2>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold">
                    <MdPerson className="w-4 h-4" />
                    {student.gender}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold">
                    <MdCalendarToday className="w-4 h-4" />
                    {new Date(student.dob).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MdEmail className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">{student.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MdPhone className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">{student.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t-2 border-gray-100"></div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Academic Information Card */}
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <MdSchool className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Academic Information</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Program</p>
                      <p className="text-gray-800 font-medium">{student.program}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Semester</p>
                      <p className="text-gray-800 font-medium">{student.semester}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">Enrolled Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {student.courses.map((c: any, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-white rounded-lg text-sm text-blue-700 font-medium shadow-sm border border-blue-100">
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Details Card */}
              <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <MdDescription className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Registration Details</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Roll Number</p>
                      <p className="text-gray-800 font-medium">{student.rollNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Registration Number</p>
                      <p className="text-gray-800 font-medium">{student.registrationNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Address</p>
                      <p className="text-gray-800 font-medium">{student.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classes Information Card - FULL WIDTH */}
              <div className="md:col-span-2 group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <MdClass className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Assigned Classes</h3>
                </div>
                
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-3">Active Classes</p>
                  <div className="flex flex-wrap gap-3">
                    {student.classes && student.classes.length > 0 ? (
                      student.classes.map((cls: any, idx: number) => (
                        <div key={idx} className="px-4 py-2 bg-white rounded-xl shadow-sm border border-green-200 hover:shadow-md transition-shadow">
                          <p className="text-green-700 font-semibold">{cls.name}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No classes assigned</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center print:hidden">
          <p className="text-sm text-gray-600">
            Student profile created on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
