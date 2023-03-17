import React, { useState, useRef, useEffect } from 'react';

export default function Table(props) {
    //removes duplicates before returning the users list
    const uniqueUsers = [...new Set(props.users.map(user => user.id))].map(id => {
        // console.log(props.user)
        return props.users.find(user => user.id === id);
    });
    return (
        <div>
         <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Bs</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.company.bs}</td>
                            <td><div className='centered'>
                            <button className="removeUser" onClick={() => props.onRemove(user.id)}>X</button>
                            </div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
