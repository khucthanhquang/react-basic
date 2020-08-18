import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './layout.css';
import firebase from 'firebase';
import { useHistory } from "react-router-dom";


import Header from '../../components/Admin/Header';
import SideBar from '../../components/Admin/SideBar';
import NotFound from '../../components/NotFound';

import { fetchCategories } from './Category/categorySlice'
import { fetchPhotos } from './Photo/photoSlice'

import { fetchPostCategory } from './PostCategory/postCategorySlice'
import { fetchPosts } from './Posts/postsSlice'

import { useDispatch } from 'react-redux';

import SearchPage from './Photo/pages/SearchPage';

const Category = React.lazy(() => import('./Category'));
const Photo = React.lazy(() => import('./Photo'));

const Dashboard = React.lazy(() => import('./Dashboard'));

const PostCategory = React.lazy(() => import('./PostCategory'));
const Posts = React.lazy(() => import('./Posts'));


function LayoutAdmin(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            await dispatch(fetchCategories())
        }
        getCategories()
    })

    useEffect(() => {
        const getPhoto = async () => {
            await dispatch(fetchPhotos())
        }
        getPhoto()
    })

    useEffect(() => {
        const getPostCategories = async () => {
            await dispatch(fetchPostCategory())
        }
        getPostCategories()
    })

    useEffect(() => {
        const getPost = async () => {
            await dispatch(fetchPosts())
        }
        getPost()
    })
    // Check login
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                console.log("User not login !")
                // user log out, handle something here
                return;
            }
            if (user.email !== "quangktph07731@fpt.edu.vn") {
                history.push('/');
            };
        })
        return () => unregisterAuthObserver();
    }, [])
    return (
        <div className="sidebar-mini layout-fixed" >
            <div className="wrapper">
                <Header />
                <SideBar />
                <div className="content-wrapper">
                    <div className="content-header">
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <Switch>
                                            <Route exact path="/admin" component={Dashboard} />
                                            <Route path="/admin/category/" component={Category} />
                                            <Route path="/admin/photo/" component={Photo} />
                                            <Route path="/admin/search_api/" component={SearchPage} />

                                            <Route path="/admin/post-category/" component={PostCategory} />
                                            <Route path="/admin/posts/" component={Posts} />

                                            <Route component={NotFound} />
                                        </Switch>
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmin;