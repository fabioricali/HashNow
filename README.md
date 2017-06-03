# hashNow
Simple library to generate an hash relative to current day.

[![Build Status](https://travis-ci.org/fabioricali/TimeKey.svg?branch=master)](https://travis-ci.org/fabioricali/TimeKey) [![Coverage Status](https://coveralls.io/repos/github/fabioricali/TimeKey/badge.svg?branch=master)](https://coveralls.io/github/fabioricali/TimeKey?branch=master)

## Installation

```javascript
npm install hash-now --save
```

## Example
### Basic
```javascript
var hashNow = require('hash-now');

hashNow('yourSecreteWord');
// => return an hash of day like '984d047e111265672edaf38feb9d8be4'
```

### Arguments
`
hashNow(secret[, precision = 'day', utc = true])
`
Name | Type | Default | Description
-|-|-|-
secret | string |  | required, your secret key
precision | string | day | optional, hash precision can be "day", "hour", "minute", "month", "year"
utc | boolean | true | optional, utc date

## License
HashNow is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

## Author
[Fabio Ricali](http://rica.li)