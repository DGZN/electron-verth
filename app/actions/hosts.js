import scan from '../utils/macHosts'
const arp = require('../utils/arp')
const ip  = require('ip')

export const REQUEST_HOSTS = 'REQUEST_HOSTS'
export const RECEIVE_HOSTS = 'RECEIVE_HOSTS'
export const TARGET_HOST = 'TARGET_HOST'

export function errorScanning() {
  return {
    type: ERROR_SCANNING
  }
}

function requestHosts() {
  return {
    type: REQUEST_HOSTS
  }
}

function receiveHosts(data) {
  return {
    type: RECEIVE_HOSTS,
    hosts: data,
    scannedAt: Date.now()
  }
}

function scanHosts() {
  return dispatch => {
    dispatch(requestHosts())
    return scan((hosts) => {
      dispatch(receiveHosts(hosts))
    })
  }
}

function shouldScanHosts(state) {
  const hosts = state.hosts
  if (!hosts.macs.length) {
    return true
  }
  if (hosts.isScanning) {
    return false
  }
  return hosts.errorScanning
}

export function scanHostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldScanHosts(getState())) {
      return dispatch(scanHosts())
    }
  }
}

export function targetHost(target) {
  arp.poision(target.ip, cidr(ip.address()).gateway)
  return {
    type: TARGET_HOST,
    target: target
  }
}

var cidr = function(ip){
  var range = ip.split('.')
  range.pop()
  return {
    range: range.join('.')+'.1/24'
  , gateway: range.join('.')+'.1'
  }
}
