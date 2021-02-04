import React from 'react'
import PropTypes from 'prop-types'

const Home = ({ title }) => {
  return (
    <div>
      {title}
    </div>
  )
}

Home.propTypes = {
  title: PropTypes.string.isRequired
}

export default Home
