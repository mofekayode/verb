import React from 'react'
import './App.css';
import { Link} from "react-router-dom";
function Header() {
    return (
        <div className="header">
        <header className="app-header">
          <div  className='link'>
            <img src='https://media-exp1.licdn.com/dms/image/C4E0BAQFKdbBJ-9NRPA/company-logo_200_200/0/1553013203712?e=2159024400&v=beta&t=2NhOPVbgO3K8HZr_LSb9CISS5oSvma_lqvTTXb8Ghn0' className="WebLogo" alt="Website-logo" />
          </div>
          {/* <Link to='/'> */}
          <div className='data'>Graph</div>
          {/* </Link> */}
          
      
        </header>
  
      </div>
    )
}

export default Header
