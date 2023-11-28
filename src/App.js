import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const onChangeHandler = (e) => {
    setData(e.target.value);
  };

  const onClickHandler = () => {
    setDataArray([...dataArray, { text: data, completed: false }]);
    setData('');
  };

  const onDeleteHandler = (index) => {
    let newArray = [...dataArray];
    newArray.splice(index, 1);
    setDataArray(newArray);
  };

  const onToggleCompletion = (index) => {
    let newArray = [...dataArray];
    newArray[index] = { ...newArray[index], completed: !newArray[index].completed };
    setDataArray(newArray);
  };

  const filterArray = () => {
    switch (filterType) {
      case 'completed':
        return dataArray.filter((item) => item.completed);
      case 'uncompleted':
        return dataArray.filter((item) => !item.completed);
      default:
        return dataArray;
    }
  };

  return (
    <div>
      <h1>TODO List</h1>
      <input value={data} placeholder="Add Todos" onChange={(e) => onChangeHandler(e)} />
      <button onClick={onClickHandler}>Add</button>
      <br></br>
      <button onClick={() => setFilterType('all')}>All</button>
      <button onClick={() => setFilterType('completed')}>Completed</button>
      <button onClick={() => setFilterType('uncompleted')}>Uncomplete</button>
      <br></br>
      {filterArray().map((item, index) => (
        <div key={index}>
          <p style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.text}</p>
          <button onClick={() => onToggleCompletion(index)}>
            {item.completed ? 'Mark Uncomplete' : 'Mark Completed'}
          </button>
          <button onClick={() => onDeleteHandler(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
