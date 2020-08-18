import React, { Suspense, useState } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { userLoginFetch } from './authSlice'
Auth.propTypes = {

};
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

function Auth(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const [user, setUser] = useState({});
    function onHandleSubmit(data) {
        // dispatch(userLoginFetch(data))
        setTimeout(() => {
            dispatch(userLoginFetch(data))
            // history.push('/admin/category');
        }, 1000);
    }
    return (
        <div class="login-page">
            <div className="login-box">
                {/* <div className="login-logo">
                    <a href="#"><b>AUTH</b></a>
                </div> */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Đăng nhập</p>
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    ref={register({ required: true })}
                                    className="form-control"
                                    placeholder="Email" />
                                <small className="text-danger">{errors.email && <span>Không được bỏ trống trường này</span>}</small>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    name="password"
                                    ref={register({ required: true })}
                                    type="password"
                                    className="form-control"
                                    placeholder="Password" />
                                <small className="text-danger">{errors.password && <span>Không được bỏ trống trường này</span>}</small>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                            </a>
                        </div>
                        {/* /.social-auth-links */}
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Register a new membership</a>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    )
}

export default Auth;