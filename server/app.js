'use strict'
var realtime = require('rtd-realtime')
const UPDATE_TIME = 5000

export default function(trip_id) {
  function start(){
    setInterval(() => {
      realtime.VehiclePositions.load( (err,feed) => {
      getPosition(getVehicle(feed))
      })
    }, UPDATE_TIME);
  }
  function getPosition(vehicle){
    return vehicle.vechile ? vehicle.vehicle.position : ''
  }

  function getVehicle(feed){
    return feed.entity.filter((v) => { return v.vehicle.trip && parseInt(v.vehicle.trip.trip_id) === trip_id})
  }
}
