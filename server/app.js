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

  function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  function areWeThere(pos1, pos2) {
    distance = getDistance(pos1[0], pos1[1], pos2[0], pos2[1])
    if (distance < .3) {
      return true;
    } else {
      return false;
    }
  }
}
