# nml-parser
Parses a playlist file in Native Instruments Traktor .nml format asynchronously using channels

```
var csp = require('js-csp'),
    go = csp.go,
    take = csp.take,

var nmlParse = require('./nmlParser.js');

go(function*() {
    var data =  yield take(nmlParse('playlist.nml'));
    console.log(data)
    //outputs array of tracks
});
```