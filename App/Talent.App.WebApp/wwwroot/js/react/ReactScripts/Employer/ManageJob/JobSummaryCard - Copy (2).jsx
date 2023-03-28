import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Location } from '../CreateJob/Location.jsx';
import { Button, Card, Image } from 'semantic-ui-react';
export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }
    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }
    render() {
        return (
            <div className="ui container">
                <Card.Group>
                    <Card
                        style={{ width: "360px", height: "300px" }}>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='/images/avatar/large/steve.jpg'
                            />
                            <Card.Header style={{ marginBottom: "30px" }}>Title</Card.Header>
                            <Card.Meta>Location</Card.Meta>
                            <Card.Description>
                                <strong>Summary</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui four buttons'
                                style={{ width: "350px", height: "40px" }} >
                                <div style={{ marginRight: "20px" }}>
                                    <Button color='red' floated="left">
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
        )
    }
}