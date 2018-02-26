import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import './Footer.scss';

const Footer = () => (
  <footer>
    <Paper className="footer">
      {'This '}
      <Link to="http://github.com/atoulous/green-tetris" target="_blank" title="app">
        <strong>app</strong>
      </Link>
      {' was made by '}
      <Link to="http://github.com/thifranc" target="_blank" title="Thibault François">
        <strong>thifranc</strong>
      </Link>
      {', '}
      <Link to="http://github.com/jmunozz" target="_blank" title="Jordan Munoz">
        <strong>jmunoz</strong>
      </Link>
      {' and '}
      <Link to="http://github.com/atoulous" target="_blank" title="Aymeric Toulouse">
        <strong>atoulous</strong>
      </Link>
      {' with React/Redux and Express.'}
    </Paper>
  </footer>
);

export default Footer;
