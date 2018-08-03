import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

class RecordRoute extends Component {
  // static propTypes = {};

  // constructor(props) {
  //   super(props);
  //   this.starTtime = 0;
  // }

  componentDidMount() {
    // this.starTtime = +new Date();
  }

  componentWillUnmount() {}

  render() {
    return <Route {...this.props} />;
  }
}

const PrivateRoute = ({ component: RouteComponent, loggedIn = true, protect, ...rest }) => (
  <RecordRoute
    {...rest}
    render={props =>
      loggedIn || !protect ? (
        <RouteComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  loggedIn: PropTypes.bool,
  protect: PropTypes.bool,
};

export { PrivateRoute, RecordRoute };
