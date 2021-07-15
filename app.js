// <----- Variables ----->
const width = 5
const height = 9
const gridCellCount = width * height
const cells = []

// <----- Testing building grid ----->
const grid = document.querySelector('.grid')

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.innerHTML = i
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()

// <----- Testing creating and removing sprites ----->
let georgePosition = 42
const soupNaziPosition = 30
let currentSoupNaziPosition = 30
const uncleLeoPosition = 29
let currentUncleLeoPosition = 29
const taxiPosition = 14

// function addGeorgeFrogger(position) {
//   cells[position].classList.add('george')
// }
// addGeorgeFrogger(startPosition)

// function addSoupNazi(position) {
//   cells[position].classList.add('soup-nazi')
// }
// addSoupNazi(soupNaziPosition)

// function addTaxi(position) {
//   cells[position].classList.add('taxi')
// }
// addTaxi(taxiPosition)

// Combining individual functions above into one addSprite function
function addSprite(position, assignedClass) {
  cells[position].classList.add(assignedClass)
}

addSprite(georgePosition, 'george')
addSprite(soupNaziPosition, 'soup-nazi')
addSprite(taxiPosition, 'taxi')
addSprite(uncleLeoPosition, 'uncle-leo')

// And removing...
function removeSprite(position, assignedClass) {
  cells[position].classList.remove(assignedClass)
}

// <----- Testing moving with arrow keys ----->
// Make sure you change georgePosition to let now!

function moveGeorge(event) {

  // Then using removeSprite function so George is only in current position and not last place he moved from
  removeSprite(georgePosition, 'george')

  // Then logic for each direction 
  // can still go over onto a different row, but I'll see if we can tackle that later!
  switch (event.keyCode) {
    case 39:
      if (georgePosition < cells.length - 1) {
        georgePosition++
        console.log(georgePosition)
      }
      break
    case 37:
      if (georgePosition > 0) {
        georgePosition--
        console.log(georgePosition)
      }
      break
    case 38:
      if (georgePosition >= width) {
        georgePosition -= width
        console.log(georgePosition)
      }
      break
    case 40:
      if (georgePosition <= cells.length - width) {
        georgePosition += width
        console.log(georgePosition)
      }
      break
  }
  // Then you want to add george class to new cell you enter!
  addSprite(georgePosition, 'george')
}

// Then an event to listen out for the arrow buttons
window.addEventListener('keyup', moveGeorge)

// <----- Testing moving sprites ----->

function moveSoupNazi() {
  setInterval(() => {
    if (currentSoupNaziPosition === soupNaziPosition + (width - 1)) {
      removeSprite(currentSoupNaziPosition, 'soup-nazi')
      currentSoupNaziPosition = soupNaziPosition
      addSprite(currentSoupNaziPosition, 'soup-nazi')
    } else if (currentSoupNaziPosition < soupNaziPosition + (width - 1)) {
      removeSprite(soupNaziPosition, 'soup-nazi')
      removeSprite(currentSoupNaziPosition, 'soup-nazi')
      currentSoupNaziPosition++
      addSprite(currentSoupNaziPosition, 'soup-nazi')
    }
  }, 700)
}
moveSoupNazi()

function moveUncleLeo() {
  setInterval(() => {
    if (currentUncleLeoPosition === uncleLeoPosition - (width - 1)) {
      removeSprite(currentUncleLeoPosition, 'uncle-leo')
      currentUncleLeoPosition = uncleLeoPosition
      addSprite(currentUncleLeoPosition, 'uncle-leo')
    } else if (currentUncleLeoPosition > uncleLeoPosition - (width - 1)) {
      removeSprite(uncleLeoPosition, 'uncle-leo')
      removeSprite(currentUncleLeoPosition, 'uncle-leo')
      currentUncleLeoPosition--
      addSprite(currentUncleLeoPosition, 'uncle-leo')
    }
  }, 1000)
}
moveUncleLeo()




