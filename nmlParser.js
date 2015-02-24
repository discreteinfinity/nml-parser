/**
 * Created by christianmutikainen on 2014-10-14.
 */

var csp = require('js-csp'),
    go = csp.go,
    put = csp.put,
    take = csp.take,
    chan = csp.chan;

var read = require('fs').readFile;
var _ = require('lodash');
var parse = require('xml2js').parseString;

var channelAsyncify = require('./cspAsyncify.js');

module.exports = function (path) {
    return go(function*() {
        var file = yield take(channelAsyncify(read) (path));
        var parsed = yield take(channelAsyncify(parse) (file));
        parsed = parsed['NML'];
        //todo version specific if needed
        //var version = parsed['$']['VERSION'];
        var collection = parsed['COLLECTION'][0]['ENTRY'];
        var playlists = parsed['PLAYLISTS'][0]['NODE'][0]['SUBNODES'][0]['NODE'][0]['PLAYLIST'][0]['ENTRY'];
        var getCollTrackId =  function (track) {
            var track = track['LOCATION'][0]['$'];
            var key = track['DIR'] + track['FILE'];
            return key;
        };
        var getPlTrackId = function (track){
            var track = track['PRIMARYKEY'];
            var key = track[0]['$']['KEY'].replace(/^.+?(?=\/)/,'');
            return key;
        };
        var indexed = yield _.indexBy(collection, getCollTrackId);
        var matched = yield _.map(playlists, function (track) {
            var key = getPlTrackId(track);
            return this[key];
        }, indexed);

        return matched;
    });
};





