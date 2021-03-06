'use strict'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['Men', 'Comic'] },
  { id: 2, url: 'img/2.jpg', keywords: ['Animal', 'Smile'] },
  { id: 3, url: 'img/3.jpg', keywords: ['Funny', 'Comic'] },
  { id: 4, url: 'img/4.jpg', keywords: ['Animal', 'Funny'] },
  { id: 5, url: 'img/5.jpg', keywords: ['Men', 'Comic'] },
  { id: 6, url: 'img/6.jpg', keywords: ['Men', 'Funny'] },
  { id: 7, url: 'img/7.jpg', keywords: ['Comic', 'Funny'] },
  { id: 8, url: 'img/8.jpg', keywords: ['Men', 'Smile'] },
  { id: 9, url: 'img/9.jpg', keywords: ['Women', 'Comic'] },
  { id: 10, url: 'img/10.jpg', keywords: ['Men', 'Smile'] },
  { id: 12, url: 'img/11.jpg', keywords: ['Men', 'Comic'] },
  { id: 13, url: 'img/12.jpg', keywords: ['Men', 'Comic'] },
  { id: 14, url: 'img/13.jpg', keywords: ['Men', 'Funny'] },
  { id: 15, url: 'img/14.jpg', keywords: ['Men', 'Comic'] },
  { id: 16, url: 'img/15.jpg', keywords: ['Men', 'Funny'] },
  { id: 17, url: 'img/16.jpg', keywords: ['Men'] },
  { id: 18, url: 'img/17.jpg', keywords: ['Men', 'Smile'] },
]
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [],
  id: makeId(),
}

var gSavedMemes = []
var gSavedImgs = []

function getImg() {
  const idx = gMeme.selectedImgId
  const img = gImgs[idx - 1]
  return img.url
}

function createFirstLine() {
  const line = {
    id: makeId(),
    txt: 'Enter your Text',
    size: 50,
    align: 'center',
    color: 'white',
    outline: 'black',
    font: 'impact',
    pos: { x: 50, y: 50 },
    isDrag: false,
  }
  gMeme.lines.unshift(line)
  return line
}

function createLine() {
  const line = {
    id: makeId(),
    txt: 'Enter your Text',
    size: 50,
    align: 'center',
    color: 'white',
    outline: 'black',
    font: 'impact',
    pos: { x: 50, y: 400 },
    isDrag: false,
  }
  if (gMeme.lines.length === 0) {
    gMeme.lines.push(line)
    return
  } else {
    gMeme.lines.push(line)
    gMeme.selectedLineIdx++
  }
}

function addEmojiLine(val, x, y) {
  const line = {
    id: makeId(),
    txt: val.toString(),
    size: 50,
    align: 'center',
    color: 'black',
    outline: 'black',
    font: 'impact',
    pos: { x: x, y: y },
    isDrag: false,
  }
  gMeme.lines.unshift(line)
}

function deleteLine(val) {
  gMeme.lines.splice(val, 1)
  if (gMeme.selectedLineIdx === 0) {
    return
  } else {
    gMeme.selectedLineIdx--
  }
}

function createRandomLine() {
  const line = {
    id: makeId(),
    txt: getRandomText(15),
    size: getRandomNum(14, 50),
    align: 'center',
    color: getRandomColor().toString(),
    outline: getRandomColor().toString(),
    font: 'impact',
    pos: { x: getRandomNum(30, 200), y: getRandomNum(1, 400) },
    isDrag: false,
  }
  gMeme.lines.unshift(line)
  return line
}

function setLineTxt(val) {
  const idx = gMeme.selectedLineIdx
  const line = gMeme.lines[idx]
  line.txt = val
}

function changeSize(diff) {
  const Idx = gMeme.selectedLineIdx
  const line = gMeme.lines[Idx]
  line.size += diff
}

function changeFillColor(color) {
  const Idx = gMeme.selectedLineIdx
  const line = gMeme.lines[Idx]
  line.color = color
}

function changeStrokeColor(color) {
  const Idx = gMeme.selectedLineIdx
  const line = gMeme.lines[Idx]
  line.outline = color
}

function changeLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  }
}

function loadSavedMemes() {
  const memes = loadFromStorage('memesDB')
  gSavedMemes = memes
}

function loadSavedMemesImgs() {
  const memesImgs = loadFromStorage('memesImgDB')
  gSavedImgs = memesImgs
}

function saveMeme(data) {
  if (gSavedMemes === null && gSavedImgs === null) {
    gSavedMemes = []
    gSavedImgs = []
  }
  gSavedMemes.push(gMeme)
  gSavedImgs.push(data)
  saveMemesToStorage()
  saveImgsToStorage()
}

function isLineClicked(clickedPos) {
  const pos = gLineCenter
  const sizeX = gLineCenter.sizeX
  const sizeY = gLineCenter.sizeY
  if (
    clickedPos.x >= pos.x - sizeX &&
    clickedPos.x <= pos.x + sizeX &&
    clickedPos.y >= pos.y - sizeY &&
    clickedPos.y <= pos.y + sizeY
  ) {
    return true
  } else {
    return false
  }
}

function setLineDrag(isDrag) {
  const idx = gMeme.selectedLineIdx
  const line = gMeme.lines[idx]
  line.isDrag = isDrag
}

function getLine() {
  const idx = gMeme.selectedLineIdx
  const line = gMeme.lines[idx]
  return line
}

function moveLine(line, dx, dy) {
  line.pos.x += dx
  line.pos.y += dy
}

function setFont(font) {
  const idx = gMeme.selectedLineIdx
  gMeme.lines[idx].font = font
}
