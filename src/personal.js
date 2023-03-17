import React, { useState, useRef, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function Personal(props) {
    const [res, setRes] = useState([]);
    const [users, setUsers] = useState([]);
    const [updated , setUpdated] = useState(false);
    const handleClick = () => {
        setUpdated(!updated);    
      } 

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error(error));
      }, []);
    
    useEffect(() => {
      if (users.length > 0 && props.name) {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if ((user.name.toLowerCase()).startsWith((props.name).toLowerCase())) {
            // pushes the name in "res" state variable which cant be updated with the setRes??????
            res.push([user.name, ": ", user.website]);
            console.log(res[res.length - 1])

            break;
          }
        }
      } 
    }, [props.name , res, users]);    

   
    return (
        <div>
          <Dialog open={updated}>
            <DialogTitle id="alert-dialog-title">User Details</DialogTitle>
            <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <table>
              {res[res.length - 1]}
              <tbody>
              <div>
              <h1>Users</h1>
          {users.map(user => (
              <div key={user.id}>
              <h2>{user.name}</h2>
              <div><h4 className='inLine'><u>Adress:</u></h4> <p className='inLine'>{user.address.street}</p>
              </div>
              </div>
               ))}
             </div>
              </tbody>
            </table>
              </DialogContentText>
                   </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClick} color="primary" autoFocus>
                  Close
                      </Button>
                     </DialogActions>
              </Dialog>
              <h3>Personal info for {props.name}  {updated}</h3>
              <div className='centered'>
              <Button variant="contained" 
              color="secondary" onClick={handleClick}>Read More</Button>
         </div>
      </div>
    );
}
