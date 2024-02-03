import { useEffect, useState } from 'react';
import './App.css';
import Form from './Components/Form';
import Tasks from './Components/Tasks';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:5050/tasks");
      const data = await res.json();
      return data;
    };
  
    const fetchData = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
  
    fetchData();
  }, []);


  //Task update
  const onComplete = async (id) => {
    //Update UI without waiting for backend
    setTasks(tasks?.map((task) => ({
      ...task,
      complete: task.id === id ? !task.complete : task.complete
    })));

    //update backend data
    try {
      const getTask = await fetch(`http://localhost:5050/tasks/${id}`)
      const tasksData = await getTask.json();

      const updateComplete = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({complete: !tasksData.complete})
      })
    } catch (error) {
      // Handle any fetch errors or backend failures
      console.error("Error updating tasks:", error);
      // Revert the UI change if failed to update backend
      setTasks(tasks?.map((task) => ({
        ...task,
        complete: task.id === id ? !task.complete : task.complete
      })));
    }
  }

  const onReminder = async(id) => {
    setTasks(tasks.map((task) => ({
      ...task,
      reminder: task.id === id ? !task.reminder : task.reminder
    })));

    //update backend data
    try {
      const getTask = await fetch(`https://brandmoredev.github.io/todo-app-react/tasks/${id}`)
      const tasksData = await getTask.json();

      await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({reminder: !tasksData.reminder})
      })
    } catch (error) {
      // Handle any fetch errors or backend failures
      console.error("Error updating tasks:", error);
      // Revert the UI change if failed to update backend
      setTasks(tasks?.map((task) => ({
        ...task,
        reminder: task.id === id ? !task.reminder : task.reminder
      })));
    }
  }
  

  const addTask = async({ title, reminder }) => {
    //Update backend data
    const postTask = await fetch(`http://localhost:5050/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, reminder, complete: false})
    })
    const data = await postTask.json()

    //Update UI
    setTasks([...tasks, {
      ...data
    }])
  }

  const deleteTask = async(id) => {
    //Update backend data
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    
    //Update UI
    setTasks(tasks.filter(task => {
      return task.id !== id
    }))
  }


  return (
    <div className='app'>
      <div className='header'>
        <h1>Task Tracker</h1>
        <button
          className='btn btn-new'
          onClick={() => setShowForm(!showForm)}
        >{showForm ? 'Close' : 'New Task'}</button>
      </div>
      { showForm && <Form addTask={addTask} /> }
      <Tasks
        tasks={tasks}
        onComplete={onComplete}
        onReminder={onReminder}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
