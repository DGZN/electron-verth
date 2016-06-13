import React, { PropTypes, Component } from 'react'
import css from './Keylogs.css'

export default class Hosts extends Component {
  render() {
    const { events } = this.props
    return (
      <table className="ui inverted black selectable right aligned keylogs padded table">
        <tbody>
          {events.map((event, i) =>
            <tr key={i}>
              <td className="left aligned">{event.id.toUpperCase()}</td>
              <td>{event.msg}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

Hosts.propTypes = {
  macs: PropTypes.array.isRequired
}
