import { ERROR_SCANNING, REQUEST_HOSTS, RECEIVE_HOSTS, TARGET_HOST } from '../actions/hosts'

export default function hosts(state = {
  isScanning: false,
  errorScanning: false,
  targeting: '',
  macs: []
}, action) {
  switch (action.type) {
    case REQUEST_HOSTS:
      return Object.assign({}, state, {
        isScanning: true,
        errorScanning: false
      })
    case RECEIVE_HOSTS:
      return Object.assign({}, state, {
        isScanning: false,
        errorScanning: false,
        macs: action.hosts,
        lastScanned: action.scannedAt
      })
    case TARGET_HOST:
      return Object.assign({}, state, {
        targeting: action.target,
      })
    default:
      return state
  }
}
