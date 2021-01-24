import React from 'react'

const Info = () => {
  return (
    <React.Fragment>
      <form id="info-side">
        <input
          placeholder = "Manchester"
          name = "state"
          size = "15"
        />
        <input
          placeholder="UK"
          name = "country"
          size = "15"
        />
        <button>Get Weather</button>
        <p><span>Location:</span> Manchester, GB</p>
        <hr />
        <p><span>Temperature:</span> 0.27</p>
        <hr />
        <p><span>Humidity:</span> 93%</p>
        <hr />
        <p><span>Conditions:</span> mist</p>
      </form>

    </React.Fragment>
  )
}

export default Info
