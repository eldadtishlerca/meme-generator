'use strict'

function makeId(length = 10) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function getRandomNum(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomText(len) {
  var text = ''

  var charset = 'abcdefghijklmnopqrstuvwxyz'

  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length))

  return text
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function capitalizeFirstLetter(string) {
  let firstLetter = string.charAt(0).toUpperCase()
  let otherLetters = string.substring(1)
  otherLetters = otherLetters.toLowerCase()
  return firstLetter + otherLetters
}
