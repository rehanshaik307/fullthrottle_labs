import React from 'react';
import './Users.css';

function Users(props) {

    return (
        <div className="flex">
            {props.usernames}
        </div>
    )
}

export default Users;