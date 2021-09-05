import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const user = (state) => state.user;

const ProtectedRouteProfile = ({ children, ...rest }) => {
  const { isLoggined, name } = useSelector(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggined || name ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
};

export default ProtectedRouteProfile;

ProtectedRouteProfile.propTypes = {
  children: PropTypes.element.isRequired,
};
