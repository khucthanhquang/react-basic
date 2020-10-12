import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import firebase from 'firebase';
import 'mdbreact/dist/css/mdb.css';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { getAllUser, userLogin, userSignup } from './features/Auth/authSlice';



// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

const LayoutAdmin = React.lazy(() => import('./features/Admin/layout.jsx'));
const LayoutMain = React.lazy(() => import('./features/Main/layout.jsx'));
// const Auth = React.lazy(() => import('./features/Auth/pages/LoginPage'));

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  // Get all dataUser
  useEffect(() => {
    const getAllUserFunc = async () => {
      await dispatch(getAllUser())
    }
    getAllUserFunc()
  }, [])
  const allUser = useSelector(state => state.auth.users);




  // Handle FireBase Change
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User not login !")
        // user log out, handle something here
        return;
      }
      console.log("Logged in user: ", user.displayName)

      const token = await user.getIdToken();

      console.log("Token: ", token);

      const result = allUser.findIndex(x => x.email == user.email);
      if (result !== -1) {
        dispatch(userLogin(allUser[result]))
      } else {
        dispatch(userSignup(
          {
            email: user.email,
            displayName: user.displayName,
            amount: 0
          }
        ))
      }
    })
    return () => unregisterAuthObserver();
  }, [allUser])


  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <Route path="/admin/:path?/:path?" exact component={LayoutAdmin}></Route>
          {/* <Redirect exact from="/admin" to="/login" /> */}
          <Route component={LayoutMain} ></Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
