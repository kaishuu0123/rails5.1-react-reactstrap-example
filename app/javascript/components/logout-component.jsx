import React from 'react';
import { Redirect } from 'react-router'

class LogoutComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}

export default LogoutComponent;