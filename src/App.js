import React, { useState, useEffect } from 'react';
import react from '../src/react.jpg';
import Table from './Table';
import Personal from './personal';
import Navbar from './navbar.js';
import InputField from './Input.js';

function TicTacToe() {
  const [name, setName] = useState();
  const [isShown, setIsShown] = useState(false);
  const [btnIsShown, setBtnIsShown] = useState(false);
  const [dt, setDt] = useState(new Date().toLocaleString());
  const [updatedName, setUpdatedName] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users , setUsers] = useState([]);
  const [tempUsers , setTempUsers] = useState([]);


  useEffect(() => {
      let secTimer = setInterval( () => {
        setDt(new Date().toLocaleString())
      },1000)
      return () => clearInterval(secTimer);
}, []);

  const handleClick = e => {
    setIsShown(!isShown);
    if(btnIsShown) {
      setBtnIsShown(false);
    }
  };

  const handleBtnClick = e => {
    setBtnIsShown(!btnIsShown);
    if(isShown) {
      setIsShown(false);
    }
  };

  const handleNameChange = (newName) => {
    setUpdatedName(newName);
  };

  useEffect(() => {
    if (selectedUser && !users.includes(selectedUser)) {
      const updatedUsers = [...users];
      updatedUsers.push(selectedUser)
      setUsers(updatedUsers);
    } 
  }, [selectedUser]);

  useEffect (() => {
    if(users.length >= 1) {
      //logs users!!!!!!!!!
      console.log(users);
    }
  }, [users]);

  const handleRemove = (id) => {
    var my_id = id
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => setTempUsers(data));
    alert(`You deleted: ${tempUsers.find(u => u.id === my_id).name}`)
    setUsers(users.filter((users) => users.id !== id));
    };

  return (
  <div className='navbar'>
      <Navbar setSelectedUser={setSelectedUser}></Navbar>
  <div className='container'>

  <div className='name'>
    <img className='react' src={react} alt="React"></img> 
    <h2> Hello enter a user's name</h2>

    <InputField value={name} onChange={(e) => setName(e.target.value)}/>
      <div style={{ display: 'none' }}>

      {/*React reads the first truthy value */}
      <Personal name={updatedName || name} onNameChange={handleNameChange}/>
      </div>
        <div className='buttons'>
           <div className='flexible'>
                <button className='btn'
                onClick={handleClick}> {name} Favourite Users</button>
                {isShown && <Table users={users || null} onRemove={handleRemove}/>}
            </div> 
            <div className='flexible'>
                <button className='btn'
                onClick={handleBtnClick}> personal info</button>
                {btnIsShown && <Personal name={updatedName || name} onNameChange={handleNameChange}/>}
            </div>    
        </div>
     </div>
    </div>
  <div className='footer'>
  <h3>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</h3>
  </div>
  </div>  
  );
}

export default TicTacToe;