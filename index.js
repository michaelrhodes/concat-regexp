var slice = Array.prototype.slice
var boundary = /(^\/|\/$)/g
var modifier = /(^|\/)([migy]*)?$/

module.exports = function() {
  var pieces = slice.call(arguments)
  var piece = undefined
  var modifiers = undefined
  var regexp = ''

  var i = 0
  var last = pieces.length - 1
  var loner = last === i 

  for (; i <= last; i++) {
    // Be kind, tolerate undefined
    if (pieces[i] === undefined) {
      continue 
    }

    // Remove forward-slash boundaries
    piece = pieces[i].toString()

    // Don’t strip the boundaries of
    // lone regular expressions
    if (loner && boundary.test(piece)) {
      regexp += piece
      continue
    }

    // Add sanitised piece
    if (i < last) {
      regexp += piece.replace(boundary, '')
      continue
    }

    // Find modifiers in the last piece
    regexp += piece
      .replace(modifier, '')
      .replace(boundary, '')

    modifiers = (piece.match(modifier) || [])
      .slice(2)
      .join('')
  }

  return RegExp(regexp, modifiers)
}
