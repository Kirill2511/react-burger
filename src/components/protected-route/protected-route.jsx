import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { getSing } from "../../redux/selectors";

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector(getSing);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
