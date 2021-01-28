import React, { useState } from 'react';

const App = () => {
  const [list, setList] = useState([]);
  const [formText, setFormText] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // add
  // delete
  // complete
  // tick them off when they're done
  // edit

  const addTask = (e) => {
    e.preventDefault()
    const task = {
      id: Math.random(),
      text: formText,
      isComplete: false
    }
    // trim gets rid of white spaces
    if (formText.trim() !== '') {
      setList([...list, task])
      setErrMsg('')
      setFormText('')
    } else {
      setErrMsg('Invalid input')
    }
  }

  const handleChange = (e) => {
    setFormText(e.target.value)
  }

  const completeTask = (id) => {
    const taskIndex = list.findIndex(task => id === task.id)
    const newList = [...list]
    newList[taskIndex] = {
      ...newList[taskIndex],
      isComplete: true
    }
    setList(newList)
  }

  console.log(list)

  return (
    <div>
      <div>
        <h1>TO-DO</h1>
      </div>
      <div>
        <form onSubmit={addTask}>
          <label>New Task:</label>
          <input type="text" name="name" value={formText} onChange={handleChange}/>
          <button>Add Task</button>
        </form>
      </div>

      <div>
        <ul>
        {list.map(task => {
          // () => to callback the function so it only runs onClick
          return <li className={task.isComplete ? 'task' : '' } key={task.id} onClick={() => completeTask(task.id)}>
            {task.text}
            </li>
        })}
        </ul>
        <h2>{errMsg}</h2>
      </div>

    </div>
  );
};

export default App;
