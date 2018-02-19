import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


import RTCTest from '../../containers/RTCtest/RTCTest';

import './Home.scss';

const Home = () => (
  <div className="container">
    <div className="container-menu">
      <ul id="home-menu">
        <li>
          <Link to="/games/solo">
            <RaisedButton label="SOLO" fullWidth />
          </Link>
        </li>
        <li>
          <Link to="/games">
            <RaisedButton label="MULTIPLAYERS" fullWidth />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Home;
