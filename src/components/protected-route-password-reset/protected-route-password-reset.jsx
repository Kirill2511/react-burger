import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const user = (state) => state.user;

const ProtectedRoutePasswordReset = ({ children, ...rest }) => {
  const { isLoggined } = useSelector(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggined || location.state?.from !== "/forgot-password" ? <Redirect to="/" /> : children
      }
    />
  );
};

export default ProtectedRoutePasswordReset;

ProtectedRoutePasswordReset.propTypes = {
  children: PropTypes.element.isRequired,
};
