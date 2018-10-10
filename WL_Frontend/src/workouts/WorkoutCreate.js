import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class WorkoutCreate extends React.Component {
    constructor() {
        super()
        this.state = {
            result: '',
            def: '',
            description: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log(this.state)
        fetch('http://localhost:3000/api/log/', {
            method: 'POST',
            body: JSON.stringify({log: this.state}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(response => response.json())
        .then(workoutData => console.log(workoutData));
        event.preventDefault();
    }
    
    render() {
        return(
            <div>
                <h3>Log a Workout</h3>
                <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="result">Result</Label>
                            <Input type="text" name="result" id="result" placeholder="Enter a result" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="def">Type</Label>
                            <Input type="select" name="def" id="def" onChange={this.handleChange}>
                                <option></option>
                                <option value="Time">Time</option>
                                <option value="Weight">Weight</option>
                                <option value="Distance">Distance</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Notes</Label>
                            <Input type="text" name="description" id="description" placeholder="Enter notes" onChange={this.handleChange}/>
                        </FormGroup>
                        <Button type="submit" outline color="primary">Submit</Button>
                    </Form>
            </div>
        )
    }
}

export default WorkoutCreate;