import React, { Suspense, useEffect } from 'react';
import { MDBContainer } from 'mdbreact';
import './layout.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../../components/Main/NavBar';
import Header from '../../components/Main/Header';
import Footer from '../../components/Main/Footer';

import NotFound from '../../components/NotFound';
import { useDispatch } from 'react-redux';

import { fetchCategories } from '../../features/Admin/Category/categorySlice'
import { fetchPhotos } from '../../features/Admin/Photo/photoSlice'
import { getItemToStorage } from './cartSlice'

import { fetchPosts } from '../Admin/Posts/postsSlice'
import { fetchPostCategory } from '../Admin/PostCategory/postCategorySlice'

const HomePage = React.lazy(() => import('./HomePage'));

const Photo = React.lazy(() => import('./Photo'));
const DetailPhoto = React.lazy(() => import('./DetailPhoto'));

const Blog = React.lazy(() => import('./Blog'));
const DetailBlog = React.lazy(() => import('./DetailBlog'));

const Contact = React.lazy(() => import('./Contact'));
const About = React.lazy(() => import('./About'));
const Checkout = React.lazy(() => import('./CheckOut'));

function LayoutMain(props) {
    const dispatch = useDispatch();

    // Lấy danh sách photo category
    useEffect(() => {
        const getCategories = async () => {
            await dispatch(fetchCategories())
        }
        getCategories()
    }, [])

    // Lấy danh sách photo 
    useEffect(() => {
        const getPhoto = async () => {
            await dispatch(fetchPhotos())
        }
        getPhoto()
    }, [])

    // Lấy danh sách post category
    useEffect(() => {
        const getPostCategory = async () => {
            await dispatch(fetchPostCategory())
        }
        getPostCategory()
    },[])
     // Lấy danh sách posts
    useEffect(() => {
        const getPosts = async () => {
            await dispatch(fetchPosts())
        }
        getPosts()
    },[])
     // Lấy danh sách các item trong cart
    useEffect(() => {
        dispatch(getItemToStorage())
    }, [])

    const container = { minHeight: 600 }

    return (
        <div>
            <NavBar />
            <Header />
            <MDBContainer style={container} className="text-center mt-2 pt-2">
                <Suspense fallback={<div>Loading ...</div>}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />

                        <Route exact path="/photo" component={Photo} />
                        <Route path="/photo/:id" component={DetailPhoto} />

                        <Route exact path="/blog" component={Blog} />
                        <Route path="/blog/:idBlog" component={DetailBlog} />

                        <Route path="/contact" component={Contact} />
                        <Route path="/about" component={About} />
                        <Route path="/check-out" component={Checkout} />

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </MDBContainer>
            <Footer />
        </div>
    )
}

export default LayoutMain;