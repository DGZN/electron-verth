import { RECEIVED_TRACE, RECEIVED_EVENT } from '../actions/proxy'

export default function traces(state = {
  isMounted: false,
  errorScanning: false,
  imageURL: '',
  traces: [],
  events: []
}, action) {
  switch (action.type) {
    case RECEIVED_TRACE:
      const { url } = action.trace
      if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(url)) {
        var imageURL = url
      }
      return Object.assign({}, state, {
        isScanning: false,
        errorScanning: false,
        imageURL: imageURL ? imageURL : state.imageURL,
        traces: state.traces.concat(action.trace),
        lastScanned: action.scannedAt
      })
    case RECEIVED_EVENT:
      return Object.assign({}, state, {
        events: state.events.concat(action.event),
      })
    default:
      return state
  }
}
