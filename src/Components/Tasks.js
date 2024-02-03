import { IconContext } from "react-icons";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineNotifications } from "react-icons/md";

const Tasks = ({ tasks, onComplete, onReminder, onDelete}) => {
  return (
    <>
      <h3 className='list-header'>Task List</h3>
      { tasks?.length === 0 ? 'No task to display' :
        <ul className='list'>
          {tasks?.map(task => {
            return (
              <li
                key= {task.id}
                className={`list-item ${task.reminder && 'reminder'} ${task.complete && 'complete'}`}
                onClick={() => onComplete(task.id)}
              >
                <span>{task.title}</span>
                <div onClick={e => e.stopPropagation()}>
                  <IconContext.Provider value={{ className: 'remember-icon' }}>
                    <MdOutlineNotifications onClick={() => onReminder(task.id)}/>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: 'delete-icon' }}>
                    <CiCircleRemove onClick={() => onDelete(task.id)}/>
                  </IconContext.Provider>
                </div>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}

export default Tasks;
