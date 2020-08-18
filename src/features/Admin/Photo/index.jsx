import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import NotFound from '../../../components/NotFound';

import AddPagePhoto from './pages/AddPagePhoto';
import EditPagePhoto from './pages/EditPagePhoto';
import MainPagePhoto from './pages/MainPagePhoto';
import SearchPage from './pages/SearchPage';

Photo.propTypes = {

};
function Photo(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={MainPagePhoto} />

            <Route exact path={`${match.url}/add`} component={AddPagePhoto} />

            <Route exact path={`${match.url}/:photoId`} component={EditPagePhoto} />

            {/* <Route exact path={`${match.url}/search_api`} component={SearchPage} /> */}

            <Route component={NotFound} />
        </Switch>

    );
}

export default Photo;