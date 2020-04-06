import React from 'react';
import { Link } from "react-router-dom";
export default function Header(props) {

return(
  <>
    {/*centered, site title + link*/}
    <Link to="/home" className="align-items-center">Arctic Plunder</Link>

    {/*newline, then the bottom links*/}
    <br/>
    <div className="align-items-center">
      <ul className="list-inline" style={{ display: "inline" }}>
        <li className="list-inline-item ">
          <Link to="/about">About</Link>
        </li>
        <li className="list-inline-item ">
          <Link to="/help">Help</Link>
        </li>
      </ul>
    </div>

    {/* logo */}
    
  </>
  );
}