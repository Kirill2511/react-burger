import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const user = (state) => state.user;

const ProtectedRouteAuth = ({ children, ...rest }) => {
  const { isLoggined } = useSelector(user);

  return (
    <Route
      {...rest}
      render={({ location }) => (isLoggined ? <Redirect to={location.state?.from?.pathname || "/"} /> : children)}
    />
  );
};

export default ProtectedRouteAuth;

ProtectedRouteAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
