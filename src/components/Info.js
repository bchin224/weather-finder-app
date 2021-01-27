import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=9b706266b62ecb327121ca9708f8c096&zip='
// const apiKey = '9b706266b62ecb327121ca9708f8c096'

class Info extends Component {
  constructor (props) {
    super(props)

    this.state = {
      zip: '',
      city: null
      // location: null,
      // temperature: null,
      // humidy: null,
      // conditions: null,
    }

  }

  // change city to user input
  handleInputChange = (event) => {
    event.persist()
    this.setState({ zip: event.target.value })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    const { zip } = this.state
    // make api call
    axios.get(`${apiUrl}${zip}`)
    .then(res => this.setState({ zip: '', city: res.data.name }))
    .catch(console.error)
  }

  render() {
    let infoDisplay
    const { city } = this.state

    if (!city) {
      infoDisplay = ''
    } else {
      infoDisplay =(
        <React.Fragment>
          <p><span>Location:</span> {city}</p>
          <hr />
          <p><span>Temperature:</span> 0.27</p>
          <hr />
          <p><span>Humidity:</span> 93%</p>
          <hr />
          <p><span>Conditions:</span> mist</p>
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
              placeholder="Enter City"
              onChange={this.handleInputChange}
            />
            <Button className='search-btn' type="submit" variant="outline-primary">Get Weather</Button>
          </Form>
        </Form.Group>
        <div>
          {infoDisplay}
        </div>
      </React.Fragment>
    )
  }


}

export default Info

// <form id="info-side">
//   <input
//     placeholder = "Manchester"
//     name = "state"
//     size = "15"
//   />
//   <input
//     placeholder="UK"
//     name = "country"
//     size = "15"
//   />
//   <button onClick={handleClick}>Get Weather</button>
//   <p><span>Location:</span> Manchester, GB</p>
//   <hr />
//   <p><span>Temperature:</span> 0.27</p>
//   <hr />
//   <p><span>Humidity:</span> 93%</p>
//   <hr />
//   <p><span>Conditions:</span> mist</p>
// </form>
