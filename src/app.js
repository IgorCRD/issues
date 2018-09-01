import React from 'react';
import PropTypes from 'prop-types';

const App = ({ appName }) => <div>{appName}</div>;

App.propTypes = {
  appName: PropTypes.string,
};

App.defaultProps = {
  appName: '',
};

export default App;
