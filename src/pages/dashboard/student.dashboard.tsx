import { useQuery } from '@tanstack/react-query';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import {
  FaBook,
  FaCalendarAlt,
  FaCheckCircle,
  FaGraduationCap,
  FaUserGraduate
} from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import {
  MdCake,
  MdClass,
  MdEmail,
  MdLocationOn,
  MdNumbers,
  MdPerson,
  MdPhone,
  MdSchool
} from 'react-icons/md';
import { getStudentByEmail } from '../../api/student.api';
import { useAuth } from '../../context/auth.context';

interface Course {
  _id: string;
  code: string;
  name: string;
  creditHours: number;
  department: string;
  semester: number;
  program: string;
}

interface Class {
  _id: string;
  name: string;
  program: string;
  semester: number;
}

interface AttendInfo {
  _id: string;
  student: string;
  class: string;
  course: string;
  date: string;
  status: 'PRESENT' | 'ABSENT';
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

interface StudentData {
  student: {
    profile: {
      path: string;
      public_id: string;
    };
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
    rollNumber: string;
    registrationNumber: string;
    program: string;
    semester: number;
    courses: Course[];
    classes: Class[];
    isActive: boolean;
  };
  attendInfo: AttendInfo | AttendInfo[];
}

interface ApiResponse {
  status: string;
  success: boolean;
  data: StudentData;
  message: string;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: response, isLoading } = useQuery<ApiResponse>({
    queryFn: async () => {
      const userId: string = String(user?.email);
      console.log("useAuth => ", userId);
      const data = await getStudentByEmail(userId);
      console.log("data => ", data);
      return data;
    },
    queryKey: ['student-dashboard'],
  });

  const student = response?.data?.student;
  const attendInfo = response?.data?.attendInfo;

  // Convert attendInfo to array if it's not already and add debugging
  const attendanceRecords = Array.isArray(attendInfo) ? attendInfo : (attendInfo ? [attendInfo] : []);
  
  // Debug logging
  console.log("Raw attendInfo:", attendInfo);
  console.log("Processed attendanceRecords:", attendanceRecords);
  console.log("Number of records:", attendanceRecords.length);
  attendanceRecords.forEach((record, index) => {
    console.log(`Record ${index}:`, {
      status: record.status,
      course: record.course,
      class: record.class,
      date: record.date
    });
  });

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-4'></div>
        <p className='text-xl font-semibold text-gray-700 animate-pulse'>
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl text-gray-500'>No student data found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getAttendanceStatusColor = (status: string) => {
    // Normalize the status to uppercase and trim whitespace
    const normalizedStatus = status?.toUpperCase().trim();
    
    console.log("Getting color for status:", normalizedStatus);
    
