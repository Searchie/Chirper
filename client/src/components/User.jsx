import React from 'react';
import Avatar from './Avatar';


const User = (props) => {
    return( 
        <div id="user" className="col-3 border-right border-dark text-center p-r-1">
            <Avatar avatarUrl = {props.avatarUrl} />
            <h5>{props.username}</h5> 
        </div>
    );
}

User.defaultProps = {
    username: 'Anonymous'
};

export default User;