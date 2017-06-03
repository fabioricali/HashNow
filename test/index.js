/**
 * Created by Fabio on 02/06/2017.
 */

const hashNow = require('../index');
const cryptorjs = require('cryptorjs');
const assert = require('assert');

const secret = 'mySecretWord';

const myCryptor = new cryptorjs(secret, 'aes-256-cbc-hmac-sha256');

describe('hashNow test', function () {

    it('day, should be return 32 and 8 chars', function () {
        let result = hashNow(secret);
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 8);
        assert.equal(parseInt(decoded.substr(6)), (new Date()).getUTCDate());
    });

    it('hour, should be return 32 and 10 chars', function () {
        let result = hashNow(secret, 'hour');
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 10);
        assert.equal(parseInt(decoded.substr(8)), (new Date()).getUTCHours());
    });

    it('minute, should be return 32 and 12 chars', function () {
        let result = hashNow(secret, 'minute');
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 12);
        assert.equal(parseInt(decoded.substr(10)), (new Date()).getUTCMinutes());
    });

    it('minute no utc, should be return 32 and 12 chars', function () {
        let result = hashNow(secret, 'minute', false);
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 12);
        assert.equal(parseInt(decoded.substr(10)), (new Date()).getMinutes());
    });

    it('month, should be return 32 and 6 chars', function () {
        let result = hashNow(secret, 'month');
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 6);
        assert.equal(parseInt(decoded.substr(4)), (new Date()).getUTCMonth() + 1);
    });

    it('year, should be return 32 and 4 chars', function () {
        let result = hashNow(secret, 'year');
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 4);
        assert.equal(decoded, (new Date()).getUTCFullYear());
    });

    it('year2, should be return 32 and 8 chars (default is day)', function () {
        let result = hashNow(secret, 'year2');
        let decoded = myCryptor.decode(result);
        console.log(result, decoded);
        assert.equal(result.length, 32);
        assert.equal(decoded.length, 8);
        assert.equal(parseInt(decoded.substr(6)), (new Date()).getUTCDate());
    });

});

describe('private pad function test', function () {
    it('should be return a string like "01"', function () {
        let result = hashNow._pad(1);
        console.log(result);
        assert.equal(result, '01');
    });
    it('should be return a string like "11"', function () {
        let result = hashNow._pad(11);
        console.log(result);
        assert.equal(result, '11');
    });
});

describe('private getDate function test', function () {
    it('should be return a object with UTC date parts ', function () {
        let result = hashNow._getDate(true);
        console.log(result);
        assert.equal(result.Y, (new Date()).getUTCFullYear());
        assert.equal(result.M, (new Date()).getUTCMonth() + 1);
        assert.equal(result.D, (new Date()).getUTCDate());
        assert.equal(result.H, (new Date()).getUTCHours());
        assert.equal(result.m, (new Date()).getUTCMinutes());
    });
    it('should be return a object with date parts ', function () {
        let result = hashNow._getDate(false);
        console.log(result);
        assert.equal(result.Y, (new Date()).getFullYear());
        assert.equal(result.M, (new Date()).getMonth() + 1);
        assert.equal(result.D, (new Date()).getDate());
        assert.equal(result.H, (new Date()).getHours());
        assert.equal(result.m, (new Date()).getMinutes());
    });
});