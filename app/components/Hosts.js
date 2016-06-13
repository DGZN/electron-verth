import React, { PropTypes, Component } from 'react'
import css from './Hosts.css'

export default class Hosts extends Component {
  render() {
    return (
      <div className="ui right wide sidebar">
        <div id="hosts">
          <div className="ui one link cards">
            {this.props.macs.map((host, i) =>
              <div key={i} className="ui card">
                <div className="content">
                  <div className="meta">
                    <h5 className="ui header">{host.vendor}</h5>
                    <a className="group">{host.ip}</a>
                    <a className="right floated created">{host.mac}</a>
                  </div>
                </div>
                <div className="extra content">
                  <a className="right floated created" onClick={this.props.onClick.bind(this, host)}>HIJACK</a>
                  <a className="friends">SCAN</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Hosts.propTypes = {
  macs: PropTypes.array.isRequired
}
