import { current } from '@reduxjs/toolkit';
import React, { memo, useEffect, useState } from 'react';

const TodoDisplay = (props) => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [prevIndex, setPrevIndex] = useState(null);
    const [checkValue, setCheckValue] = useState(false)
    const { jobs, statusJobs, handleCompleteJob, handleDestroy, handleCompleteAll, handleEdit, changeAnyJob, handleEmptyJob } = props

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
        if (checkValue) {
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
    const handleEdit1 = (e, index) => {
        if (e.key === "Enter") {
            if (jobs[index].value === '') {
                handleEmptyJob(index)
            }
            setCurrentIndex(null);
        }
    }
    const handleDblClick = (index) => {
        setCurrentIndex(index);
        setPrevIndex(index)
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
                                    checked={job.status === 'active' ? false : true}
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
