import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


Dashboard.propTypes = {

};

function Dashboard(props) {

    const totalCategory = useSelector(state => state.category.categories)
    const totalPhoto = useSelector(state => state.photo.photos)
    const totalPostCategory = useSelector(state => state.post_category.categories)
    const totalPost = useSelector(state => state.posts.posts)

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{totalCategory.length}</h3>
                            <p>Danh mục photo</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                        <Link to="/admin/category/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{totalPhoto.length}</h3>
                            <p>Photo</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <Link to="/admin/photo/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{totalPostCategory.length}</h3>
                            <p>Danh mục bài viết</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="/admin/post-category" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{totalPost.length}</h3>
                            <p>Bài viết</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="/admin/posts" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
            </div>


            <div className="row">
                <div className="card bg-gradient-success col-12">
                    <div className="card-header border-0 ui-sortable-handle" style={{ cursor: 'move' }}>
                        <h3 className="card-title">
                            <i className="far fa-calendar-alt" />
                            Calendar
                            </h3>
                        {/* tools card */}
                        <div className="card-tools">
                            {/* button with a dropdown */}
                            <div className="btn-group">
                                <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                    <i className="fas fa-bars" /></button>
                                <div className="dropdown-menu float-right" role="menu">
                                    <a href="#" className="dropdown-item">Add new event</a>
                                    <a href="#" className="dropdown-item">Clear events</a>
                                    <div className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">View calendar</a>
                                </div>
                            </div>
                            <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                                <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                                <i className="fas fa-times" />
                            </button>
                        </div>
                        {/* /. tools */}
                    </div>
                    {/* /.card-header */}
                    <div className="card-body pt-0">
                        {/*The calendar */}
                        <div id="calendar" style={{ width: '100%' }}><div className="bootstrap-datetimepicker-widget usetwentyfour"><ul className="list-unstyled"><li className="show"><div className="datepicker"><div className="datepicker-days" style={{}}><table className="table table-sm"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Month" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5} title="Select Month">August 2020</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Month" /></th></tr><tr><th className="dow">Su</th><th className="dow">Mo</th><th className="dow">Tu</th><th className="dow">We</th><th className="dow">Th</th><th className="dow">Fr</th><th className="dow">Sa</th></tr></thead><tbody><tr><td data-action="selectDay" data-day="07/26/2020" className="day old weekend">26</td><td data-action="selectDay" data-day="07/27/2020" className="day old">27</td><td data-action="selectDay" data-day="07/28/2020" className="day old">28</td><td data-action="selectDay" data-day="07/29/2020" className="day old">29</td><td data-action="selectDay" data-day="07/30/2020" className="day old">30</td><td data-action="selectDay" data-day="07/31/2020" className="day old">31</td><td data-action="selectDay" data-day="08/01/2020" className="day weekend">1</td></tr><tr><td data-action="selectDay" data-day="08/02/2020" className="day weekend">2</td><td data-action="selectDay" data-day="08/03/2020" className="day">3</td><td data-action="selectDay" data-day="08/04/2020" className="day active today">4</td><td data-action="selectDay" data-day="08/05/2020" className="day">5</td><td data-action="selectDay" data-day="08/06/2020" className="day">6</td><td data-action="selectDay" data-day="08/07/2020" className="day">7</td><td data-action="selectDay" data-day="08/08/2020" className="day weekend">8</td></tr><tr><td data-action="selectDay" data-day="08/09/2020" className="day weekend">9</td><td data-action="selectDay" data-day="08/10/2020" className="day">10</td><td data-action="selectDay" data-day="08/11/2020" className="day">11</td><td data-action="selectDay" data-day="08/12/2020" className="day">12</td><td data-action="selectDay" data-day="08/13/2020" className="day">13</td><td data-action="selectDay" data-day="08/14/2020" className="day">14</td><td data-action="selectDay" data-day="08/15/2020" className="day weekend">15</td></tr><tr><td data-action="selectDay" data-day="08/16/2020" className="day weekend">16</td><td data-action="selectDay" data-day="08/17/2020" className="day">17</td><td data-action="selectDay" data-day="08/18/2020" className="day">18</td><td data-action="selectDay" data-day="08/19/2020" className="day">19</td><td data-action="selectDay" data-day="08/20/2020" className="day">20</td><td data-action="selectDay" data-day="08/21/2020" className="day">21</td><td data-action="selectDay" data-day="08/22/2020" className="day weekend">22</td></tr><tr><td data-action="selectDay" data-day="08/23/2020" className="day weekend">23</td><td data-action="selectDay" data-day="08/24/2020" className="day">24</td><td data-action="selectDay" data-day="08/25/2020" className="day">25</td><td data-action="selectDay" data-day="08/26/2020" className="day">26</td><td data-action="selectDay" data-day="08/27/2020" className="day">27</td><td data-action="selectDay" data-day="08/28/2020" className="day">28</td><td data-action="selectDay" data-day="08/29/2020" className="day weekend">29</td></tr><tr><td data-action="selectDay" data-day="08/30/2020" className="day weekend">30</td><td data-action="selectDay" data-day="08/31/2020" className="day">31</td><td data-action="selectDay" data-day="09/01/2020" className="day new">1</td><td data-action="selectDay" data-day="09/02/2020" className="day new">2</td><td data-action="selectDay" data-day="09/03/2020" className="day new">3</td><td data-action="selectDay" data-day="09/04/2020" className="day new">4</td><td data-action="selectDay" data-day="09/05/2020" className="day new weekend">5</td></tr></tbody></table></div><div className="datepicker-months" style={{ display: 'none' }}><table className="table-condensed"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Year" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5} title="Select Year">2020</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Year" /></th></tr></thead><tbody><tr><td colSpan={7}><span data-action="selectMonth" className="month">Jan</span><span data-action="selectMonth" className="month">Feb</span><span data-action="selectMonth" className="month">Mar</span><span data-action="selectMonth" className="month">Apr</span><span data-action="selectMonth" className="month">May</span><span data-action="selectMonth" className="month">Jun</span><span data-action="selectMonth" className="month">Jul</span><span data-action="selectMonth" className="month active">Aug</span><span data-action="selectMonth" className="month">Sep</span><span data-action="selectMonth" className="month">Oct</span><span data-action="selectMonth" className="month">Nov</span><span data-action="selectMonth" className="month">Dec</span></td></tr></tbody></table></div><div className="datepicker-years" style={{ display: 'none' }}><table className="table-condensed"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Decade" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5} title="Select Decade">2020-2029</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Decade" /></th></tr></thead><tbody><tr><td colSpan={7}><span data-action="selectYear" className="year old">2019</span><span data-action="selectYear" className="year active">2020</span><span data-action="selectYear" className="year">2021</span><span data-action="selectYear" className="year">2022</span><span data-action="selectYear" className="year">2023</span><span data-action="selectYear" className="year">2024</span><span data-action="selectYear" className="year">2025</span><span data-action="selectYear" className="year">2026</span><span data-action="selectYear" className="year">2027</span><span data-action="selectYear" className="year">2028</span><span data-action="selectYear" className="year">2029</span><span data-action="selectYear" className="year old">2030</span></td></tr></tbody></table></div><div className="datepicker-decades" style={{ display: 'none' }}><table className="table-condensed"><thead><tr><th className="prev" data-action="previous"><span className="fa fa-chevron-left" title="Previous Century" /></th><th className="picker-switch" data-action="pickerSwitch" colSpan={5}>2000-2090</th><th className="next" data-action="next"><span className="fa fa-chevron-right" title="Next Century" /></th></tr></thead><tbody><tr><td colSpan={7}><span data-action="selectDecade" className="decade old" data-selection={2006}>1990</span><span data-action="selectDecade" className="decade" data-selection={2006}>2000</span><span data-action="selectDecade" className="decade active" data-selection={2016}>2010</span><span data-action="selectDecade" className="decade" data-selection={2026}>2020</span><span data-action="selectDecade" className="decade" data-selection={2036}>2030</span><span data-action="selectDecade" className="decade" data-selection={2046}>2040</span><span data-action="selectDecade" className="decade" data-selection={2056}>2050</span><span data-action="selectDecade" className="decade" data-selection={2066}>2060</span><span data-action="selectDecade" className="decade" data-selection={2076}>2070</span><span data-action="selectDecade" className="decade" data-selection={2086}>2080</span><span data-action="selectDecade" className="decade" data-selection={2096}>2090</span><span data-action="selectDecade" className="decade old" data-selection={2106}>2100</span></td></tr></tbody></table></div></div></li><li className="picker-switch accordion-toggle" /></ul></div></div>
                    </div>
                    {/* /.card-body */}
                </div>

            </div>

        </div>

    );
}

export default Dashboard;