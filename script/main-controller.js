'use strict'

var gElCanvas
var gCtx
var gIsFirstRender = true
var gCurrectLineId = 0
var gFontSizeFunny = 20
var gPaddingFunny = 20
var gFontSizeAnimal = 20
var gPaddingAnimal = 20
var gFontSizeMen = 20
var gPaddingMen = 20
var gFontSizeComic = 20
var gPaddingComic = 20
var gFontSizeWomen = 20
var gPaddingWomen = 20
var gFontSizeSmile = 20
var gPaddingSmile = 20

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
  var elMain = document.querySelector('.main-layout')
  elMain.style.backgroundColor = '#21242C'
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

function onFillterCategory(elSpan) {
  switch (elSpan.innerText) {
    case 'Funny':
      if (gFontSizeFunny === 30) {
        return
      } else {
        gFontSizeFunny += 2
        elSpan.style.fontSize = `${gFontSizeFunny}px`
        gPaddingFunny -= 2
        elSpan.style.paddingRight = `${gPaddingFunny}px`
        elSpan.style.paddingLeft = `${gPaddingFunny + 10}px`
      }
      break
    case 'Animal':
      if (gFontSizeAnimal === 30) {
        return
      } else {
        gFontSizeAnimal += 2
        elSpan.style.fontSize = `${gFontSizeAnimal}px`
        gPaddingAnimal -= 2
        elSpan.style.paddingRight = `${gPaddingAnimal}px`
        elSpan.style.paddingLeft = `${gPaddingAnimal}px`
      }
      break
    case 'Men':
      if (gFontSizeMen === 30) {
        return
      } else {
        gFontSizeMen += 2
        elSpan.style.fontSize = `${gFontSizeMen}px`
        gPaddingMen -= 2
        elSpan.style.paddingRight = `${gPaddingMen}px`
        elSpan.style.paddingLeft = `${gPaddingMen}px`
      }
      break
    case 'Comic':
      if (gFontSizeComic === 30) {
        return
      } else {
        gFontSizeComic += 2
        elSpan.style.fontSize = `${gFontSizeComic}px`
        gPaddingComic -= 2
        elSpan.style.paddingRight = `${gPaddingComic}px`
        elSpan.style.paddingLeft = `${gPaddingComic}px`
      }
      break
    case 'Women':
      if (gFontSizeWomen === 30) {
        return
      } else {
        gFontSizeWomen += 2
        elSpan.style.fontSize = `${gFontSizeWomen}px`
        gPaddingWomen -= 2
        elSpan.style.paddingRight = `${gPaddingWomen}px`
        elSpan.style.paddingLeft = `${gPaddingWomen}px`
      }
      break
    case 'Smile':
      if (gFontSizeSmile === 30) {
        return
      } else {
        gFontSizeSmile += 2
        elSpan.style.fontSize = `${gFontSizeSmile}px`
        gPaddingSmile -= 2
        elSpan.style.paddingRight = `${gPaddingSmile + 10}px`
        elSpan.style.paddingLeft = `${gPaddingSmile}px`
      }
  }
}
