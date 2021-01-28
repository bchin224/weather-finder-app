import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=9b706266b62ecb327121ca9708f8c096&zip='

class Info extends Component {
  constructor (props) {
    super(props)
    // initialize all values to null or empty
    this.state = {
      zip: '',
      city: null,
      country: null,
      temp: null,
      feelsLikeTemp: null,
      humidy: null,
      conditions: null,
    }
  }

  // take form input on button click
  handleInputChange = (event) => {
    event.persist()
    // set input to the value of zip
    this.setState({ zip: event.target.value })
  }

  handleSubmit = (event) => {
    // prevent page refresh
    event.preventDefault()
    const { zip } = this.state
    // make api call
    axios.get(`${apiUrl}${zip}`)
    // .then(res => console.log('This is res.data', res.data))
    // pull all data from openweathermap api
    .then(res => this.setState({
      zip: '',
      city: res.data.name,
      country: res.data.sys.country,
      temp: res.data.main.temp,
      feelsLikeTemp: res.data.main.feels_like,
      humidity: res.data.main.humidity,
      conditions: res.data.weather[0].description
    }))
    .catch(console.error)
  }

  render() {
    let infoDisplay
    // deconstruct all necessary values from state
    const { city, country, temp, feelsLikeTemp, humidity, conditions } = this.state

    // if there's no input, keep info display blank
    if (!city) {
      infoDisplay = ''
    } else {
      // fill input display with content
      infoDisplay =(
        <React.Fragment>
          <p><span>Location:</span> {city}, {country}</p>
          <hr />
          <p><span>Temperature:</span> {temp}&#x2109;, <i>feels like {feelsLikeTemp}&#x2109;.</i></p>
          <hr />
          <p><span>Humidity:</span> {humidity}%</p>
          <hr />
          <p><span>Conditions:</span> {conditions}</p>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Form.Group controlId="zip" id="info-side">
          <Form onSubmit={this.handleSubmit} inline>
            <FormControl
              type="text"
              className="mr-sm-2"
              required
              name="zip"
              value={this.state.zip}
              placeholder="Enter Your Zip"
              onChange={this.handleInputChange}
            />
            <Button className='search-btn' type="submit" variant="outline-primary">Get Weather</Button>
          </Form>
          <div>
            {infoDisplay}
          </div>
        </Form.Group>
      </React.Fragment>
    )
  }
}

export default Info
