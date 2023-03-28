import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import { Button, Card, Image } from 'semantic-ui-react';
export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        /*loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");*/
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: true,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };
    init() {
        let loaderData = this.state.loaderData;
        /*loaderData.allowedUsers.push("Employer");
        loaderData.allowedUsers.push("Recruiter");*/
        loaderData.isLoading = false;
        this.setState({ loaderData, })
        this.loadData(() =>
            this.setState({ loaderData })
        )
    }
    componentDidMount() {
        this.loadData()
        this.init()
    }
    loadData() {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            data: {
                activePage: this.state.activePage,
                sortbyDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired,
            },
            dataType: "json",
            success: function (res) {
                this.setState({ loadJobs: res.myJobs });
                console.log(this.state.loadJobs)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }
    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }
    render() {
        return (

          /*  this.state.loadJobs.map(
                job => console.log(job.title)
            )*/

            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <React.Fragment>
                    <div className="ui container">
                        <h1>List of Jobs</h1>

                        <Dropdown
                            text='Filter: Choose Filter'
                            icon='filter'
                            floating

                            className='icon'
                        >
                            <Dropdown.Menu>
                                <Dropdown.Header icon='tags' content='Filter by tag' />
                                <Dropdown.Item>Important</Dropdown.Item>
                                <Dropdown.Item>Announcement</Dropdown.Item>
                                <Dropdown.Item>Discussion</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="four wide column">
                            <JobSummaryCard jobs={this.state.loadJobs} />
                        </div>
                    {/*<div className="eight wide column">
                        <p id="load-more-loading">
                            <img src="/images/rolling.gif" alt="Loading…" />
                        </p>
                    </div>
                    <div className="four wide column">
                        </div>*/}
                        <div className="four wide column">
                            <Pagination style={{
                                marginLeft: "50px", marginTop: "10px",
                                width: "250px", height: "2px"
                            }}
                                boundaryRange={0}
                                defaultActivePage={1}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={10}
                            />
                        </div> 

                    </div>
                    

                </React.Fragment>
                
            </BodyWrapper>
        )
    }




    
        




}