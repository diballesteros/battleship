import React from 'react';
import './Notification.css';

const Notification = (props) => (
    <div className='notification'>
        {props.children}
    </div>
);

export default Notification;
