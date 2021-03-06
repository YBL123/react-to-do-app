import React, { useState, useEffect } from 'react';
import Home from './Home';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [list, setList] = useState([]);
  const [formText, setFormText] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [activeTask, setActiveTask] = useState({});
  const [edit, setEdit] = useState(false);

  // add V
  // delete V
  // complete -> prints completed tasks, tasks left to complete
  // tick them off when they're done V
  // edit V
  // store list in local storage + retrieve data on page mount V
  //get locally sored data on page load V

  useEffect(() => {
    const data = localStorage.getItem('list');
    setList(JSON.parse(data));
  }, []);

  console.log('task', list);

  const addTask = (e) => {
    e.preventDefault();
    if (!edit) {
      const task = {
        id: Math.random().toString(),
        text: formText,
        isComplete: false,
      };
      // trim gets rid of white spaces
      if (formText.trim() !== '') {
        setList([...list, task]);

        //local storage
        localStorage.setItem('list', JSON.stringify(list));

        setErrMsg('');
        setFormText('');
      } else {
        setErrMsg('Invalid input');
      }
    } else if (edit) {
      setList(
        list.map((task) =>
          task.id === activeTask.id ? { ...task, text: formText } : task
        )
      );
      setEdit(!edit);
      localStorage.setItem(
        'list',
        JSON.stringify(
          list.map((task) =>
            task.id === activeTask.id ? { ...task, text: formText } : task
          )
        )
      );
    }
  };
  const handleChange = (e) => {
    setFormText(e.target.value);
  };

  const completeTask = (id) => {
    console.log('complete');
    const taskIndex = list.findIndex((task) => id === task.id);
    const newList = [...list];
    newList[taskIndex] = {
      ...newList[taskIndex],
      isComplete: true,
    };
    setList(newList);
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
    localStorage.setItem(
      'list',
      JSON.stringify(list.filter((item) => item.id !== id))
    );
  };

  const editTask = (task) => {
    setActiveTask(task);
    setEdit(!edit);
    setFormText(task.text);
  };

  return (
    <section>
      <Row>
        <Col>
          <Container className="container">
            <div className="title-div">
              <Home title="To-Do" />
            </div>
            <div className="card">
              <form onSubmit={addTask}>
                <label>New Task:</label>
                <input
                  type="text"
                  name="name"
                  value={formText}
                  onChange={handleChange}
                />
                <button className="">Add Task</button>
              </form>
            </div>

            <div>
              <ul>
                {list.map((task) => {
                  // () => to callback the function so it only runs onClick
                  return (
                    <li className={task.isComplete ? 'task' : ''} key={task.id}>
                      {task.text}
                      <button onClick={() => completeTask(task.id)}>
                        Complete Task
                      </button>
                      <button onClick={() => editTask(task)}>Edit Task</button>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete Task
                      </button>
                    </li>
                  );
                })}
              </ul>
              <h2>{errMsg}</h2>
            </div>
          </Container>
        </Col>
      </Row>
    </section>
  );
};

export default App;
