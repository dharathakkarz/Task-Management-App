import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
 <MainLayout>
      {!authState.isLoggedIn ? (
        <div className='bg-primary text-white h-[40vh] py-8 text-center'>
          <h1 className='text-2xl'>  Task Management</h1>
          <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
            <span className='transition-[margin]'>Organize It With All Your Task</span>
            <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
          </Link>
        </div>
      ) : (
        <>
         <div className="flex justify-between items-center mb-4 mx-8">
            <h1 className='text-lg border-b border-b-gray-300'>Welcome {authState.user.name}</h1>
            <Link to="/profile/update">
              <button className='text-blue-500 hover:underline focus:outline-none'>
                Update Profile
              </button>
            </Link>
          </div>
          <Tasks />
        </>
      )}
    </MainLayout>
    </>
  )
}

export default Home