import { MDBContainer } from 'mdbreact';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Footer from '../../components/Main/Footer';
import Header from '../../components/Main/Header';
import NavBar from '../../components/Main/NavBar';
import NotFound from '../../components/NotFound';
import { fetchCategories } from '../Admin/Category/categorySlice';
import { fetchPhotos } from '../Admin/Photo/photoSlice';
import { fetchPostCategory } from '../Admin/PostCategory/postCategorySlice';
import { fetchPosts } from '../Admin/Posts/postsSlice';
import { getItemToStorage } from './cartSlice';
import './layout.css';





const HomePage = React.lazy(() => import('./HomePage'));

const DetailPhoto = React.lazy(() => import('./DetailPhoto'));

const Blog = React.lazy(() => import('./Blog'));
const DetailBlog = React.lazy(() => import('./DetailBlog'));

const Contact = React.lazy(() => import('./Contact'));
const About = React.lazy(() => import('./About'));
const Checkout = React.lazy(() => import('./CheckOut'));
const Auth = React.lazy(() => import('../Auth/pages/LoginPage'));
const MyAcount = React.lazy(() => import('./MyAcount'));

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
    }, [])
    // Lấy danh sách posts
    useEffect(() => {
        const getPosts = async () => {
            await dispatch(fetchPosts())
        }
        getPosts()
    }, [])
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
                        <Route path="/login" component={Auth} ></Route>
                        <Route exact path="/" component={HomePage} />

                        <Route path="/photo/:id" component={DetailPhoto} />

                        <Route exact path="/blog" component={Blog} />
                        <Route path="/blog/:idBlog" component={DetailBlog} />

                        <Route path="/contact" component={Contact} />
                        <Route path="/about" component={About} />
                        <Route path="/check-out" component={Checkout} />
                        <Route path="/my-acount" component={MyAcount} />

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </MDBContainer>
            <Footer />
        </div>
    )
}

export default LayoutMain;