import React, { useState, useEffect } from 'react';
import './App.css';

import APIHelper from "./APIHelper";

function App() {
  const [groceries, setGroceries] = useState([]);
  const [inputGrocery, setInputGrocery] = useState("");

  useEffect(() => {
    const getGroceriesAndSetGroceries = async () => {
      const groceries = await APIHelper.getAllGroceries();
      setGroceries(groceries)
    };
    getGroceriesAndSetGroceries()
  });

  //Create new grocery function from user input
  const createGrocery = async (ev) => {
    ev.preventDefault();
    if(!inputGrocery) {
      //checks if the input grocery is empty
      alert("please enter new grocery")
      return
    }
    if(inputGrocery.some(({item}) => item === inputGrocery)) {
      //checks if the grocery already exists
      alert(`${inputGrocery} is already on your list!`)
      return
    }
    const newGrocery = await APIHelper.createGrocery(inputGrocery);
    setInputGrocery([...groceries, newGrocery]);
  }

  //Delete grocery function
  const deleteGrocery = async (ev, id) => {
    try {
      ev.stopPropagation();
      await APIHelper.deleteGrocery(id)
      setGroceries(groceries.filter(({_id: i}) => id !== i))
    } catch (err) {}
  };

  //Update groceries
  const updateGrocery = async (ev, id) => {
    ev.stopPropagation;
    const payload = {
      isPurchased: !groceries.find(item => item._id === id).isPurchased
    }
    const updatedGrocery = await APIHelper.updateGrocery(id, payload);
    setGroceries(groceries.map(item => (item._id === id ? updatedGrocery : item)))
  }

  return (
    <div className="App">
      <div>
        <input
          id="grocery-input"
          type="text"
          value={inputGrocery}
          onChange={({ target }) => setInputGrocery(target.value)}
        />
        <button
          type="button"
          onClick={createGrocery}
        >Add</button>
      </div>

      <ul>
        {groceries.map(({_id, item, isPurchased}, index) => (
          <li
            key={index}
            onClick={ev => updateGrocery(ev, _id)}
            className={isPurchased ? "purchased" : ""}
        >
          {item} <span onClick={ev => deleteGrocery(ev, _id)}>&times;</span>
        </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
