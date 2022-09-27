import React, { useState, useEffect } from 'react';
import TodoDisplay from './TodoDisplay';
import FooterDisplay from './FooterDisplay';
import { uid } from 'uid'
import './Main.css'

const TodoApp = () => {

    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('react-todos')) || []);
    const [statusJobs, setStatusJobs] = useState('All');
    const [jobActives, setJobActives] = useState(0);
    const [jobCompleteds, setJobCompleteds] = useState(0);
    const [changeAnyJob, setChangeAnyJob] = useState(false)
    const handleInputJob = (e) => {
        setJob(e.target.value)
    }
    const [allToCompleted, setAllToCompleted] = useState(false)
    const handleAddJob = () => {
        job && setJobs([...jobs, { id: uid(32), status: 'active', value: job }])
        setJob('')
    }
    useEffect(() => {
        jobs.length !== 0 && localStorage.setItem('react-todos', JSON.stringify(jobs))
        jobs.length === 0 && localStorage.removeItem('react-todos')

    }, [jobs, jobActives, jobCompleteds, changeAnyJob]);
    const handleCompleteJob = (status, index) => {
        jobs[index].status = status === 'active' ? 'completed' : 'active';
        if (status === 'active') {
            setJobActives(jobActives - 1);
        } else {
            setJobActives(jobActives + 1);
        }
        if (status === 'completed') {
            setJobCompleteds(jobCompleteds - 1);
        } else {
            setJobCompleteds(jobCompleteds + 1);
        }
    }
    useEffect(() => {
        setJobActives(jobs.filter(job => job.status === 'active').length)
        setJobCompleteds(jobs.filter(job => job.status === 'completed').length)
    }, [jobs, allToCompleted]);
    const handleSelectAll = () => {
        setStatusJobs('All');
    }
    const handleSelectActive = () => {
        setStatusJobs('Active')
    }
    const handleSelectCompleted = () => {
        setStatusJobs('Completed')
    }
    const handleDestroy = (index) => {
        if (jobs[index].status === 'completed') {
            setJobCompleteds(jobCompleteds - 1)
        } else {
            setJobActives(jobActives - 1);
        }
        jobs.splice(index, 1)
        setChangeAnyJob(!changeAnyJob)
    }
    const destroyAllCompleted = () => {
        const jobsRemoved = jobs.filter((job) => {
            return job.status !== 'completed'
        })
        setJobs(jobsRemoved)
        setJobCompleteds(0)
        console.log('removed')
        // setChangeAnyJob(!changeAnyJob)
    }
    const handleEdit = (e, index) => {
        const clone = [...jobs];
        if (e.key === "Enter") {
            const element = document.getElementsByClassName('edit')[index]
            element.style.display = 'none'
            document.getElementsByClassName('label-todo')[index].style.display = 'block'
            const jobElement = document.getElementsByClassName('job-item ')[index]
            jobElement.className = jobElement.className.replace(' editing', '')
            setChangeAnyJob(!changeAnyJob)
        }

        clone[index].value = e.target.value;
        setJobs(clone);

    }
    const handleCompleteAll = () => {
        allToCompleted && jobs.map((job, index) => {
            // jobs[index].status = 'completed'
            job.status = 'completed'
        })

        !allToCompleted && jobs.map((job, index) => {
            // jobs[index].status = 'completed'
            job.status = 'active'
        })
        setAllToCompleted(!allToCompleted)
        setJobCompleteds(jobs.length)
        setJobActives(0);
    }
    const handleEmptyJob = (index) => {
        const clone = [...jobs];
        clone.splice(index, 1);
        setJobs(clone)
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
                <TodoDisplay jobs={jobs} statusJobs={statusJobs} handleCompleteJob={handleCompleteJob}
                    handleDestroy={handleDestroy} handleCompleteAll={handleCompleteAll}
                    handleEdit={handleEdit} changeAnyJob={changeAnyJob} handleEmptyJob={handleEmptyJob}/>
                {jobs.length > 0 &&
                    <footer className="footer" data-reactid=".0.2">
                        <span className="todo-count" data-reactid=".0.2.0">
                            <strong data-reactid=".0.2.0.0">{jobActives}</strong>
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
                        {jobCompleteds > 0 ? <button onClick={destroyAllCompleted} className="clear-completed" data-reactid=".0.2.2">Clear completed ({jobCompleteds})</button> : ''}
                    </footer>}
            </div>
        </section>
    );
}

export default TodoApp;