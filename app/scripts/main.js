console.log('\'Allo \'Allo!');

var results = $.ajax({
type: 'GET',
url:'https://openapi.etsy.com/v2/listings/active.js?callback=etsyResults&api_key=kr9rjq7dc9c24jv6fccq2hus',
data: ''
})