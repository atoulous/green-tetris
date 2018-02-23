import React from 'react';
import Paper from 'material-ui/Paper';

import Nav from '../Nav/Nav';
import Footer from './Footer/Footer';

const Header = () => (
  <Nav />
);

const Layout = props => (
  <div>
    <Header />
    <Paper>{props.children}</Paper>
    <Footer />
  </div>
);

export default Layout;

