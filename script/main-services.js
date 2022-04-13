'use strict'

var gFirstLine

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'angry'] },
  { id: 2, url: 'img/2.jpg', keywords: ['dogs', 'cute'] },
  { id: 3, url: 'img/3.jpg', keywords: ['dogs', 'cute'] },
  { id: 4, url: 'img/4.jpg', keywords: ['dogs', 'cute'] },
  { id: 5, url: 'img/5.jpg', keywords: ['dogs', 'cute'] },
  { id: 6, url: 'img/6.jpg', keywords: ['dogs', 'cute'] },
  { id: 7, url: 'img/7.jpg', keywords: ['dogs', 'cute'] },
  { id: 8, url: 'img/8.jpg', keywords: ['dogs', 'cute'] },
  { id: 9, url: 'img/9.jpg', keywords: ['dogs', 'cute'] },
  { id: 10, url: 'img/10.jpg', keywords: ['dogs', 'cute'] },
]
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      img: '1',
      id: makeId(),
      txt: 'Enter Text',
      size: 50,
      align: 'center',
      color: 'black',
      outline: 'none',
      pos: { x: 200, y: 100 },
    },
    {
      img: '2',
      id: makeId(),
      txt: 'Enter Text',
      size: 50,
      align: 'center',
      color: 'black',
      outline: 'none',
      pos: { x: 200, y: 100 },
    },
    {
      img: '1',
      id: makeId(),
      txt: 'LALA',
      size: 50,
      align: 'center',
      color: 'red',
      outline: 'black',
      pos: { x: 200, y: 300 },
    },
  ],
}

function getImg(imgIdx) {
  let img = gImgs[imgIdx - 1]
  return img.url
}

function getText(imgIdx) {
  const lines = gMeme.lines
  var memeTxt = lines.filter((line) => imgIdx === line.img)
  return memeTxt
}

function setLineTxt(val) {
  const Idx = gMeme.selectedLineIdx
  const line = gMeme.lines[Idx]
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
  let i = gMeme.selectedLineIdx
  while (i < gMeme.lines.length) {
    gMeme.selectedLineIdx++
    i++
    if (i === gMeme.lines.length) {
      i = 0
      gMeme.selectedLineIdx = 0
    }
    if (gMeme.lines[i].img === gMeme.selectedImgId) {
      return gMeme.lines[i]
    }
  }
}
