import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({ 
  title = "Title", 
  description = "", 
  className, 
  children 
}) => (
  <div>
    <Menu />
    <div className="jumbotron text-center">
      <div className="transbox">
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      </div>      
    </div>

    <div className={className}>{children}</div>
  </div>
);

export default Layout; 