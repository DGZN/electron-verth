import React, { PropTypes, Component } from 'react'
import css from './Traces.css'

export default class Traces extends Component {
  render() {
    return (
      <table className="ui black very padded inverted selectable proxy single line  fixed table">
        <tbody>
          {this.props.traces.map((trace, i) =>
            <tr key={i}>
              <td className="one wide">{trace.method}</td>
              <td className="thirteen wide">{trace.url}</td>
              <td className="one wide right aligned">{trace.ip}</td>
              <td className="one wide right aligned green text">{trace.code}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

Traces.propTypes = {
  traces: PropTypes.array.isRequired
}
