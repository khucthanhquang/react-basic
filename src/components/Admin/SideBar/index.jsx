import React from 'react';
import { Link } from 'react-router-dom';

function SideBar(props) {
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="" className="brand-link">
                    <img src="https://vncloud.vn/wp-content/uploads/2018/08/direct-admin-logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight">ADMIN LTE</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition"><div className="os-resize-observer-host"><div className="os-resize-observer observed" style={{ left: '0px', right: 'auto' }} /></div><div className="os-size-auto-observer" style={{ height: 'calc(100% + 1px)', float: 'left' }}><div className="os-resize-observer observed" /></div><div className="os-content-glue" style={{ margin: '0px -8px' }} /><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" style={{ overflowY: 'scroll', right: '0px', bottom: '0px' }}><div className="os-content" style={{ padding: '0px 8px', height: '100%', width: '100%' }}>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item ml-1" style={{ borderBottom: '1px solid #4f5962' }}>
                                <Link to="/admin" className="nav-link">
                                    <i className="fas fa-tachometer-alt"></i>&nbsp;
                                    <p>
                                        Dashboard
                                        {/* <span class="right badge badge-danger">New</span> */}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ borderBottom: '1px solid #4f5962' }}>
                                <Link to="/admin/category" className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Danh mục Photo
                                        {/* <span class="right badge badge-danger">New</span> */}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ borderBottom: '1px solid #4f5962' }}>
                                <Link to="/admin/photo" className="nav-link">
                                    <i className="nav-icon far fa-image"></i>
                                    <p>
                                        Danh sách Photo
                                        {/* <span class="right badge badge-danger">New</span> */}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ borderBottom: '1px solid #4f5962' }}>
                                <Link to="/admin/post-category" className="nav-link">
                                    <i className="far fa-address-card"></i> &nbsp;
                                    <p>
                                        Danh mục bài viết
                                        {/* <span class="right badge badge-danger">New</span> */}
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/posts" className="nav-link">
                                    <i className="fas fa-mail-bulk"></i> &nbsp;
                                    <p>
                                        Danh sách bài viết
                                        {/* <span class="right badge badge-danger">New</span> */}
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{ width: '100%', transform: 'translate(0px, 0px)' }} /></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{ height: '71.9396%', transform: 'translate(0px, 0px)' }} /></div></div><div className="os-scrollbar-corner" /></div>
                {/* /.sidebar */}
            </aside>

        </div>
    );
}

export default SideBar;