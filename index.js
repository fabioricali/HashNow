/**
 * Created by Fabio on 02/06/2017.
 */
const cryptorjs = require('cryptorjs');

/**
 * Add pad zero
 * @param s
 * @returns {string}
 */
function pad(s) {
    s = (s < 10) ? '0' + s : s;
    return s.toString();
}

/**
 * Get date
 * @param utc
 * @returns {{}}
 */
function getDate(utc) {
    let o = {};
    let d = new Date();

    if(utc) {
        o.Y = d.getUTCFullYear();
        o.M = d.getUTCMonth() + 1;
        o.D = d.getUTCDate();
        o.H = d.getUTCHours();
        o.m = d.getUTCMinutes();
    } else {
        o.Y = d.getFullYear();
        o.M = d.getMonth() + 1;
        o.D = d.getDate();
        o.H = d.getHours();
        o.m = d.getMinutes();
    }
    return o;
}

/**
 * A key now
 * @param secret {string}
 * @param precision {string} year, day, month, hour, minute
 * @param utc {boolean}
 * @returns {string}
 * @constructor
 */
function hashNow(secret, precision = 'day', utc = true) {
    let key;
    let myCryptor = new cryptorjs(secret, 'aes-256-cbc-hmac-sha256');
    let d = getDate(utc);

    let _Y = d.Y.toString();
    let _M = pad(d.M);
    let _D = pad(d.D);
    let _H = pad(d.H);
    let _m = pad(d.m);

    switch (precision) {

        case 'year':
            // Of year
            key = _Y;
            break;

        case 'month':
            // Of month
            key = _Y + _M;
            break;

        default: case 'day':
            // Of day
            key = _Y + _M + _D;
            break;

        case 'hour':
            // Of hour
            key = _Y + _M + _D + _H;
            break;

        case 'minute':
            // of minute
            key = _Y + _M + _D + _H + _m;
            break;
    }

    return myCryptor.encode(key);
}

/**
 * Constructor
 * @type {hashNow}
 */
module.exports = hashNow;

/**
 * For testing
 * @type {getDate}
 * @private
 */
module.exports._getDate = getDate;

/**
 * For testing
 * @type {pad}
 * @private
 */
module.exports._pad = pad;