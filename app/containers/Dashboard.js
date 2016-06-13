import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div></div>
    )
  }
}

Dashboard.propTypes = {}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Dashboard)
