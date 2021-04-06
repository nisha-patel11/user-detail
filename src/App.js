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
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/user-detail"
              render={() =>
                localStorage.getItem("isLogin") ? (
                  <Route component={UserDetail} />
                ) : (
                  <Redirect to={Login} />
                )
              }
            />
            <Route
              exact
              path="/edit-user"
              render={() =>
                localStorage.getItem("isLogin") ? (
                  <Route component={EditUser} />
                ) : (
                  <Redirect to={Login} />
                )
              }
            />
            {/* <Route path="/edit-user" component={EditUser} /> */}
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
