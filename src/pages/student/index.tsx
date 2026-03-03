import StudentList from '../../components/student/list';
import PageHeader from '../../components/header/page-header';
import SearchInput from './SearchInput';
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/auth.context";
import { Role, PROGRAMS, SEMESTER_OPTIONS } from "../../types/enum";

const StudentPage = () => {
  const [tempInputValue, setTempInputValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const { user } = useAuth()

  useEffect(()=>{
    const interval = setTimeout(()=>{
      setInputValue(tempInputValue)
    },500)

    return()=> clearTimeout(interval)
  },[tempInputValue])

  return (
    <main className='min-h-screen w-full p-0 flex flex-col gap-2'>
      
      {/* Page Header */}
      <PageHeader
        key='list-student'
        title='Student List'
        sub_title='All Students'
        {...(user?.role === Role.ADMIN && { button_text: 'Add Student' })}
        link_to='/student/add'
      />
      
      {/* Filters */}
      <div className='flex flex-wrap items-center gap-3'>
        <SearchInput 
          tempInputValue={tempInputValue}
          setTempInputValue={setTempInputValue}
          placeholder='Search students' id='search'
        />
        <select
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className='w-full sm:w-auto px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200'
        >
          <option value=''>All Programs</option>
          {PROGRAMS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className='w-full sm:w-auto px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200'
        >
          <option value=''>All Semesters</option>
          {SEMESTER_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Main content */}
      <div className='mx-auto w-full sm:px-0 lg:px-0'>
        
        {/* Intro */}
        <div className='bg-white shadow-sm rounded-sm p-4 sm:p-6 md:p-8'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text text-center mb-3 sm:mb-4'>
            Student List
          </h2>

          {/* Horizontal line */}
          <hr className='border-t-2 border-gray-300 mb-4 w-full mx-auto' />

          <StudentList inputValue={inputValue} selectedProgram={selectedProgram} selectedSemester={selectedSemester}/>

        </div>
      </div>
    </main>
  );
};

export default StudentPage;
