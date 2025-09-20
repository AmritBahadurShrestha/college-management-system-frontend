import TeacherList from '../../components/teacher/list';
import PageHeader from '../../components/header/page-header';

const TeacherPage = () => {
  return (
    <main className='min-h-screen w-full p-0'>
      
      {/* Page Header */}
      <PageHeader
        key='list-teacher'
        title='Teacher List'
        sub_title='All Teachers'
        button_text='Add Teacher'
        link_to='/teacher/add'
      />

      {/* Main content */}
      <div className='mx-auto w-full sm:px-0 lg:px-0 mt-6 md:mt-6'>
        
        {/* Intro */}
        <div className='bg-white shadow-sm rounded-sm p-4 sm:p-6 md:p-8'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text text-center mb-3 sm:mb-4'>
            Teacher List
          </h2>

          {/* Horizontal line */}
          <hr className='border-t-2 border-gray-300 mb-4 w-full mx-auto' />

          <TeacherList/>

        </div>
      </div>
    </main>
  );
};

export default TeacherPage;
