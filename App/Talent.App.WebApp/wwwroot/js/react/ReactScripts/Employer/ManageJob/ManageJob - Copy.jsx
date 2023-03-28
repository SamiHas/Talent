import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import JobListingCard from '../../TalentMatching/JobListingCard.jsx';
import { Button, Card, Image } from 'semantic-ui-react'

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: { myJobs: [] },
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
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
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        //this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
            this.setState({ loaderData })
        )

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        //this.loadData();
    };

    /* componentDidMount() {
         fetch('/api/data')
             .then(response => response.json())
             .then(data => this.setState({ data }))
             .catch(error => console.error(error));
     }*/

    /*loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:51689/listing/listing/getSortedEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let loadJobs = null;
                if (res.employer) {
                    employerData = res.employer
                    //console.log("employerData", employerData)
                }
                this.updateWithoutSave(employerData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }
*/



    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Process the job listings data here
                let jobs = data.myJobs;
                let totalPages = Math.ceil(jobs.length / 6);
                this.setState({
                    loadJobs: jobs,
                    totalPages: totalPages

                });
                /*console.log(this.state.loadJobs)*/
            })
            .catch(error => {
                console.error('Error fetching job listings:', error);
            })
    }


    /*loadData(callback) {
        console.log('Retrieving job listing data...');
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Job listing data retrieved successfully:', data.myJobs);
                this.setState({
                    loadJobs: data.myJobs
                }, callback)
            })
            .catch(error => console.error('Error:', error));
    }
*/

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



            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>

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


                    {/* {this.state.loadJobs.map(job => (
                            <JobSummaryCard key={job.id} job={job} />
                        ))}*/}

                    <JobSummaryCard />

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


            </BodyWrapper>





        )

    }




}

