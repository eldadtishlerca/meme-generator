function saveToStorage(key, val) {
  var json = JSON.stringify(val)
  localStorage.setItem(key, json)
}

function loadFromStorage(key) {
  const json = localStorage.getItem(key)
  const val = JSON.parse(json)
  return val
}

function deleteLocalStorage() {
  localStorage.removeItem('memesDB')
}

function saveMemesToStorage() {
  saveToStorage('memesDB', gSavedMemes)
}

function saveImgsToStorage() {
  saveToStorage('memesImgDB', gSavedImgs)
}
