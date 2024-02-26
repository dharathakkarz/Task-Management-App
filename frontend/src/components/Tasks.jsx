import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
//import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [fetchData, { loading }] = useFetch();
  const [searchQuery, setSearchQuery] = useState();

  const fetchTasks = useCallback(() => {
    const config = {
      url: `/tasks?page=${currentPage}&limit=${tasksPerPage}`,
      method: 'get',
      headers: { Authorization: authState.token },
    };

    fetchData(config, { showSuccessToast: false }).then((data) => {
      setTasks(data.tasks);
      setFilteredTasks(data.tasks); // Initially, filtered tasks are the same as all tasks
    });
  }, [authState.token, fetchData, currentPage]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks, currentPage]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: 'delete',
      headers: { Authorization: authState.token },
    };
    fetchData(config).then(() => fetchTasks());
  };

  const totalTasks = filteredTasks.length;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const displayedTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    const newFilteredTasks = tasks.filter((task) =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(newFilteredTasks);
  };

  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        {totalTasks !== 0 && <h2 className="my-2 ml-2 md:ml-0 text-xl">Your Total Tasks ({totalTasks})</h2>}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleSearchSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
       
          <div>
            {totalTasks === 0 ? (
              <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
                <span>No tasks found</span>
                <Link
                  to="/tasks/add"
                  className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2"
                >
                  + Add new task{' '}
                </Link>
              </div>
            ) : (
              displayedTasks.map((task, index) => (
                <div
                  key={task._id}
                  className="cursor-pointer bg-white my-4 p-4 text-gray-600 rounded-md shadow-md"
                >
                  <div className="flex">
                    <span className="font-medium">Task #{indexOfFirstTask + index + 1}</span>
                    <Tooltip text={'Edit this task'} position={'top'}>
                      <Link to={`/tasks/${task._id}`} className="ml-auto mr-2 text-green-600 cursor-pointer">
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>
                    <Tooltip text={'Delete this task'} position={'top'}>
                      <span className="text-red-500 cursor-pointer" onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <div className="whitespace-pre">{task.description}</div>
                </div>
              ))
            )}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`mx-2 px-3 py-1 bg-gray-300 rounded-md ${currentPage === i + 1 ? 'bg-gray-500 text-white' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        
      </div>
    </>
  );
};

export default Tasks;