    if (normalizedStatus === 'PRESENT') {
      return 'from-green-400 to-green-600';
    } else if (normalizedStatus === 'ABSENT') {
      return 'from-red-400 to-red-600';
    } else {
      console.warn("Unknown status:", status);
      return 'from-gray-400 to-gray-600';
    }
  };

  // Get course and class details for attendance record
  const getCourseDetails = (courseId: string) => {
    const course = student.courses.find(c => c._id === courseId);
    console.log("Finding course for ID:", courseId, "Found:", course);
    return course;
  };

  const getClassDetails = (classId: string) => {
    const classInfo = student.classes?.find(c => c._id === classId);
    console.log("Finding class for ID:", classId, "Found:", classInfo);
    return classInfo;
  };

  return (
    <main className='min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <div className='mb-8 animate-fadeIn'>
        <h2 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
          Student Dashboard
        </h2>
        <p className='text-gray-600 mt-2'>Welcome back, {student.fullName}!</p>
      </div>

      {/* Profile Section */}
      <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]'>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
          {/* Profile Image */}
          <div className='relative group'>
            <div className='w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500 ring-offset-4 transition-all duration-300 group-hover:ring-pink-500'>
              <img
                src={student.profile.path}
                alt={student.fullName}
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
              />
            </div>
            {student.isActive && (
              <div className='absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg'>
                Active
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className='flex-1 text-center md:text-left'>
            <h3 className='text-3xl font-bold text-gray-800 mb-2'>{student.fullName}</h3>
            <div className='flex flex-wrap gap-4 justify-center md:justify-start mb-4'>
              <span className='px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold'>
                {student.program}
              </span>
              <span className='px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold'>
                Semester {student.semester}
              </span>
              <span className='px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold'>
                {student.gender}
              </span>
            </div>

            {/* Contact Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
              <InfoItem icon={<MdEmail size={18} />} label='Email' value={student.email} />
              <InfoItem icon={<MdPhone size={18} />} label='Phone' value={student.phone} />
              <InfoItem icon={<MdLocationOn size={18} />} label='Address' value={student.address} />
              <InfoItem icon={<MdCake size={18} />} label='Age' value={`${calculateAge(student.dob)} years`} />
              <InfoItem icon={<MdNumbers size={18} />} label='Roll No' value={student.rollNumber} />
              <InfoItem icon={<MdPerson size={18} />} label='Reg No' value={student.registrationNumber} />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          title='Enrolled Courses'
          value={student.courses.length}
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/25 shadow-lg shadow-indigo-400/30">
              <FaBook size={20} className='text-white' />
            </div>
          }
          gradient='from-indigo-500 to-indigo-700'
          delay='0'
        />
        <StatCard
          title='Total Credits'
          value={student.courses.reduce((sum, course) => sum + course.creditHours, 0)}
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/25 shadow-lg shadow-purple-400/30">
              <BsFillJournalBookmarkFill size={20} className='text-white' />
            </div>
          }
          gradient='from-purple-500 to-purple-700'
          delay='100'
        />
        <StatCard
          title='Current Semester'
          value={student.semester}
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/25 shadow-lg shadow-pink-400/30">
              <FaCalendarAlt size={20} className='text-white' />
            </div>
          }
          gradient='from-pink-500 to-pink-700'
          delay='200'
        />
        <StatCard
          title='Active Classes'
          value={student.classes?.length || 0}
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/25 shadow-lg shadow-green-400/30">
              <MdClass size={20} className='text-white' />
            </div>
          }
          gradient='from-green-500 to-green-700'
          delay='300'
        />
      </div>

      {/* Attendance Section - Updated to show multiple records */}
      {attendanceRecords.length > 0 ? (
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl'>
          <h3 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
            <FaCheckCircle className='text-green-600' size={28} />
            Today's Attendance ({attendanceRecords.length} {attendanceRecords.length === 1 ? 'record' : 'records'})
          </h3>
          
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {attendanceRecords.map((record, index) => {
              const course = getCourseDetails(record.course);
              const classInfo = getClassDetails(record.class);
              const statusColor = getAttendanceStatusColor(record.status);
              
              console.log(`Rendering record ${index}:`, {
                status: record.status,
                color: statusColor,
                course: course?.name,
                class: classInfo?.name
              });
              
              return (
                <div 
                  key={record._id || index}
                  className={`bg-gradient-to-r ${statusColor} rounded-xl p-5 text-white transform transition-all duration-300 hover:scale-[1.02]`}
                >
                  {/* Status Badge */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='bg-blue-700 bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-full'>
                      <p className='text-sm font-bold flex items-center gap-2'>
                        {record.status}
                        {record.status === 'PRESENT' && <FaCheckCircle size={16} />}
                      </p>
                    </div>
                    <div className='text-sm text-white text-opacity-90 flex items-center gap-1'>
                      <AiOutlineCalendar size={16} />
                      {formatDate(record.date)}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className='mb-3'>
                    <p className='text-white text-opacity-80 text-xs mb-1'>Course</p>
                    <p className='text-lg font-bold'>{course?.code || 'N/A'} - {course?.name || 'Unknown Course'}</p>
                    <p className='text-sm text-white text-opacity-90'>{course?.department || ''}</p>
                  </div>

                  {/* Class Info */}
                  <div className='mb-3'>
                    <p className='text-white text-opacity-80 text-xs mb-1'>Class</p>
                    <p className='text-base font-semibold'>{classInfo?.name || 'N/A'}</p>
                  </div>

                  {/* Remarks */}
                  {record.remarks && (
                    <div className='mt-4 pt-4 border-t border-white border-opacity-30'>
                      <p className='text-white text-opacity-80 text-xs mb-1'>Remarks</p>
                      <p className='text-sm'>{record.remarks}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Attendance Summary */}
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <p className='text-3xl font-bold text-green-600'>
                  {attendanceRecords.filter(r => r.status?.toUpperCase() === 'PRESENT').length}
                </p>
                <p className='text-sm text-gray-600 mt-1'>Present</p>
              </div>
              <div className='text-center p-4 bg-red-50 rounded-lg'>
                <p className='text-3xl font-bold text-red-600'>
                  {attendanceRecords.filter(r => r.status?.toUpperCase() === 'ABSENT').length}
                </p>
                <p className='text-sm text-gray-600 mt-1'>Absent</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
          <h3 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
            <FaCheckCircle className='text-gray-400' size={28} />
            Today's Attendance
          </h3>
          <p className='text-gray-500 text-center py-8'>No attendance records found for today.</p>
        </div>
      )}

      {/* Courses Section */}
      <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl'>
        <h3 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
          <IoBookSharp className='text-blue-600' size={28} />
          Enrolled Courses
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {student.courses.map((course, index) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))}
        </div>
      </div>

      {/* Class Section */}
      {student.classes && student.classes.length > 0 && (
        <div className='bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-2xl'>
          <h3 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
            <FaUserGraduate className='text-purple-600' size={28} />
            Current {student.classes.length > 1 ? 'Classes' : 'Class'}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {student.classes.map((cls) => (
              <div 
                key={cls._id}
                className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500 hover:border-pink-500 transition-all duration-300'
              >
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <p className='text-gray-600 text-sm mb-1'>Class Name</p>
                    <p className='text-xl font-bold text-gray-800'>{cls.name}</p>
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm mb-1'>Program</p>
                    <p className='text-xl font-bold text-gray-800'>{cls.program}</p>
                  </div>
                  <div>
                    <p className='text-gray-600 text-sm mb-1'>Semester</p>
                    <p className='text-xl font-bold text-gray-800'>{cls.semester}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

// Helper Components
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
    <div className='text-gray-500'>{icon}</div>
    <div>
      <p className='text-xs text-gray-500'>{label}</p>
      <p className='text-sm font-semibold text-gray-800'>{value}</p>
    </div>
  </div>
);

const StatCard = ({
  title,
  value,
  icon,
  gradient,
  delay
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  delay: string;
}) => (
  <div
    className={`bg-gradient-to-r ${gradient} rounded-xl p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className='flex items-center justify-between mb-4'>
      <div className='bg-white bg-opacity-30 p-3 rounded-lg'>{icon}</div>
      <div className='text-4xl font-bold'>{value}</div>
    </div>
    <p className='text-sm font-medium opacity-90'>{title}</p>
  </div>
);

const CourseCard = ({ course, index }: { course: Course; index: number }) => (
  <div
    className='bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-300 cursor-pointer'
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className='flex items-start justify-between mb-3'>
      <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold'>
        {course.code}
      </div>
      <div className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold'>
        {course.creditHours} Credits
      </div>
    </div>
    <h4 className='font-bold text-gray-800 text-lg mb-2 line-clamp-2'>{course.name}</h4>
    <div className='flex items-center justify-between text-sm text-gray-600'>
      <span className='flex items-center gap-1'>
        <MdSchool size={16} />
        {course.department}
      </span>
      <span className='flex items-center gap-1'>
        <FaGraduationCap size={14} />
        Sem {course.semester}
      </span>
    </div>
  </div>
);

export default StudentDashboard;