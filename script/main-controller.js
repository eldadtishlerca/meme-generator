'use strict'

var gElCanvas
var gCtx
var gIsFirstRender = true
var gCurrectLineId = 0

function onInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')

  renderGallery()
}

function renderGallery() {
  const images = gImgs
  var strHtmls = images.map(
    (img) =>
      `<div class="gallery-item">
        <img
          src=${img.url}
          id=${img.id}
          alt=${img.keywords}
          onclick="onClickImg(this)"
        />
      </div>`
  )
  document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onClickImg(elImg) {
  const imgIdx = elImg.id
  var elGallery = document.querySelector('.gallery-container')
  elGallery.classList.add('hidden')
  elGallery.classList.remove('show')
  var elModal = document.querySelector('.editor-container')
  elModal.classList.remove('hidden')
  elModal.classList.add('show')
  memeController(imgIdx)
}

function memeController(val) {
  gMeme.selectedImgId = val
  renderMeme()
}

function loadImage(val, onImageReady) {
  var img = new Image()
  img.src = val
  img.onload = onImageReady.bind(null, img)
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
  const Idx = gMeme.selectedImgId
  const img = getImg(Idx)
  loadImage(img, renderImg)
  const memeTxt = getText(Idx)
  setTimeout(renderTxt, 5, memeTxt)
  renderInput(Idx)
}

function renderTxt(txtArr) {
  txtArr.forEach((str) => {
    const text = str.txt
    const color = str.color
    const outline = str.outline
    const size = str.size
    const posX = str.pos.x
    const posY = str.pos.y
    drawText(text, color, outline, size, posX, posY)
  })
}

function drawText(txt, fill, stroke, font, x, y) {
  gCtx.font = `${font}px serif`
  gCtx.fillStyle = fill
  gCtx.strokeStyle = stroke
  gCtx.lineWidth = 0.2
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function renderInput(val) {
  if (gIsFirstRender) {
    const idx = val.toString()
    const elInputTxt = document.querySelector('.input-txt')
    const line = gMeme.lines.find((line) => line.img === idx)
    elInputTxt.setAttribute('placeholder', `${line.txt}`)
    elInputTxt.value = ''
  } else {
    return
  }
  gIsFirstRender = false
}

function onChangeTxt(val, id) {
  setLineTxt(val, id)
  renderMeme()
}

function onChangeSize(diff) {
  changeSize(diff)
  renderMeme()
}

function onChangeFill(val) {
  changeFillColor(val)
  renderMeme()
}

function onChangeStroke(val) {
  changeStrokeColor(val)
  renderMeme()
}

function onChangeLine() {
  if (gMeme.selectedLineIdx === gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }
  var res = changeLine()
  const elInputTxt = document.querySelector('.input-txt')
  elInputTxt.setAttribute('placeholder', `${res.txt}`)
  elInputTxt.value = ''
  renderMeme()
}
