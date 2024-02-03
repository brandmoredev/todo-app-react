import { useState } from "react";

const Form = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()
    if (task.trim().length === 0) return alert('You need to add a task')
    addTask({ title: task, reminder})
    setTask('');
    setReminder(false);
  }

  return (
    <form className='new-item-form'>
      <div className='form-row'>
        <label htmlFor='item'>New Task</label>
        <input type='text'
          id='new-item' 
          autoFocus
          value={task}
          onChange={e => setTask(e.target.value)}
        ></input>
        <div>
          <input type='checkbox' id='reminder-box' checked={reminder} onChange={() => setReminder(!reminder)}/>
          <label htmlFor='reminder-box'>Mark this task as a reminder</label>
        </div>
      </div>
      <button className='btn add-btn' onClick={onSubmit}>Add</button>
    </form>
  )
}

export default Form;
