# nml-parser
Parses a playlist file in Native Instruments Traktor .nml format asynchronously using channels

```
var csp = require('js-csp'),
    go = csp.go,
    put = csp.put,
    take = csp.take,
    chan = csp.chan;
    
var nmlParse = require('./nmlParser.js');

go(function*() {
    var data =  yield take(nmlParse('playlist.nml'));
    console.log(data)
    //outputs array of tracks
});
```