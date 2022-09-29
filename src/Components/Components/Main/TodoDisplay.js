import React, { memo, useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import { editJob, deleteJob } from '../../../features/jobs/jobsSlice';
import { editJob, deleteJob, editStatusJob, allToCompleted, allToActive } from '../../../features/jobs/jobsSlice';
import { incrementedActive, decrementedActive, activeAll, allOutActive } from '../../../features/jobs/jobsActiveSlice';
import { incrementedCompleted, decrementedCompleted, completedAll, allOutCompleted } from '../../../features/jobs/jobsCompletedSlice'
const TodoDisplay = (props) => {
    const { statusJobs } = props

    const jobs = useSelector((state) => state.jobs.jobs)
    const [currentIndex, setCurrentIndex] = useState(null);
    const [prevIndex, setPrevIndex] = useState(null);
    const [checkValue, setCheckValue] = useState(false)
    const [checkAllToCompleted, setCheckAllToCompleted] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("label-todo") || event.target.classList.contains("edit")) {
                setCheckValue(false)
                return;
            }
            setCheckValue(true)
            setCurrentIndex(null);
        });
        return () => { };
    }, []);

    useEffect(() => {
        if (checkValue && prevIndex) {
            // console.log(prevIndex)
            try {
                if(jobs[prevIndex].value === ''){
                    
                    handleEmptyJob(prevIndex)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [prevIndex, checkValue])
    const handleEdit = (e, index) => {
        dispatch(editJob({
            index: index,
            value: e.target.value
        }))
    }
    const handleEdit1 = (e, index) => {
        if (e.key === "Enter") {
            if (jobs[index].value === '') {
                handleEmptyJob(index)
            }
            setCurrentIndex(null);
        }
    }
    const handleEmptyJob = (index) => {
        dispatch(deleteJob(index))
        // const clone = [...jobs];
        // clone.splice(index, 1);
        // setJobs(clone)
    }
    const handleDblClick = (index) => {
        setCurrentIndex(index);
        setPrevIndex(index)
    }
    const handleDestroy = (index) => {
        dispatch(deleteJob(index))
    }
    const changeChecked = () => {}
    const handleCompleteJob = (status, index) => {
        const action = {
            index: index,
            status: status
        }
        dispatch(editStatusJob(action))
        if (status === 'active') {
            dispatch(decrementedActive())
        } else {
            dispatch(incrementedActive())
        }
        if (status === 'completed') {
            dispatch(decrementedCompleted())
        } else {
            dispatch(incrementedCompleted())
        }
    }
    const handleCompleteAll = () => {
        console.log('handled')
        if (checkAllToCompleted) {
            const action = {
                value: jobs.length
            }
            dispatch(allToCompleted())
            dispatch(completedAll(action))
            dispatch(allOutActive())
        }
        if (!checkAllToCompleted) {
            const action = {
                value: jobs.length
            }
            dispatch(allToActive())
            dispatch(allOutCompleted())
            dispatch(activeAll(action))
        }
        setCheckAllToCompleted(!checkAllToCompleted)
    }
    return (
        <>
            <section className="main" data-reactid=".0.1">
                <input id="toggle-all" className="toggle-all" type="checkbox" data-reactid=".0.1.0" />
                {jobs.length > 0 ? <label htmlFor="toggle-all" onClick={handleCompleteAll} data-reactid=".0.1.1">Mark all as complete</label> : ''}
                <ul className="todo-list" data-reactid=".0.1.2">
                    {statusJobs === 'All' && jobs.map((job, index) => (
                        <li key={index} className={job.status === 'completed' ? 'job-item text-completed' : 'job-item '} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722">
                            <div className="view" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0">
                                <input className="toggle" onClick={() => handleCompleteJob(job.status, index)} type="checkbox"
                                    checked={job.status === 'active' ? false : true} onChange={() => changeChecked}
                                    data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.0" />
                                {
                                    currentIndex !== index && <label className='label-todo' onDoubleClick={() => handleDblClick(index)} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.1">
                                        {job.value}
                                    </label>
                                }
                                <button className="destroy" onClick={() => handleDestroy(index)} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.2">
                                </button>
                            </div>
                            {
                                currentIndex === index && <input className="edit" onKeyPress={(e) => handleEdit1(e, index)} onChange={(e) => handleEdit(e, index)}
                                    value={job.value} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.1" />
                            }
                        </li>
                    ))}
                    {statusJobs === 'Active' &&
                        jobs.filter(job => job.status === 'active').map((job, index) => (
                            <li key={index} onMouse className="" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722">
                                <div className="view" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0">
                                    <input className="toggle" onClick={() => handleCompleteJob(job.status, index)} type="checkbox" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.0" />
                                    <label className='label-todo' data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.1">{job.value}</label>
                                    <button className="destroy" onClick={() => handleDestroy(index)} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.2">
                                    </button>
                                </div>
                                {/* <input className="edit" defaultValue={job.value} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.1" /> */}
                            </li>
                        ))}
                    {statusJobs === 'Completed' &&
                        jobs.filter(job => job.status === 'completed').map((job, index) => (
                            <li key={index} className="text-completed" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722">
                                <div className="view" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0">
                                    <input className="toggle" checked onClick={() => handleCompleteJob(job.status, index)} type="checkbox" data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.0" />
                                    <label className='label-todo' data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.1">{job.value}</label>
                                    <button className="destroy" onClick={() => handleDestroy(index)} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.0.2">
                                    </button>
                                </div>
                                {/* <input class="edit" defaultValue={job.value} data-reactid=".0.1.2.$af0f8169-b300-41a2-8db0-71ebfdf80722.1" /> */}
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    );
}

export default memo(TodoDisplay);