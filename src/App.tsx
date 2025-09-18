import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import DashboardLayout from './layouts/dashboard.layout'
import AdminDashboard from './pages/dashboard/admin-dashboard'
import ProfilePage from './pages/profilepage'
import PageNotFound from './pages/page-not.found'
import AttendancePage from './pages/attendancepage'

function App() {

  return (
    <main className='h-full tracking-wider'>

      <Router>
        <Routes>

          <Route path = '/login' element = { <Login /> }/>
          <Route path = '/signup' element = { <Signup /> }/>

          <Route path='/' element= { <DashboardLayout /> }>
            <Route path = '/dashboard/admin' element = { <AdminDashboard /> }/>
            <Route path = '/profile' element = { <ProfilePage /> }/>
            <Route path = '/attendance' element = { <AttendancePage /> }/>

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
