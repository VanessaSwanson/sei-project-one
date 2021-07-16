// <----- Variables ----->
const width = 7
const height = 9
const gridCellCount = width * height
const cells = []
const square = document.querySelectorAll('.square')

// <----- Testing building grid ----->
const grid = document.querySelector('.grid')

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.innerHTML = i
    cell.classList.add('square')
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()

// <----- Testing border to see if it helps sprite movement ----->
// Really long code atm - will try to simplify at a later stage
// Need to adapt George left and right functionality accordingly

// const borderCells = []

// function addToBorderArray() {
//   cells.forEach(cell => {
//     if ((cell.innerHTML % width === 0)) {
//       borderCells.push(cell)  
//     } 
//     // console.log(borderCells)
//   })
// }
// addToBorderArray()

// function addBorderClass() {
//   borderCells.forEach(cell => {
//     cell.classList.add('border')
//   })
// }
// addBorderClass()

// const rightBorderCells = []

// function addToRightBorderArray() {
//   borderCells.forEach(cell => {
//     const rightBorderCellValue = parseFloat(cell.innerHTML) + width - 1
//     rightBorderCells.push(rightBorderCellValue)
//     console.log(rightBorderCellValue)
//   })
// }
// addToRightBorderArray()
// console.log(rightBorderCells)

// function addRightBorderClass() {
//   cells.forEach(cell => {
//     if (rightBorderCells.includes(parseFloat(cell.innerHTML)))
//     cell.classList.add('border')
//   })
// }
// addRightBorderClass()

// <----- Testing creating and removing sprites ----->
// let georgePosition = 59
// const soupNaziPosition = 42
// let currentSoupNaziPosition = 42
// const uncleLeoPosition = 41
// let currentUncleLeoPosition = 41
// const taxiPosition = 12

let georgePosition = 59
const soupNaziPosition = [42, 45]
let currentSoupNaziPosition = [42, 45]
const uncleLeoPosition = [41, 37]
let currentUncleLeoPosition = [41, 37]
const taxiPosition = 12
const busPosition = [14, 18]
let currentBusPosition = [14, 18]


function addSprite(position, assignedClass) {
  cells[position].classList.add(assignedClass)
}

soupNaziPosition.forEach(soupNazi => {
  addSprite(soupNazi, 'soup-nazi')
})

uncleLeoPosition.forEach(uncleLeo => {
  addSprite(uncleLeo, 'uncle-leo')
})

addSprite(georgePosition, 'george')

busPosition.forEach(bus => {
  addSprite(bus, 'bus')
})


// And removing...
function removeSprite(position, assignedClass) {
  cells[position].classList.remove(assignedClass)
}



// <----- Testing moving with arrow keys ----->

console.log(cells[georgePosition].classList)

function moveGeorge(event) {

  // removeSprite function so George is only in current position and not last place he moved from
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

// hard coding for now just to test accessing arrays

function moveSoupNaziRight() {
  currentSoupNaziPosition = soupNaziPosition.map(soupNazi => {
    setInterval(() => {
      if (soupNazi === 48) {
        removeSprite(soupNazi, 'soup-nazi')
        soupNazi = 42
        addSprite(soupNazi, 'soup-nazi')
      } else if (soupNazi < 48) {
        removeSprite(soupNazi, 'soup-nazi')
        soupNazi++ 
        addSprite(soupNazi, 'soup-nazi')
      }
    }, 700)
  })
}
moveSoupNaziRight()

function moveBusRight() {
  currentBusPosition = busPosition.map(bus => {
    setInterval(() => {
      if (bus === 20) {
        removeSprite(bus, 'bus')
        bus = 14
        addSprite(bus, 'bus')
      } else if (bus < 20) {
        removeSprite(bus, 'bus')
        bus++
        addSprite(bus, 'bus')
      }
    }, 1500)
  })
  console.log(currentBusPosition)
}
moveBusRight()

function moveUncleLeoLeft() {
  currentUncleLeoPosition = uncleLeoPosition.map(uncleLeo => {
    setInterval(() => {
      if (uncleLeo === 35) {
        removeSprite(uncleLeo, 'uncle-leo')
        uncleLeo = 41
        addSprite(uncleLeo, 'uncle-leo')
      } else if (uncleLeo > 35) {
        removeSprite(uncleLeo, 'uncle-leo')
        uncleLeo--
        addSprite(uncleLeo, 'uncle-leo')
      }
    }, 1000)
  })
}
moveUncleLeoLeft()


// <----- Making George move with the buses ----->
// repetition of function, but again, just testing for now
// Moving one space ahead of bus!!

function moveGeorgeRight() {
  setInterval(() => {
    if (georgePosition === 20 && cells[georgePosition].classList.contains('bus')) {
      removeSprite(georgePosition, 'george')
      georgePosition = 14
      addSprite(georgePosition, 'george')
    } else if (georgePosition < 20 && cells[georgePosition].classList.contains('bus')) {
      removeSprite(georgePosition, 'george')
      georgePosition++
      addSprite(georgePosition, 'george')
    }
  }, 1500)
}
console.log(cells[georgePosition].classList)
moveGeorgeRight()

 
// <----- Older versions of move functions for reference ----->

// function moveSoupNazi() {
//   setInterval(() => {
//     if (currentSoupNaziPosition === soupNaziPosition + (width - 1)) {
//       removeSprite(currentSoupNaziPosition, 'soup-nazi')
//       currentSoupNaziPosition = soupNaziPosition
//       addSprite(currentSoupNaziPosition, 'soup-nazi')
//     } else if (currentSoupNaziPosition < soupNaziPosition + (width - 1)) {
//       removeSprite(soupNaziPosition, 'soup-nazi')
//       removeSprite(currentSoupNaziPosition, 'soup-nazi')
//       currentSoupNaziPosition++ 
//       addSprite(currentSoupNaziPosition, 'soup-nazi')
//     }
//   }, 700)
// }
// moveSoupNazi()

// function moveUncleLeo() {
//   setInterval(() => {
//     if (currentUncleLeoPosition === uncleLeoPosition - (width - 1)) {
//       removeSprite(currentUncleLeoPosition, 'uncle-leo')
//       currentUncleLeoPosition = uncleLeoPosition
//       addSprite(currentUncleLeoPosition, 'uncle-leo')
//     } else if (currentUncleLeoPosition > uncleLeoPosition - (width - 1)) {
//       removeSprite(uncleLeoPosition, 'uncle-leo')
//       removeSprite(currentUncleLeoPosition, 'uncle-leo')
//       currentUncleLeoPosition--
//       addSprite(currentUncleLeoPosition, 'uncle-leo')
//     }
//   }, 1000)
// }
// moveUncleLeo()


