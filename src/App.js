import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';


// Lazy load - Code splitting
const LayoutAdmin = React.lazy(() => import('./features/Admin/layout.jsx'));
const LayoutMain = React.lazy(() => import('./features/Main/layout.jsx'));
const Auth = React.lazy(() => import('./features/Auth'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <Route path="/admin/:path?/:path?" exact component={LayoutAdmin}>

          </Route>
          {/* <Redirect exact from="/admin" to="/login" /> */}

          <Route component={LayoutMain} >

          </Route>

          <Route path="/auth" component={Auth} >

          </Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
