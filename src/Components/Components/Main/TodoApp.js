import React, { useState, useEffect } from 'react';
import TodoDisplay from './TodoDisplay';
import { uid } from 'uid'
import { useSelector, useDispatch } from 'react-redux'
import { addJob,  destroyAllJobsCompleted } from '../../../features/jobs/jobsSlice';
import { incrementedActive, getJobsActive } from '../../../features/jobs/jobsActiveSlice';
import { getJobsCompleted } from '../../../features/jobs/jobsCompletedSlice'
import './Main.css'

const TodoApp = () => {
    const jobs = useSelector((state) => state.jobs.jobs);
    const jobsActive = useSelector((state) => state.jobsActive.value)
    const jobsCompleted = useSelector((state) => state.jobsCompleted.value)
    const dispatch = useDispatch();
    const [job, setJob] = useState('');
    const [statusJobs, setStatusJobs] = useState('All');
    const handleInputJob = (e) => {
        setJob(e.target.value)
    }
    const handleAddJob = () => {
        const newJob = {
            id: uid(32),
            status: 'active',
            value: job
        }
        job && dispatch(addJob(newJob))
        job && dispatch(incrementedActive())
        setJob('')
    }
    const handleSelectAll = () => {
        setStatusJobs('All');
    }
    const handleSelectActive = () => {
        setStatusJobs('Active')
    }
    const handleSelectCompleted = () => {
        setStatusJobs('Completed')
    }
    useEffect(() => {
        dispatch(getJobsActive({ value: jobs.filter(job => job.status === 'active').length }))
        dispatch(getJobsCompleted({ value: jobs.filter(job => job.status === 'completed').length }))
    }, [jobs])
    useEffect(() => {
        jobs.length !== 0 && localStorage.setItem('react-todos', JSON.stringify(jobs))
        jobs.length === 0 && localStorage.removeItem('react-todos')

    }, [jobs, jobsActive, jobsCompleted]);
    const destroyAllCompleted = () => {
        dispatch(destroyAllJobsCompleted())
    }
    return (
        <section className="todoapp">
            <div data-reactid=".0">
                <header className="header" data-reactid=".0.0">
                    <h1 data-reactid=".0.0.0">todos</h1>
                    <input onChange={handleInputJob} value={job} className="new-todo" placeholder="What needs to be done?" data-reactid=".0.0.1"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleAddJob(e)
                            }
                        }
                        } />
                </header>
                <TodoDisplay statusJobs={statusJobs} />
                {jobs.length > 0 &&
                    <footer className="footer" data-reactid=".0.2">
                        <span className="todo-count" data-reactid=".0.2.0">
                            <strong data-reactid=".0.2.0.0">{jobsActive}</strong>
                            <span data-reactid=".0.2.0.1"> </span>
                            <span data-reactid=".0.2.0.2">items</span>
                            <span data-reactid=".0.2.0.3"> left</span></span>
                        <ul className="filters" data-reactid=".0.2.1">
                            <li onClick={handleSelectAll} data-reactid=".0.2.1.0">
                                <a className={statusJobs === 'All' ? "selected" : ''} data-reactid=".0.2.1.0.0">All</a></li>
                            <span data-reactid=".0.2.1.1"> </span>
                            <li onClick={handleSelectActive} data-reactid=".0.2.1.2">
                                <a className={statusJobs === 'Active' ? "selected" : ''} data-reactid=".0.2.1.2.0">Active</a></li>
                            <span data-reactid=".0.2.1.3"> </span>
                            <li onClick={handleSelectCompleted} data-reactid=".0.2.1.4">
                                <a className={statusJobs === 'Completed' ? "selected" : ''} data-reactid=".0.2.1.4.0">Completed</a>
                            </li>
                        </ul>
                        {jobsCompleted > 0 ? <button onClick={destroyAllCompleted} className="clear-completed" data-reactid=".0.2.2">Clear completed ({jobsCompleted})</button> : ''}
                    </footer>}
            </div>
        </section>
    );
}
export default TodoApp;