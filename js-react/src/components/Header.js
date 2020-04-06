import React from 'react';
import { Link } from "react-router-dom";

export default function Header(props) {

return(
  <>
  <center>
    {/*centered, site title + link*/}
    <Link to="/home" className="text-white align-items-center">Arctic Plunder</Link>

    {/*newline, then the bottom links*/}
    <br/>
    <div className="align-items-center">
      <ul className="list-inline" style={{ display: "inline" }}>
        <li className="list-inline-item text-white">
          <Link to="/about" className="text-white">About</Link>
        </li>
        <li className="list-inline-item text-white">
          <Link to="/help" className="text-white">Help</Link>
        </li>
      </ul>
    </div>

</center>
</>);
}