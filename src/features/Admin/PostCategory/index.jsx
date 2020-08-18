import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../../components/NotFound';

import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';


function Photo(props) {
    const match = useRouteMatch();
    // console.log({ match });
    return (
        <Switch>
            <Route exact path={match.url} component={MainPage} />

            <Route exact path={`${match.url}/add`} component={AddPage} />

            <Route exact path={`${match.url}/:categoryId`} component={EditPage} />

            <Route component={NotFound} />
        </Switch>
    );
}

export default Photo;