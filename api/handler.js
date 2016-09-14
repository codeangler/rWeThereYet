'use strict';

var connectionStr = "postgres://rwethere:yesweare@http://rwetheredata.cea0ko4vpoqx.us-east-1.rds.amazonaws.com:5432/rtdgeodata";

// Your first function handler
module.exports.hello = (event, context, cb) => cb(null,
  pg.connect(connectionStr, function(err, client, done) {
    var stops = client.query("SELECT * FROM stop_view ORDER BY ST_Distance(geometry, ST_GeomFromText('POINT("+event.query.lon+" "+event.query.lat+")',4269)) LIMIT 1;");
    query.on('row', function(row) {
      return { message: [row.stop_id], event };
    });
  });
);

// You can add more handlers here, and reference them in serverless.yml
