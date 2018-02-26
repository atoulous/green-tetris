import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = props => (
  <div>
    <Header />
    <main>
      {props.children}
    </main>
    <Footer />
  </div>
);

export default Layout;

