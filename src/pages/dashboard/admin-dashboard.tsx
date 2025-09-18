import { useQuery } from '@tanstack/react-query'
import { fetchDashboard } from '../../api/dashboard.api'
import CountCard from '../../components/dashboard/count-card'

interface DashboardData {
  students: number
  teachers: number
  courses: number
  classes: number
}

const AdminDashboard = () => {
  const { data, isLoading } = useQuery<DashboardData>({
    queryFn: fetchDashboard,
    queryKey: ['dashboard'],
  })

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-gray-500 text-lg animate-pulse'>Loading...</p>
      </div>
    )
  }

  return (
    <main className='h-full w-full p-8 bg-gray-50'>
      <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <CountCard label='Students' count={data?.students || 0} bg='bg-blue-100' />
        <CountCard label='Teachers' count={data?.teachers || 0} bg='bg-green-100' />
        <CountCard label='Courses' count={data?.courses || 0} bg='bg-yellow-100' />
        <CountCard label='Classes' count={data?.classes || 0} bg='bg-purple-100' />
      </div>
    </main>
  )
}

export default AdminDashboard;
