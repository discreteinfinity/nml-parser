/**
 * Created by christianmutikainen on 2014-10-16.
 */
var csp = require('js-csp');
var _ = require('lodash');

module.exports = function  (fn) {
    //todo: if optional second argument is a callback, then modify it with csp.async
    if (typeof fn == 'function') {
        var f = fn;
    } else {
        console.log('channelAsyncify: not a function')
    }
    var ch = csp.chan(1);
    var g = _.partialRight(f, function (err, res) {
        if (err) {
            console.log('channelAsyncify: ' + err)
        } else {
            csp.putAsync(ch, res);
        }
    });
    return function (val) {
        g(val);
        return ch;
    }
}
