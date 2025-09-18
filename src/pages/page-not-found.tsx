import { Link } from 'react-router'

const PageNotFound = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-16'>
      {/* 404 Number */}
      <h1 className='text-[6rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 drop-shadow-md text-center'>
        404
      </h1>

      {/* Title */}
      <h2 className='mt-4 text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center'>
        Page Not Found
      </h2>

      {/* Subtitle */}
      <p className='mt-3 text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-2'>
        Sorry, the page you are looking for doesn't exist or has been moved.  
        Please check the URL or return to the home page.
      </p>

      {/* Action Button */}
      <div className='mt-6'>
        <Link
          to='/'
          className='inline-block px-6 sm:px-8 py-2 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base md:text-lg font-semibold rounded-xl shadow hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition'
        >
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
