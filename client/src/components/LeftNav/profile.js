import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

const LeftNav = () => { 
  return(
    <div className="Card LeftNav_Card">
      <ul className='leftNav'>
      <NavLink activeStyle={{ color: 'Teal' }} to="/profile"><li>  <i className="material-icons">person</i> Posts </li> </NavLink>
      <NavLink activeStyle={{ color: 'Teal' }} to="/profile/galleries"><li>  <i className="material-icons">collections</i> Life Highlights </li> </NavLink>
      <NavLink activeStyle={{ color: 'Teal' }} to="/profile/recipies"><li>  <i className="material-icons">fastfood</i> Recipies </li> </NavLink>
      <NavLink activeStyle={{ color: 'Teal' }} to="/profile/tree"><li>  <i className="material-icons">device_hub</i> Family Tree </li> </NavLink>
      <NavLink activeStyle={{ color: 'Teal' }} to="/profile/health-watch"> <li> <i className="material-icons">local_hospital</i> Health Watch</li></NavLink>
      </ul>
  </div>
  )
};

export default LeftNav; 



