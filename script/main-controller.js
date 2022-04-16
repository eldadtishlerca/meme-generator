'use strict'

var gElCanvas
var gCtx
var gCurrectLineId = 0
var isFirstRender = true
var isRandomText = false
var isLineChange = false
var gStartPos
var gLineCenter

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

  addListeners()
  renderGallery()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  console.log(getEvPos(ev))
  if (isLineClicked(pos) === false) return
  setLineDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const line = getLine()
  if (!line) return
  if (line.isDrag === false) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(line, dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp(ev) {
  setLineDrag(false)
  document.body.style.cursor = 'auto'
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
          onclick="onClickImg(this.id)"
        />
      </div>`
  )
  document.querySelector('.gallery').innerHTML += strHtmls.join('')
}

function onClickImg(val) {
  const imgIdx = val
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
  const idx = gMeme.selectedImgId
  const img = getImg(idx)
  loadImage(img, renderImg)
  if (isFirstRender) {
    if (isRandomText) {
      var oneOrTwo = getRandomNum(1, 2)
      if (oneOrTwo === 2) {
        console.log(oneOrTwo)
        const line = createRandomLine()
        setTimeout(
          drawText,
          5,
          line.txt,
          line.color,
          line.outline,
          line.size,
          line.pos.x,
          line.pos.y
        )
      }
      const line = createRandomLine()
      setTimeout(
        drawText,
        1,
        line.txt,
        line.color,
        line.outline,
        line.size,
        line.pos.x,
        line.pos.y
      )
      renderSelectBox()
    } else {
      const line = createFirstLine()
      setTimeout(
        drawText,
        5,
        line.txt,
        line.color,
        line.outline,
        line.size,
        line.pos.x,
        line.pos.y,
        line.font
      )
      renderSelectBox()
    }
    isFirstRender = false
    renderInput()
  } else {
    if (gMeme.lines.length === 0) {
      renderInput()
    } else {
      setTimeout(renderTxt, 5, gMeme.lines)
      renderInput()
      renderSelectBox()
    }
  }
}

function renderSelectBox() {
  const idx = gMeme.selectedLineIdx
  const line = gMeme.lines[idx]
  setTimeout(
    drawRect,
    5,
    line.txt,
    line.size,
    line.pos.x,
    line.pos.y,
    line.font
  )
}

function renderTxt(txtArr) {
  txtArr.forEach((str) => {
    const text = str.txt
    const color = str.color
    const outline = str.outline
    const size = str.size
    const posX = str.pos.x
    const posY = str.pos.y
    const font = str.font
    drawText(text, color, outline, size, posX, posY, font)
  })
}

function drawText(txt, fill, stroke, size, x, y, font) {
  gCtx.font = `${size}px ${font}`
  gCtx.fillStyle = fill
  gCtx.strokeStyle = stroke
  gCtx.lineWidth = 0.5
  gCtx.textAlign = 'left'
  gCtx.textBaseline = 'top'
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function renderInput() {
  const elInputTxt = document.querySelector('.input-txt')
  if (gMeme.lines.length === 0) {
    elInputTxt.setAttribute('placeholder', 'Please add new line')
  } else {
    const idx = gMeme.selectedLineIdx
    const line = gMeme.lines[idx]
    elInputTxt.setAttribute('placeholder', `${line.txt}`)
    elInputTxt.innerText = line.txt
    elInputTxt.value = ''
  }
}

function onChangeTxt(val) {
  setLineTxt(val)
  renderMeme()
}

function onChangeLine() {
  changeLine()
  // const elInputTxt = document.querySelector('.input-txt')
  // elInputTxt.setAttribute('placeholder', res.txt)
  // elInputTxt.setAttribute('id', res.id)
  // isLineChange = true
  renderMeme()
}

function onAddLine() {
  createLine()
  renderMeme()
}

function onDeleteLine() {
  const idx = gMeme.selectedLineIdx
  deleteLine(idx)
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

function onFillterCategory(elSpan) {
  const str = elSpan.innerText
  const filterImages = gImgs.filter((img) => img.keywords.includes(str))
  var strHtmls = filterImages.map(
    (img) =>
      `<div class="gallery-item">
        <img
          src=${img.url}
          id=${img.id}
          alt=${img.keywords}
          onclick="onClickImg(this.id)"
        />
      </div>`
  )
  document.querySelector('.gallery').innerHTML = strHtmls.join('')
  switch (str) {
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

// Bonus Phase

function onCreateRandom() {
  var idx = getRandomNum(1, 10)
  isRandomText = true
  onClickImg(idx)
}

// function onSaveMeme() {
// var newCanvas = document.querySelector('#my-canvas')
// var dataURL = newCanvas.toDataURL()
// saveCanvas(dataURL)
// saveMeme()
// }

function onSetFilter(val) {
  const str = capitalizeFirstLetter(val)
  const filterImages = gImgs.filter((img) => img.keywords.includes(str))
  var strHtmls = filterImages.map(
    (img) =>
      `<div class="gallery-item">
        <img
          src=${img.url}
          id=${img.id}
          alt=${img.keywords}
          onclick="onClickImg(this.id)"
        />
      </div>`
  )
  document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onAddEmoji(val) {
  const posX = getRandomNum(30, 450)
  const posY = getRandomNum(30, 450)
  addEmojiLine(val, posX, posY)
  drawEmoji(val, posX, posY)
}

function drawEmoji(val, x, y) {
  drawText(val, 'black', 'black', 50, x, y)
  renderMeme()
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // if (gTouchEvs.includes(ev.type)) {
  //   ev.preventDefault()
  //   ev = ev.changedTouches[0]
  //   pos = {
  //     x: ev.pageX - ev.target.offsetLeft,
  //     y: ev.pageY - ev.target.offsetTop,
  //   }
  // }
  return pos
}

function drawRect(txt, size, x, y, font) {
  gCtx.beginPath()
  gCtx.font = `${size}px ${font}`
  gCtx.strokeStyle = 'gray'
  gCtx.lineWidth = 2
  gCtx.textAlign = 'left'
  gCtx.textBaseline = 'top'
  gCtx.setLineDash([6])
  var textWidth = gCtx.measureText(txt).width
  var lineHeight = size
  gCtx.strokeRect(x, y, textWidth, lineHeight)
  gLineCenter = {
    x: (x * 2 + textWidth) / 2,
    y: (y * 2 + lineHeight) / 2,
    sizeX: textWidth / 2,
    sizeY: lineHeight / 2,
  }
}
