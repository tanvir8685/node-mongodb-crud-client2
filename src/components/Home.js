import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users=useLoaderData();
    const [displayUsers,setDisplayUsers]=useState(users);
    const handleDelete=_id=>{
        const agree=window.confirm('are you sure');
        if(agree){
        // 
        fetch(`http://localhost:5000/users/${_id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.deletedCount>0){
                alert('user deleted succsessfully')
                console.log(displayUsers)
                const remainingUsers=displayUsers.filter(usr=>usr._id!==_id);
                setDisplayUsers(remainingUsers)
            }
        });
        
    }

    }
    return (
        <div>
            <h2>users:{displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user=> <p key={user._id}>{user.name} {user.email}
                    <Link to={`/update/${user._id}`}><button>Update</button></Link> <button onClick={()=>handleDelete(user._id)}>X</button></p>)
                }
            </div>
            <Link to='/users/add'> <button>Add user</button>  </Link>
        </div>
    );
};

export default Home;