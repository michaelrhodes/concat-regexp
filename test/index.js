var run = require('tape').test
var concat = require('../')

run('it combines string and regexp objects', function(test) {
  var expected = /([a-z0-9]{12,16})[f-x]{2}/
  var result = concat(
    /([a-z0-9]{12,16})/, '[f-x]{2}'
  )
  test.equal(
    result.toString(),
    expected.toString()
  )
  test.end()
})

run('it adds modifiers', function(test) {
  var expected = /^[a-z]{2}$/i

  var one = concat('^', /[a-z]{2}$/, 'i')
  test.equal(
    one.toString(),
    expected.toString()
  )

  var two = concat(/^[a-z]{2}/, /$/i)
  test.equal(
    two.toString(),
    expected.toString()
  )

  test.end()
})
