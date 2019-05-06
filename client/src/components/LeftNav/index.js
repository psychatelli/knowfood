import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

const LeftNav = () => { 
  return(
    <div className="Card LeftNav_Card">
      <ul className='leftNav'>
          <NavLink activeStyle={{ color: 'Teal' }} to="/public-profile"><li>  <i className="material-icons">person</i> Posts </li> </NavLink>
          <NavLink activeStyle={{ color: 'Teal' }} to="/galleries"><li>  <i className="material-icons">collections</i> Life Highlights </li> </NavLink>
          <NavLink activeStyle={{ color: 'Teal' }} to="/recipies"><li>  <i className="material-icons">fastfood</i> Recipies </li> </NavLink>
          <NavLink activeStyle={{ color: 'Teal' }} to="/tree"><li>  <i className="material-icons">device_hub</i> Family Tree </li> </NavLink>
          <NavLink activeStyle={{ color: 'Teal' }} to="/health-watch"> <li> <i className="material-icons">local_hospital</i> Health Watch</li></NavLink>
      </ul>
  </div>
  )
};

export default LeftNav; 



