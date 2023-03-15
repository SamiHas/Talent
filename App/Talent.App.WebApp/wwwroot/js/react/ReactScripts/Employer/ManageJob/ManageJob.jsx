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
            loadJobs: [],
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
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
          // this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData();
    };

   /* componentDidMount() {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => this.setState({ data }))
            .catch(error => console.error(error));
    }*/


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
            })
            .catch(error => {
                console.error('Error fetching job listings:', error);
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
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">

                    <Card.Group>
                        <Card
                            style={{ width: "360px", height:"300px" }}>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src='/images/avatar/large/steve.jpg'
                                />
                                <Card.Header style={{marginBottom:"30px"} }>Title</Card.Header>
                                <Card.Meta>Location</Card.Meta>
                                <Card.Description>
                                    <strong>Summary</strong>
                                </Card.Description>
                            </Card.Content>

                            <Card.Content extra>
                                
                                    
                                
                                <div className='ui four buttons'
                                    style={{ width: "350px", height: "40px" }} >
                                    <div style={{ marginRight: "20px" }}>
                                        <Button color='red'  floated="left">
                                            Expired
                                        </Button>
                                    </div>
                                    <div >
                                        <Button basic color='red'  >
                                            Close
                                        </Button>
                                        <Button basic color='red'  >
                                           Edit
                                        </Button>
                                        <Button basic color='red'  >
                                        Copy
                                        </Button>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                        
                    </Card.Group>
                    


                </div>
            </BodyWrapper>
        )
    }

    /*render() {
        // map over the jobs array and render a JobSummaryCard for each job listing
        const jobCards = this.state.jobs.map(job => (
            <JobSummaryCard key={job.id} job={job} />
        ));

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">{jobCards}</div>
            </BodyWrapper>
        )
    }  */


    /*render() {
        <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
            <div className="ui grid talent-feed container">
                <div className="four wide column">
                    <JobSummaryCard />
                </div>
                <div className="eight wide column">
                    
                    <p id="load-more-loading">
                        <img src="/images/rolling.gif" alt="Loading…" />
                    </p>
                </div>
                <div className="four wide column">
                    
                </div>
            </div>
        </BodyWrapper>
    }*/
   
}

