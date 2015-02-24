var csp = require('js-csp'),
    go = csp.go,
    put = csp.put,
    take = csp.take,
    chan = csp.chan;


var nmlParse = require('./nmlParser.js');
var assert = require('assert');

describe('nmlParser', function(){
    describe('#nmlParse()', function(){
        it('should return array of length 7', function(){
            go(function*() {
                var data =  yield take(nmlParse('history.nml'));
                assert.equal(7, data.length);
            });

        })
    })
});



