import React from 'react';
import { Link } from 'react-router-dom';

export default ({ close }) => (
    <div className="menu">
        <Link style={{color: "white"}} className='menulink' to='/' onClick={close}>home</Link>
        <Link style={{color: "white"}} className='menulink' to='/setalert' onClick={close}>set an alert</Link>
        <Link style={{color: "white"}} className='menulink' to='/checklist' onClick={close}>trip checklist</Link>
        <Link style={{color: "white"}} className='menulink' to='resources' onClick={close}>resources</Link>
    </div>
  );