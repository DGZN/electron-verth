import React, { PropTypes, Component } from 'react'
import css from './Nav.css'

export default class Nav extends Component {

  componentDidMount() {

  }

  render() {
    const toggleHosts = this.toggleHosts
    return (
      <div className="ui inverted secondary pointing icon right bottom attached menu">
        <a className="left floated item">
        </a>
        <a className="right item" onClick={toggleHosts}>
          <i className="black spy large icon"></i>
        </a>
      </div>
    )
  }

  toggleHosts() {
    console.log("togging hosts");
    $('.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle')
    ;
  }
}

Nav.propTypes = {

}
