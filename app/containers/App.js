import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { scanHostsIfNeeded, targetHost } from '../actions/hosts'
import { logTrace, logEvent } from '../actions/proxy'
import Nav from '../components/Nav'
import Traces from '../components/Traces'
import Hosts from '../components/Hosts'
import Keylogs from '../components/Keylogs'

const proxy = require('../utils/proxy')
const logger = require('../../logger');


class App extends Component {

  constructor(props) {
    super(props)
    this.selectTarget = this.selectTarget.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(scanHostsIfNeeded())
    proxy.init()
    proxy.on('trace', (data) => {
      dispatch(logTrace(data))
    })
    logger.mount()
    logger.on('output', function (data) {
      dispatch(logEvent(data))
    })

  }

  selectTarget(target) {
    const { dispatch } = this.props
    dispatch(targetHost(target))
    $('.sidebar')
      .sidebar('setting', 'transition', 'push')
      .sidebar('toggle')
    ;
  }

  render() {
    const { macs, traces, events, image } = this.props
    const hasHosts = macs.length === 0
    return (
      <div className="wrapper">
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools'); // eslint-disable-line global-require
              return <DevTools />;
            }
          })()
        }
        <Hosts macs={macs} onClick={this.selectTarget} />
        <div id="dashboard" className="dimmer pusher">
          <div className="ui attached fluid inverted container host-details segment">
            <div className="ui active tab segment">
              <div className="ui two traces column grid">
                <div className="twelve wide traces column">
                  <Traces traces={traces} />
                </div>
                  <div className="ui vertical divider"></div>
                <div className="four wide column">
                  <Keylogs events={events} />
                </div>
              </div>
            </div>
          </div>
          <Nav />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  macs: PropTypes.array.isRequired,
  traces: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    macs: state.hosts.macs || []
  , events: state.proxy.events || []
  , traces: state.proxy.traces || []
  , image: state.proxy.imageURL || ''
  }
}

export default connect(mapStateToProps)(App)


/*

return (
  <div>
    <Nav />
    <div className="ui fluid container dimmer">
      {this.props.children}
      {
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('./DevTools'); // eslint-disable-line global-require
            return <DevTools />;
          }
        })()
      }
      <Hosts macs={macs} onClick={this.selectTarget} />
      <div className="ui fluid inverted container host-details segment">
        <div className="ui active tab segment">
          <div className="ui two column very relaxed grid">
            <div className="twelve wide column">
              <Traces traces={traces} />
            </div>
            <div className="ui vertical divider"></div>
            <div className="four wide column">
              <Keylogs events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

*/
