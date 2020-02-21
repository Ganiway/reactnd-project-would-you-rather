import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';
import AuthedRoutes from './AuthedRoutes';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, loadingBar } = this.props;

    if (loadingBar.default === undefined || loadingBar.default === 1) {
      return (<LoadingBar className="loading" />);
    } else {
      return <Fragment><div className="App">{!authedUser ? <Login /> : <AuthedRoutes />}</div></Fragment>;
    }
  }
}

function mapStateToProps({ authedUser, loadingBar }) {
  return {
    authedUser,
    loadingBar
  };
}

export default connect(mapStateToProps)(App);
