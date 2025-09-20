import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import DashboardLayout from './layouts/dashboard.layout'
import AdminDashboard from './pages/dashboard/admin-dashboard'

import StudentPage from './pages/student'
import CreateStudent from './pages/student/add.student'
import UpdateStudent from './pages/student/update.student'

import TeacherPage from './pages/teacher'
import CreateTeacher from './pages/teacher/add.teacher'
import UpdateTeacher from './pages/teacher/update.teacher'

import CoursePage from './pages/course'
import CreateCourse from './pages/course/add.course'
import UpdateCourse from './pages/course/update.course'

import ClassPage from './pages/cclass'
import CreateClass from './pages/cclass/add.class'
import UpdateClass from './pages/cclass/update.class'

import ProfilePage from './pages/profilepage'
import PageNotFound from './pages/page-not.found'
import AttendancePage from './pages/attendancepage'
import AttendanceDashboard from './pages/attendance.dashboard'

function App() {

  return (
    <main className='h-full tracking-wider'>

      <Router>
        <Routes>

          <Route path = '/login' element = { <Login /> }/>
          <Route path = '/signup' element = { <Signup /> }/>

          <Route path='/' element= { <DashboardLayout /> }>
            <Route path = '/dashboard/admin' element = { <AdminDashboard /> }/>

            {/* Student */}
            <Route path='/student' element= { <StudentPage /> }/>
            <Route path='/student/add' element= { <CreateStudent /> }/>
            <Route path='/student/edit/:id' element= { <UpdateStudent /> }/>

            {/* Teacher */}
            <Route path='/teacher' element= { <TeacherPage /> }/>
            <Route path='/teacher/add' element= { <CreateTeacher /> }/>
            <Route path='/teacher/edit/:id' element= { <UpdateTeacher /> }/>

            {/* Course */}
            <Route path='/course' element= { <CoursePage /> }/>
            <Route path='/course/add' element= { <CreateCourse /> }/>
            <Route path='/course/edit/:id' element= { <UpdateCourse /> }/>

            {/* Class */}
            <Route path='/class' element= { <ClassPage /> }/>
            <Route path='/class/add' element= { <CreateClass /> }/>
            <Route path='/class/edit/:id' element= { <UpdateClass /> }/>

            <Route path = '/profile' element = { <ProfilePage /> }/>
            <Route path = '/attendance' element = { <AttendancePage /> }/>

            <Route path = '/attendance/dashboard' element = { <AttendanceDashboard /> }/>

            <Route path = '*' element = { <PageNotFound /> }/>
          </Route>

        </Routes>
      </Router>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </main>
  )
}

export default App
