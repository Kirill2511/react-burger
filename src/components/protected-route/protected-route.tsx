import { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "../../utils/hooks";

interface IProtectedRoute {
  path?: string | string[];
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector((store) => store.sign);

  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
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
