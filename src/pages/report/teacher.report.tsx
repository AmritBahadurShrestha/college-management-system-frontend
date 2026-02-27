import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiBookOpen,
  FiUsers,
  FiAward,
  FiGrid,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
  FiLayers,
  FiClock,
} from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { MdDepartureBoard } from "react-icons/md";

// Types
interface Course {
  _id: string;
  code: string;
  name: string;
  creditHours: number;
  department: string;
  semester: number;
  program: string;
  isActive: boolean;
  createdAt: string;
}

interface ClassInfo {
  _id: string;
  name: string;
  program: string;
  semester: number;
  students: string[];
  courses: string[];
  teacher: string;
  isActive: boolean;
  createdAt: string;
}

interface TeacherInfo {
  profile: { path: string; public_id: string };
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  courses: Course[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherReportData {
  role: string;
  teacherInfo: TeacherInfo;
  classInfo: ClassInfo[];
  totalStudentCount: number;
  percentage: number;
}

// Palette
const COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#10b981", "#f43f5e"];

// Sub-components
const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent: string;
}) => (
  <div className="relative overflow-hidden bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-shadow duration-300">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent}`}
    >
      <Icon className="text-white text-xl" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
    </div>
    <div
      className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-5 ${accent}`}
    />
  </div>
);

const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-5">
    <Icon className="text-indigo-500 text-lg" />
    <h2 className="text-base font-bold text-slate-700 uppercase tracking-wider">
      {title}
    </h2>
    <div className="flex-1 h-px bg-gradient-to-r from-indigo-100 to-transparent ml-2" />
  </div>
);

// Custom Tooltip
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl shadow-xl">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.fill }}>
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Main Component
function TeacherReport({ data }: { data: TeacherReportData }) {
  if (!data) return null;

  const { teacherInfo, classInfo, totalStudentCount, percentage } = data;

  const totalCreditHours = teacherInfo.courses.reduce(
    (sum, c) => sum + c.creditHours,
    0
  );

  // Chart data
  const creditHoursData = teacherInfo.courses.map((c) => ({
    name: c.code,
    credits: c.creditHours,
    semester: c.semester,
    fullName: c.name,
  }));

  const classStudentData = classInfo.map((cls) => ({
    name: cls.name,
    students: cls.students.length,
    courses: cls.courses.length,
    semester: cls.semester,
  }));

  const pieData = [
    { name: "Students Enrolled", value: totalStudentCount },
    { name: "Capacity Available", value: Math.max(0, 10 - totalStudentCount) },
  ];

  const semesterPieData = classInfo.map((cls) => ({
    name: `${cls.name} (Sem ${cls.semester})`,
    value: cls.students.length,
  }));

  const radialData = [
    {
      name: "Completion",
      value: percentage,
      fill: "#6366f1",
    },
  ];

  const joinDate = new Date(teacherInfo.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 font-sans">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={teacherInfo.profile.path}
                alt={teacherInfo.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/30 shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(teacherInfo.fullName)}&background=6366f1&color=fff&size=112`;
                }}
              />
              {teacherInfo.isActive && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full" />
              )}
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {teacherInfo.fullName}
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mx-auto sm:mx-0">
                  <HiAcademicCap className="text-sm" />
                  {data.role}
                </span>
              </div>
              <p className="text-indigo-200 text-sm mb-3">
                Department of {teacherInfo.department} · Joined {joinDate}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-indigo-100">
                <span className="flex items-center gap-1">
                  <FiMail /> {teacherInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <FiPhone /> {teacherInfo.phone}
                </span>
                <span className="flex items-center gap-1">
                  <FiUser /> {teacherInfo.gender}
                </span>
              </div>
            </div>

            {/* Percentage Radial */}
            <div className="shrink-0 hidden lg:flex flex-col items-center">
              <RadialBarChart
                width={110}
                height={110}
                cx={55}
                cy={55}
                innerRadius={32}
                outerRadius={50}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  background={{ fill: "rgba(255,255,255,0.15)" }}
                />
              </RadialBarChart>
              <p className="text-white font-bold text-lg -mt-16">{percentage}%</p>
              <p className="text-indigo-200 text-xs mt-8">Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={FiUsers}
            label="Total Students"
            value={totalStudentCount}
            accent="bg-indigo-500"
          />
          <StatCard
            icon={FiGrid}
            label="Classes"
            value={classInfo.length}
            accent="bg-cyan-500"
          />
          <StatCard
            icon={FiBookOpen}
            label="Courses"
            value={teacherInfo.courses.length}
            accent="bg-amber-500"
          />
          <StatCard
            icon={FiAward}
            label="Credit Hours"
            value={totalCreditHours}
            accent="bg-emerald-500"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Bar Chart – Credit Hours per Course */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <SectionTitle icon={FiBookOpen} title="Credit Hours per Course" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={creditHoursData} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="credits" name="Credits" radius={[8, 8, 0, 0]}>
                  {creditHoursData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart – Students & Courses per Class */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <SectionTitle icon={FiUsers} title="Students & Courses per Class" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={classStudentData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "#f1f5f9" }} />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
                />
                <Bar dataKey="students" name="Students" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="courses" name="Courses" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pie – Student Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <SectionTitle icon={FiTrendingUp} title="Student Distribution" />
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={semesterPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={48}
                  dataKey="value"
                  paddingAngle={4}
                  label={({ percent = 0  }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {semesterPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: "#64748b" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie – Enrolled vs Capacity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <SectionTitle icon={FiLayers} title="Enrollment vs Capacity" />
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                  label={({ value }) => `${value}`}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? "#6366f1" : "#e2e8f0"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: "#64748b" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionTitle icon={FiBookOpen} title="Assigned Courses" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Code", "Course Name", "Department", "Program", "Semester", "Credits", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-4 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {teacherInfo.courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b border-slate-50 hover:bg-indigo-50/40 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-700 font-mono font-semibold text-xs">
                        {course.code}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-medium text-slate-700 whitespace-nowrap">
                      {course.name}
                    </td>
                    <td className="py-3 pr-4 text-slate-500">{course.department}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium">
                        {course.program}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-center text-slate-600">
                      {course.semester}
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                        <FiClock className="text-amber-500" />
                        {course.creditHours}
                      </span>
                    </td>
                    <td className="py-3">
                      {course.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                          <FiCheckCircle /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Classes Grid */}
        <div>
          <SectionTitle icon={FiGrid} title="Classes Overview" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {classInfo.map((cls, i) => (
              <div
                key={cls._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{cls.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <MdDepartureBoard /> {cls.program}
                    </p>
                  </div>
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: COLORS[i % COLORS.length] }}
                  >
                    S{cls.semester}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Students", val: cls.students.length, icon: FiUsers },
                    { label: "Courses", val: cls.courses.length, icon: FiBookOpen },
                    { label: "Semester", val: cls.semester, icon: FiCalendar },
                  ].map(({ label, val, icon: Icon }) => (
                    <div
                      key={label}
                      className="bg-slate-50 rounded-xl p-3 text-center"
                    >
                      <Icon className="mx-auto mb-1 text-slate-400" />
                      <p className="text-lg font-bold text-slate-700">{val}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <FiCalendar className="text-slate-300" />
                    {new Date(cls.createdAt).toLocaleDateString()}
                  </span>
                  {cls.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      <FiCheckCircle /> Active
                    </span>
                  ) : (
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-slate-400">
          Report generated for{" "}
          <span className="font-semibold text-indigo-500">{teacherInfo.fullName}</span>{" "}
          · College Management System
        </div>
      </div>
    </div>
  );
}

export default TeacherReport;