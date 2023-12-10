import React from 'react';
import {Form} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './schedule.css';
import { addUserTask } from '../../api.js';

export default function Schedule(){

    const [subtask, setSubtask] = React.useState([""]);
    const [date, onChangeDate] = React.useState(new Date());

    function addSubTaskClickHandler(){
        setSubtask([...subtask, ""]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        console.log(e.target.minute.value);

        const taskFormData = {
            id: 1,
            date: `${year}-${month}-${day}`,
            time: `${e.target.hour.value}: ${e.target.minute.value}-${e.target.ampm.value}:`,
            taskName: e.target.taskName.value,
            taskDescription: e.target.taskDescription.value
        };

        const response = await addUserTask(taskFormData);
    }

    return(
        <section className=''>
            <div className='schedule-container flex flex-column'>
                <div className='task-tab'>
                    <button>Personal</button>
                    <button>Work</button>
                </div>
                <div className='day-button-container'>
                    <button>M</button>
                    <button>T</button>
                    <button>W</button>
                    <button>TH</button>
                    <button>F</button>
                    <button>SA</button>
                    <button>SU</button>
                </div>
                <div>
                    <div className='flex day-info-container'>
                        <h2 className='mp-0'>Wednesday</h2>
                        <button className='mp-0'>^</button>
                    </div>
                    <p className='mp-0 current-date'>Nov 3, 2023</p>
                </div>
                <hr/>
            </div>
            <button className='add-task-btn'>+</button>
            <div className='add-task-container flex flex-column ja-center'>
                    < form method='post' onSubmit={handleSubmit} className='flex flex-column task-form'>
                        <div className='task-input-container'>
                            <h2>Add Task</h2>
                            <Calendar onChange={onChangeDate} value={date} />
                            <div className='flex'>
                                <label for ="time">Time: </label>
                                <input type='number' name='hour' min='1' max='12' required />
                                :
                                <input type='number' name='minute' min='0' max='60' required />
                                <select id='ampm' name='ampm'>
                                    <option value='am'>AM</option>
                                    <option value='pm'>PM</option>
                                </select>
                            </div>

                            <Input 
                                label='Task:'
                                for='taskName' 
                                name='taskName' 
                                type='text'/>
                            <div className='flex'>
                                <label for='taskDescription'>Description:</label>
                                <textarea rows='8' col = '100' name='taskDescription' placeholder='Enter Task Description '/>
                            </div>
                            <hr/>
                            <h3>Add Subtask</h3>

                            <Input 
                                label='Name:'
                                for='subtask-1' 
                                name='subtask-1' 
                                type='text'/>
                            <div className='flex'>
                                <label for='subtask-task-1'>Sub-Task:</label>
                                <div className='flex flex-column'>

                                    { subtask.map((st, index) => {
                                        return <input type='text' name={`subtask-task-$(index)`} />
                                    }) }
                                    
                                    <button type='button' onClick={addSubTaskClickHandler}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className='control-buttons'>
                            <button type='submit'>ADD</button>
                            <button type='button'>CANCEL</button>
                        </div>
                    </form>
                </div>
        </section>
    )
}

function Input(prop){
    return(
        <div>
            <label 
                for={prop.for}
            >
                {prop.label}
            </label>
            <input 
                type={prop.type}
                name={prop.name}
                id={prop.id}/>
        </div>
    )
}