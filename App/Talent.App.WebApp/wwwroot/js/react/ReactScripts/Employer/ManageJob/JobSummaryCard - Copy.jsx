import React from 'react';
import Cookies from 'js-cookie';
import { Card } from 'semantic-ui-react';
import moment from 'moment';


export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this);
        this.state = {
            job: this.props.job,
        };
    }


    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        url: 'http://localhost:51689/listing/listing/closeJob'
       
    }

    render() {
        const { job } = this.state;
        return (
            <Card.Group>
            <Card
                style={{ width: "360px", height: "300px" }}>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src='/images/avatar/large/steve.jpg'
                    />
                    <Card.Header style={{ marginBottom: "30px" }}>
                            T
                    </Card.Header>
                    <Card.Meta>L</Card.Meta>
                    <Card.Description>
                        <strong>S</strong>
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
            )
    }
}