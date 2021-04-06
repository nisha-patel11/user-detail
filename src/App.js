import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./container/user/Login";
import UserDetail from "./container/user/UserDetail";
import EditUser from "./container/user/EditUser";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("isLogin") ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute
              exact={true}
              path="/user-detail"
              component={UserDetail}
            />
            <PrivateRoute exact={true} path="/edit-user" component={EditUser} />
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
