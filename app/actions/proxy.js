export const RECEIVED_TRACE = 'RECIEVED_TRACE'
export const RECEIVED_EVENT = 'RECEIVED_EVENT'
export const MOUNTING_PROXY = 'MOUNTING_PROXY'
export const PROXY_ERROR = 'PROXY_ERROR'

export function proxyError() {
  return {
    type: PROXY_ERROR
  }
}

export function receivedTrace(data) {
  return {
    type: RECEIVED_TRACE
  , trace: data
  }
}

export function logTrace(trace) {
  return (dispatch, getState) => {
    return dispatch(receivedTrace(trace))
  }
}

export function receivedEvent(event) {
  return {
    type: RECEIVED_EVENT
  , event: event
  }
}

export function logEvent(event) {
  return (dispatch, getState) => {
    return dispatch(receivedEvent(event))
  }
}

function mountingProxy() {
  return {
    type: MOUNTING_PROXY
  }
}
