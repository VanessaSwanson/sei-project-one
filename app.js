// <----- Variables ----->
const width = 11
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

// <----- Testing start screen ----->
const enterButton = document.querySelector('#enter')
const startScreen = document.querySelector('#startScreen')
const mainGameDisplay = document.querySelector('.main')

function startScreenEnter() {
  startScreen.style.display = 'none'
  mainGameDisplay.style.display = 'flex'
}
enterButton.addEventListener('click', startScreenEnter)

// <----- Testing border ----->
// Really long code atm - will try to simplify at a later stage
// In George movement function, added that once George is in a borderLeft or borderRight cell, he can't move left or right - stops him being able to travel over edge of rows

const borderCells = []

function addToLeftBorderArray() {
  cells.forEach(cell => {
    if ((cell.innerHTML % width === 0)) {
      borderCells.push(cell)  
    } 
    // console.log(borderCells)
  })
}
addToLeftBorderArray()

function addLeftBorderClass() {
  borderCells.forEach(cell => {
    cell.classList.add('borderLeft')
  })
}
addLeftBorderClass()

const rightBorderCells = []

function addToRightBorderArray() {
  borderCells.forEach(cell => {
    const rightBorderCellValue = parseFloat(cell.innerHTML) + width - 1
    rightBorderCells.push(rightBorderCellValue)
    console.log(rightBorderCellValue)
  })
}
addToRightBorderArray()
console.log(rightBorderCells)

function addRightBorderClass() {
  cells.forEach(cell => {
    if (rightBorderCells.includes(parseFloat(cell.innerHTML)))
    cell.classList.add('borderRight')
  })
}
addRightBorderClass()

// <----- Marking safe stretches on the board ----->
function createSafeRoad() {
  cells.filter(cell => {
    if (cell.innerHTML >= width * 5 && cell.innerHTML < width * 8) {
      cell.classList.add('safeRoad')
    }
  })
}
createSafeRoad()

function createMidStretch() {
  cells.filter(cell => {
    if (cell.innerHTML >= width * 4 && cell.innerHTML < width * 5) {
      cell.classList.add('midStretch')
    }
  })
}
createMidStretch()

function createStartStretch() {
  cells.filter(cell => {
    if(cell.innerHTML >= width * 8 && cell.innerHTML < width * 9)
    cell.classList.add('startStretch')
  })
}
createStartStretch()

// <----- Sprite positions ----->

const startPosition = Math.floor(cells.length - (width / 2))

let georgePosition = startPosition

const soupNaziPosition = [
  width * 6, 
  ((width * 6) + Math.floor(width/3)),
  ((width * 6) + Math.floor(width/3 * 2))
]
let currentSoupNaziPosition = [
  width * 6, 
  ((width * 6) + Math.floor(width/3)),
  ((width * 6) + Math.floor(width/3 * 2))
]
const uncleLeoPosition = [
  (width * 6) - 1, 
  (width * 5) + Math.floor(width/2),
]
let currentUncleLeoPosition = [
  (width * 6) - 1, 
  (width * 5) + Math.floor(width/2), 
]
const susanPosition = [
  (width * 8) - 1, 
  (width * 7) + Math.floor(width/2)
]
let currentSusanPosition = [
  (width * 8) - 1, 
  (width * 7) + Math.floor(width/2)
]
const taxiOnePosition = [
  width * 2,
  (width * 2)  + Math.ceil(width/3), 
  (width * 2)  + Math.ceil(width/3 * 2)
]
let currentTaxiOnePosition = [] 
const taxiTwoPosition = [
  taxiOnePosition[0]+1, 
  taxiOnePosition[1]+1,
  taxiOnePosition[2]+1
]
let currentTaxiTwoPosition = []

// BUSES
// Realised that reordering the buses stops George going straight to the front and allows you to move along the bus train!
const busThreePosition = [
  width, 
  width + Math.ceil(width/2), 
  width * 3, 
  (width * 3) + Math.ceil(width/2)
]
let currentBusThreePosition = []
const busTwoPosition = [
  busThreePosition[0]+1, 
  busThreePosition[1]+1, 
  busThreePosition[2]+1, 
  busThreePosition[3]+1
]
let currentBusTwoPosition = [
]
const busOnePosition = [
  busThreePosition[0]+2, 
  busThreePosition[1]+2, 
  busThreePosition[2]+2, 
  busThreePosition[3]+2,
]
let currentBusOnePosition = [
]


let currentCoffeePositionHome = 0
let currentCoffeePositionMid = (width * 4) + Math.floor(width/2)

// <----- Creating sprites ----->
function addSprite(position, assignedClass) {
  cells[position].classList.add(assignedClass)
}

addSprite(georgePosition, 'george')

soupNaziPosition.forEach(soupNazi => {
  addSprite(soupNazi, 'soup-nazi')
})
uncleLeoPosition.forEach(uncleLeo => {
  addSprite(uncleLeo, 'uncle-leo')
})
susanPosition.forEach(susan => {
  addSprite(susan, 'susan')
})
busOnePosition.forEach(bus => {
  addSprite(bus, 'busOne')
})
busTwoPosition.forEach(bus => {
  addSprite(bus, 'busTwo')
})
busThreePosition.forEach(bus => {
  addSprite(bus, 'busThree')
})
taxiOnePosition.forEach(taxi => {
  addSprite(taxi, 'taxiOne')
})
taxiTwoPosition.forEach(taxi => {
  addSprite(taxi, 'taxiTwo')
})

addSprite(currentCoffeePositionMid, 'coffee')
addSprite(currentCoffeePositionHome, 'coffee')

// And removing...
function removeSprite(position, assignedClass) {
  cells[position].classList.remove(assignedClass)
}


// <----- Testing moving with arrow keys ----->

console.log(cells[georgePosition].classList)

function moveGeorge(event) {
  if (gameisRunning) {
  // removeSprite function so George is only in current position and not last place he moved from
  removeSprite(georgePosition, 'george')

  // Then logic for each direction 
  switch (event.keyCode) {
    case 39:
      if (georgePosition < cells.length - 1 && !cells[georgePosition].classList.contains('borderRight')) {
        cells[georgePosition].classList.remove('busBackdrop')
        removeSprite(georgePosition, 'taxiBackdrop')
        georgePosition++
        console.log(georgePosition)
        arrivedAtHome()
        detectFallingInRoad()
        addCoffeePoints()
      }
      break
    case 37:
      if (georgePosition > 0 && !cells[georgePosition].classList.contains('borderLeft')) {
        cells[georgePosition].classList.remove('busBackdrop')
        removeSprite(georgePosition, 'taxiBackdrop')
        georgePosition--
        console.log(georgePosition)
        arrivedAtHome()
        detectFallingInRoad()
        addCoffeePoints()
      }
      break
    case 38:
      if (georgePosition >= width) {
        cells[georgePosition].classList.remove('busBackdrop')
        removeSprite(georgePosition, 'taxiBackdrop')
        georgePosition -= width
        console.log(georgePosition)
        arrivedAtHome()
        detectFallingInRoad()
        addCoffeePoints()
      }
      break
    case 40:
      if (georgePosition <= cells.length - width) {
        cells[georgePosition].classList.remove('busBackdrop')
        removeSprite(georgePosition, 'taxiBackdrop')
        georgePosition += width
        console.log(georgePosition)
        arrivedAtHome()
        detectFallingInRoad()
        addCoffeePoints()
      }
      break
    }
    addSprite(georgePosition, 'george')
  }
}
window.addEventListener('keyup', moveGeorge)

// <----- Coffee sprites and points ----->

// Only want the coffee to appear in safe spaces
// To make it more fun and to give more chances to earn points, I want it to appear in both home and mid-way stretch
function generateRandomCoffeePositionHome() {
  return Math.floor(Math.random() * width)
}
function generateRandomCoffeePositionMid() {
  const min = Math.ceil(width * 4)
  const max = Math.floor(width * 5)
  return Math.floor((Math.random() * (max - min) + min))
}

function moveCoffeeMid() {
  setInterval(() => {
    removeSprite(currentCoffeePositionMid, 'coffee')
    currentCoffeePositionMid = (generateRandomCoffeePositionMid())
    addSprite(currentCoffeePositionMid, 'coffee')
  }, 5000)
}
moveCoffeeMid()

function moveCoffeeHome() {
  setInterval(() => {
    removeSprite(currentCoffeePositionHome, 'coffee')
    currentCoffeePositionHome = (generateRandomCoffeePositionHome())
    addSprite(currentCoffeePositionHome, 'coffee')
  }, 5000)
}
moveCoffeeHome()

// <----- Testing adding score if George gets a coffee ----->
const scoreScreen = document.querySelector('#currentScore')
let currentScore = 0
console.log(scoreScreen.innerHTML)

function addCoffeePoints() {
  if (outOfLives) {
    currentScore = 0
    scoreScreen.innerHTML = currentScore
    georgeInRoad = false
    georgeHasCollided = false
    outOfLives = false
  } else if (cells[georgePosition].classList.contains('coffee')) {
    currentScore = currentScore + 100
    scoreScreen.innerHTML = currentScore
    removeSprite(georgePosition, 'coffee')
  }
}
// call in moveGeorge function


// <----- Moving float sprites ----->

function moveSoupNaziRight() {
  currentSoupNaziPosition = soupNaziPosition.map(soupNazi => {
    setInterval(() => {
      if (soupNazi === (width * 7) - 1) {
        removeSprite(soupNazi, 'soup-nazi')
        soupNazi = soupNazi - (width - 1)
        addSprite(soupNazi, 'soup-nazi')
        detectCollision()
      } else if ((width * 7) - 1) {
        removeSprite(soupNazi, 'soup-nazi')
        soupNazi++ 
        addSprite(soupNazi, 'soup-nazi')
        detectCollision()
      }
    }, 900)
  })
}
moveSoupNaziRight()

function moveUncleLeoLeft() {
  currentUncleLeoPosition = uncleLeoPosition.map(uncleLeo => {
    setInterval(() => {
      if (uncleLeo === width * 5) {
        removeSprite(uncleLeo, 'uncle-leo')
        uncleLeo = uncleLeo + width - 1
        addSprite(uncleLeo, 'uncle-leo')
        detectCollision()
      } else if (uncleLeo > width * 5) {
        removeSprite(uncleLeo, 'uncle-leo')
        uncleLeo--
        addSprite(uncleLeo, 'uncle-leo')
        detectCollision()
      }
    }, 1200)
  })
}
moveUncleLeoLeft()

function moveSusanLeft() {
  currentSusanPosition = susanPosition.map(susan => {
    setInterval(() => {
      if (susan === width * 7) {
        removeSprite(susan, 'susan')
        susan = susan + width - 1
        addSprite(susan, 'susan')
        detectCollision()
      } else if (susan > width * 7) {
        removeSprite(susan, 'susan')
        susan--
        addSprite(susan, 'susan')
        detectCollision()
      }
    }, 1200)
  })
}
moveSusanLeft()


let georgeOnFloat = null

function moveBusOneRight() {
  currentBusOnePosition = busOnePosition.map(bus => {
    setInterval(() => {
      if (bus === width * 2 - 1  && georgePosition === bus || bus === width * 4 - 1 && georgePosition === bus) {
        georgeOnFloat = true
        removeSprite(bus, 'george')
        addSprite(georgePosition, 'busBackdrop')
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // createCollisionPopup()
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        removeSprite(georgePosition, 'busBackdrop')
        addSprite(georgePosition, 'busOne')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      } else if (bus < width * 2 -1 && georgePosition === bus || bus < width * 4 - 1 && georgePosition === bus) {
        georgeOnFloat = true
        removeSprite(bus, 'busOne')
        removeSprite(bus, 'george')
        removeSprite(georgePosition, 'busBackdrop')
        bus++
        georgePosition++
        addSprite(bus, 'busOne')
        addSprite(georgePosition, 'busBackdrop') 
      } else if (bus === width * 2 - 1 || bus === width * 4 - 1) {
        removeSprite(bus, 'busOne')
        bus = bus - (width - 1)
        addSprite(bus, 'busOne')
      } else if (bus < width * 2 -1 || bus < width * 4 - 1) {
        removeSprite(bus, 'busOne')
        bus++
        addSprite(bus, 'busOne')
      }
    }, 1000)
  })
}
moveBusOneRight()

function moveBusTwoRight() {
  currentBusTwoPosition = busTwoPosition.map(bus => {
    setInterval(() => {
      if (bus === width * 2 - 1  && georgePosition === bus || bus === width * 4 - 1 && georgePosition === bus) {
        georgeOnFloat = true
        removeSprite(bus, 'george')
        addSprite(georgePosition, 'busBackdrop')
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // createCollisionPopup()
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        removeSprite(georgePosition, 'busBackdrop')
        addSprite(georgePosition, 'busTwo')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      } else if (bus < width * 2 -1 && georgePosition === bus || bus < width * 4 - 1 && georgePosition === bus) {
        georgeOnFloat = true
        removeSprite(bus, 'busTwo')
        removeSprite(bus, 'george')
        removeSprite(georgePosition, 'busBackdrop')
        bus++
        georgePosition++
        addSprite(bus, 'busTwo')
        addSprite(georgePosition, 'busBackdrop') 
      } else if (bus === width * 2 - 1 || bus === width * 4 - 1) {
        removeSprite(bus, 'busTwo')
        bus = bus - (width - 1)
        addSprite(bus, 'busTwo')
      } else if (bus < width * 2 -1 || bus < width * 4 - 1) {
        removeSprite(bus, 'busTwo')
        bus++
        addSprite(bus, 'busTwo')
      }
    }, 1000)
  })
}
moveBusTwoRight()

function moveBusThreeRight() {
  currentBusThreePosition = busThreePosition.map(bus => {
    setInterval(() => {
      if (bus === width * 2 - 1  && georgePosition === bus || bus === width * 4 - 1 && georgePosition === bus) {
        georgeOnFloat = true
        removeSprite(bus, 'george')
        addSprite(georgePosition, 'busBackdrop')
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // createCollisionPopup()
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        removeSprite(georgePosition, 'busBackdrop')
        addSprite(georgePosition, 'busThree')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      } else if (bus < width * 2 -1 && georgePosition === bus || bus < width * 4 - 1 && georgePosition === bus) {
        georgeOnFloat = true
        removeSprite(bus, 'busThree')
        removeSprite(bus, 'george')
        removeSprite(georgePosition, 'busBackdrop')
        bus++
        georgePosition++
        addSprite(bus, 'busThree')
        addSprite(georgePosition, 'busBackdrop') 
      } else if (bus === width * 2 - 1 || bus === width * 4 - 1) {
        removeSprite(bus, 'busThree')
        bus = bus - (width - 1)
        addSprite(bus, 'busThree')
      } else if (bus < width * 2 -1 || bus < width * 4 - 1) {
        removeSprite(bus, 'busThree')
        bus++
        addSprite(bus, 'busThree')
      }
    }, 1000)
  })
}
moveBusThreeRight()

function moveTaxiOneLeft() {
  currentTaxiOnePosition = taxiOnePosition.map(taxi => {
    setInterval(() => {
      if (taxi === width * 2  && georgePosition === taxi) {
        georgeOnFloat = true
        addSprite(georgePosition, 'taxiBackdrop')
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // createCollisionPopup()
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        removeSprite(georgePosition, 'taxiBackdrop')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      } else if (taxi > width * 2 && georgePosition === taxi) {
        georgeOnFloat = true
        removeSprite(taxi, 'taxiOne')
        removeSprite(taxi, 'george')
        removeSprite(georgePosition, 'taxiBackdrop')
        taxi--
        georgePosition--
        addSprite(taxi, 'taxiOne')
        addSprite(georgePosition, 'taxiBackdrop') 
      } else if (taxi === width * 2) {
        removeSprite(taxi, 'taxiOne')
        taxi = (width * 3) - 1
        addSprite(taxi, 'taxiOne')
      } else if (taxi > width * 2) {
        removeSprite(taxi, 'taxiOne')
        taxi--
        addSprite(taxi, 'taxiOne')
      }
    }, 1000)
  })
}
moveTaxiOneLeft()

function moveTaxiTwoLeft() {
  currentTaxiTwoPosition = taxiTwoPosition.map(taxi => {
    setInterval(() => {
      if (taxi === width * 2  && georgePosition === taxi) {
        georgeOnFloat = true
        addSprite(georgePosition, 'taxiBackdrop')
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // createCollisionPopup()
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        removeSprite(georgePosition, 'taxiBackdrop')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      } else if (taxi > width * 2 && georgePosition === taxi) {
        georgeOnFloat = true
        removeSprite(taxi, 'taxiTwo')
        removeSprite(taxi, 'george')
        removeSprite(georgePosition, 'taxiBackdrop')
        taxi--
        georgePosition--
        addSprite(taxi, 'taxiTwo')
        addSprite(georgePosition, 'taxiBackdrop') 
      } else if (taxi === width * 2) {
        removeSprite(taxi, 'taxiTwo')
        taxi = (width * 3) - 1
        addSprite(taxi, 'taxiTwo')
      } else if (taxi > width * 2) {
        removeSprite(taxi, 'taxiTwo')
        taxi--
        addSprite(taxi, 'taxiTwo')
      }
    }, 1000)
  })
}
moveTaxiTwoLeft()

// <----- Testing function to make George lose a life if he moves over edge while on a float ----->
function georgeOverEdgeWhileOnFloat(event) {
  switch(event.keyCode) {
    case 39:
      if ((georgeOnFloat && currentLives === 1) && cells[georgePosition].classList.contains('borderRight')) {
        livesCountdown()
        clearInterval(intervalId)
        currentLives = livesStart
        livesScreen.innerHTML = currentLives
        currentScore = 0
        scoreScreen.innerHTML = currentScore
        gameisRunning = false
        removeSprite(georgePosition, 'busBackdrop')
        removeSprite(georgePosition, 'george')
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        createOutOfLivesPopup()
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      }
      if (georgeOnFloat && cells[georgePosition].classList.contains('borderRight')) {
        removeSprite(georgePosition, 'busBackdrop')
        removeSprite(georgePosition, 'george')
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // window.alert('Oh no! You went off the edge')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      }
    break
    case 37:
      if ((georgeOnFloat && currentLives === 1) && cells[georgePosition].classList.contains('borderLeft')) {
        livesCountdown()
        clearInterval(intervalId)
        currentLives = livesStart
        livesScreen.innerHTML = currentLives
        currentScore = 0
        scoreScreen.innerHTML = currentScore
        gameisRunning = false
        removeSprite(georgePosition, 'busBackdrop')
        removeSprite(georgePosition, 'george')
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        createOutOfLivesPopup()
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      }
      if (georgeOnFloat && cells[georgePosition].classList.contains('borderLeft')) {
        removeSprite(georgePosition, 'taxiBackdrop')
        removeSprite(georgePosition, 'george')
        currentLives = currentLives - 1
        livesScreen.innerHTML = currentLives
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        // window.alert('Oh no! You went off the edge')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeOnFloat = false
      }
      break
    } 
}
window.addEventListener('keyup', georgeOverEdgeWhileOnFloat)




// function georgeOverEdgeWhileOnFloat(event) {
//   switch(event.keyCode) {
//     case 39:
//       if (((currentLives <= 1 && georgeOnFloat) && cells[georgePosition].classList.contains('borderRight')) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
//           georgeOnFloat = false
//           // removeSprite(georgePosition, 'george')
//           removeSprite(georgePosition, 'busBackdrop')
//           clearInterval(intervalId) 
//           audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
//           audio.play()
//           outOfLives = true
//           createOutOfLivesPopup()
//           currentCountdown = countdownStart
//           countdownScreen.innerHTML = currentCountdown
//           currentScore = 0
//           scoreScreen.innerHTML = currentScore
//           currentLives = livesStart
//           livesScreen.innerHTML = currentLives
//           removeSprite(georgeAtHomePosition, 'georgeAtHome')
//           removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
//           removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
//           removeSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
//           georgeAtHomePosition = null
//           secondGeorgeAtHomePosition = null
//           thirdGeorgeAtHomePosition = null
//           fourthGeorgeAtHomePosition = null
//           removeSprite(georgePosition, 'taxiBackdrop')
//           removeSprite(georgePosition, 'busBackdrop')
//           removeSprite(georgePosition, 'george')
//           georgePosition = startPosition
//           addSprite(georgePosition, 'george')
//           gameisRunning = false
//         } else if (((currentLives <= 1 && georgeOnFloat) && cells[georgePosition].classList.contains('borderRight')) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition) {
//           georgeOnFloat = false
//           // removeSprite(georgePosition, 'george')
//           removeSprite(georgePosition, 'busBackdrop')
//           audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
//           audio.play()
//           clearInterval(intervalId)
//           currentCountdown = countdownStart
//           countdownScreen.innerHTML = currentCountdown
//           removeSprite(georgeAtHomePosition, 'georgeAtHome')
//           removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
//           removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
//           georgeAtHome = true
//           outOfLives = true
//           createOutOfLivesPopup()
//           currentLives = livesStart
//           livesScreen.innerHTML = currentLives 
//           georgeAtHomePosition = null 
//           secondGeorgeAtHomePosition = null 
//           thirdGeorgeAtHomePosition = null 
//           georgePosition = startPosition
//           addSprite(georgePosition, 'george')
//           gameisRunning = false
//         } else if (((currentLives <= 1 && georgeOnFloat) && cells[georgePosition].classList.contains('borderRight')) && georgeAtHomePosition && secondGeorgeAtHomePosition) {
//           georgeOnFloat = false
//           // removeSprite(georgePosition, 'george')
//           removeSprite(georgePosition, 'busBackdrop')
//           audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
//           audio.play()
//           clearInterval(intervalId)
//           currentCountdown = countdownStart
//           countdownScreen.innerHTML = currentCountdown
//           removeSprite(georgeAtHomePosition, 'georgeAtHome')
//           removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
//           georgeAtHome = true
//           outOfLives = true
//           createOutOfLivesPopup()
//           currentLives = livesStart
//           livesScreen.innerHTML = currentLives 
//           georgeAtHomePosition = null 
//           secondGeorgeAtHomePosition = null 
//           georgePosition = startPosition
//           addSprite(georgePosition, 'george')
//           gameisRunning = false
//         } else if (((currentLives <= 1 && georgeOnFloat) && cells[georgePosition].classList.contains('borderRight')) && georgeAtHomePosition) {
//           georgeOnFloat = false
//           // removeSprite(georgePosition, 'george')
//           removeSprite(georgePosition, 'busBackdrop')
//           audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
//           audio.play()
//           clearInterval(intervalId)
//           currentCountdown = countdownStart
//           countdownScreen.innerHTML = currentCountdown
//           removeSprite(georgeAtHomePosition, 'georgeAtHome')
//           removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
//           georgeAtHome = true
//           outOfLives = true
//           createOutOfLivesPopup()
//           currentLives = livesStart
//           livesScreen.innerHTML = currentLives 
//           georgeAtHomePosition = null 
//           secondGeorgeAtHomePosition = null 
//           georgePosition = startPosition
//           addSprite(georgePosition, 'george')
//           gameisRunning = false
//         } else if (currentLives <= 1 && cells[georgePosition].classList.contains('borderRight')) {
//           georgeOnFloat = false
//           removeSprite(georgePosition, 'busBackdrop')
//           georgePosition = startPosition
//           addSprite(georgePosition, 'george')
//           audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
//           audio.play()
//           clearInterval(intervalId)
//           currentCountdown = countdownStart
//           countdownScreen.innerHTML = currentCountdown
//           removeSprite(georgeAtHomePosition, 'georgeAtHome')
//           removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
//           georgeAtHome = true
//           outOfLives = true
//           createOutOfLivesPopup()
//           currentLives = livesStart
//           livesScreen.innerHTML = currentLives 
//           georgeAtHomePosition = null 
//           secondGeorgeAtHomePosition = null 
//           gameisRunning = false
//         } else if (georgeOnFloat && cells[georgePosition].classList.contains('borderRight')) {
//           removeSprite(georgePosition, 'busBackdrop')
//           removeSprite(georgePosition, 'george')
//           currentLives = currentLives - 1
//           livesScreen.innerHTML = currentLives
//           audio.src = 'design-elements/audio/serenity.mp3'
//           audio.play()
//           georgePosition = startPosition
//           addSprite(georgePosition, 'george')
//           georgeOnFloat = false
//           // createCollisionPopup()
//         }
//     break
//     case 37:
//       if (georgeOnFloat && cells[georgePosition].classList.contains('borderLeft')) {
//         removeSprite(georgePosition, 'taxiBackdrop')
//         removeSprite(georgePosition, 'george')
//         currentLives = currentLives - 1
//         livesScreen.innerHTML = currentLives
//         audio.src = 'design-elements/audio/serenity.mp3'
//         audio.play()
//         // createCollisionPopup()
//         georgePosition = startPosition
//         addSprite(georgePosition, 'george')
//         georgeOnFloat = false
//       }
//       break
//     } 
// }
// window.addEventListener('keyup', georgeOverEdgeWhileOnFloat)

// <----- Function for popups----->
const popup = document.querySelector('#alert')
const closePopupButton = document.querySelector('.closebtn')
let popupMessage = document.querySelector('#alertMessage')
let popupImage = document.querySelector('.alertImage')

function createCollisionPopup() {
  popup.style.display = 'flex';
  popupMessage.innerHTML = 'Oh no!'
  popup.style.margin = '200px 0 0 0'
  popup.style.width = '300px'
  popup.style.height = '250px'
  popupImage.src=''
  clearInterval(intervalId)
}
function createOutOfLivesPopup() {
  popup.style.display = 'flex';
  popupMessage.innerHTML = 'You are out of lives, start again!'
  popup.style.margin = '150px 0 0 0'
  popup.style.width = '400px'
  popup.style.height = '500px'
  popupImage.src='https://media.giphy.com/media/1lwmbW7eYML9kLjpCA/giphy.gif'
  clearInterval(intervalId)
}
function createOutOfTimePopup() {
  popup.style.display = 'flex';
  popupMessage.innerHTML = 'You are out of time, start again!'
  popup.style.margin = '150px 0 0 0'
  popup.style.width = '400px'
  popup.style.height = '500px'
  popupImage.src='https://media.giphy.com/media/NiT29gUcZ3IS4/source.gif'
  clearInterval(intervalId)
}
function createYouWonPopup() {
  popup.style.display = 'flex';
  popupMessage.innerHTML = `You did it! You got George to Monk's diner! Your final score is ${currentScore}.`
  popup.style.margin = '150px 0 0 0'
  popup.style.width = '400px'
  popup.style.height = '500px'
  popupImage.src='https://media.giphy.com/media/13Y6LAZJqRspI4/source.gif'
  clearInterval(intervalId)
}

function closePopup() {
  if (outOfLives) {
    popup.style.display = 'none'
    clearInterval(intervalId)
  } else if (outOfLives = false) {
    popup.style.display = 'none'
    intervalId = setInterval(() => {
      currentCountdown--
      countdownScreen.innerHTML = currentCountdown
      gameisRunning = true
    },1000)
}
}
closePopupButton.addEventListener('click', closePopup)

// <----- Testing for collision ----->
let georgeHasCollided = null
const audio = document.querySelector('audio')

function detectCollision() {
if (cells[georgePosition].classList.contains('georgeAtHome') || cells[georgePosition].classList.contains('soup-nazi') || cells[georgePosition].classList.contains('uncle-leo') || cells[georgePosition].classList.contains('trash') || cells[georgePosition].classList.contains('susan')) {
  georgeHasCollided = true
}
if ((currentLives <= 1 && georgeHasCollided) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
  georgeHasCollided = false
  removeSprite(georgePosition, 'george')
  clearInterval(intervalId) 
  audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
  audio.play()
  outOfLives = true
  createOutOfLivesPopup()
  currentCountdown = countdownStart
  countdownScreen.innerHTML = currentCountdown
  currentScore = 0
  scoreScreen.innerHTML = currentScore
  currentLives = livesStart
  livesScreen.innerHTML = currentLives
  removeSprite(georgeAtHomePosition, 'georgeAtHome')
  removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
  removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
  removeSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
  georgeAtHomePosition = null
  secondGeorgeAtHomePosition = null
  thirdGeorgeAtHomePosition = null
  fourthGeorgeAtHomePosition = null
  removeSprite(georgePosition, 'taxiBackdrop')
  removeSprite(georgePosition, 'busBackdrop')
  removeSprite(georgePosition, 'george')
  georgePosition = startPosition
  addSprite(georgePosition, 'george')
  gameisRunning = false
} else if ((currentLives <= 1 && georgeHasCollided) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition) {
  georgeHasCollided = false
  removeSprite(georgePosition, 'george')
  audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
  audio.play()
  clearInterval(intervalId)
  currentCountdown = countdownStart
  countdownScreen.innerHTML = currentCountdown
  removeSprite(georgeAtHomePosition, 'georgeAtHome')
  removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
  removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
  georgeAtHome = true
  outOfLives = true
  createOutOfLivesPopup()
  currentLives = livesStart
  livesScreen.innerHTML = currentLives 
  georgeAtHomePosition = null 
  secondGeorgeAtHomePosition = null 
  thirdGeorgeAtHomePosition = null 
  georgePosition = startPosition
  addSprite(georgePosition, 'george')
  gameisRunning = false
} else if ((currentLives <= 1 && georgeHasCollided) && georgeAtHomePosition && secondGeorgeAtHomePosition) {
  georgeHasCollided = false
  removeSprite(georgePosition, 'george')
  audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
  audio.play()
  clearInterval(intervalId)
  currentCountdown = countdownStart
  countdownScreen.innerHTML = currentCountdown
  removeSprite(georgeAtHomePosition, 'georgeAtHome')
  removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
  georgeAtHome = true
  outOfLives = true
  createOutOfLivesPopup()
  currentLives = livesStart
  livesScreen.innerHTML = currentLives 
  georgeAtHomePosition = null 
  secondGeorgeAtHomePosition = null 
  georgePosition = startPosition
  addSprite(georgePosition, 'george')
  gameisRunning = false
} else if ((currentLives <= 1 && georgeHasCollided) && georgeAtHomePosition) {
  georgeHasCollided = false
  removeSprite(georgePosition, 'george')
  audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
  audio.play()
  clearInterval(intervalId)
  currentCountdown = countdownStart
  countdownScreen.innerHTML = currentCountdown
  removeSprite(georgeAtHomePosition, 'georgeAtHome')
  georgeAtHome = true
  outOfLives = true
  createOutOfLivesPopup()
  currentLives = livesStart
  livesScreen.innerHTML = currentLives 
  georgePosition = startPosition
  addSprite(georgePosition, 'george')
  georgeAtHomePosition = null 
  gameisRunning = false
} else if (currentLives <=1 && georgeHasCollided) {
  audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
  audio.play()
  gameisRunning = false
  removeSprite(georgePosition, 'george')
  outOfLives = true
  clearInterval(intervalId)
  currentCountdown = countdownStart
  countdownScreen.innerHTML = currentCountdown
  currentLives = livesStart
  livesScreen.innerHTML = currentLives
  georgePosition = startPosition
  georgeHasCollided = false
  createOutOfLivesPopup()
  addSprite(georgePosition, 'george')
} else if (currentLives > 1 && georgeHasCollided) {
  livesCountdown()
  audio.src = 'design-elements/audio/serenity.mp3'
  audio.play()
  removeSprite(georgePosition, 'george')
  createCollisionPopup()
  georgePosition = startPosition
  addSprite(georgePosition, 'george')
  georgeHasCollided = false
}
}


// <----- Testing falling in road----->
function createRoad() {
  cells.filter(cell => {
    if (cell.innerHTML >= width && cell.innerHTML < width * 4) {
      cell.classList.add('road')
    }
  })
}
createRoad()


// <----- falling in road function ------>

let georgeInRoad = null

function detectFallingInRoad() {
  if (cells[georgePosition].classList.contains('road') && !(cells[georgePosition].classList.contains('busOne') || cells[georgePosition].classList.contains('busTwo') || cells[georgePosition].classList.contains('busThree') ||cells[georgePosition].classList.contains('taxiOne') || cells[georgePosition].classList.contains('taxiTwo') )) {
        georgeInRoad = true
      }
    if ((currentLives <= 1 && georgeInRoad) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
        clearInterval(intervalId) 
        removeSprite(georgePosition, 'george')
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        currentCountdown = countdownStart
        countdownScreen.innerHTML = currentCountdown
        currentScore = 0
        scoreScreen.innerHTML = currentScore
        outOfLives = true
        gameisRunning = false
        createOutOfLivesPopup()
        currentLives = livesStart
        livesScreen.innerHTML = currentLives
        removeSprite(georgeAtHomePosition, 'georgeAtHome')
        removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
        removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
        removeSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
        georgeAtHomePosition = null
        secondGeorgeAtHomePosition = null
        thirdGeorgeAtHomePosition = null
        fourthGeorgeAtHomePosition = null
        removeSprite(georgePosition, 'taxiBackdrop')
        removeSprite(georgePosition, 'busBackdrop')
        removeSprite(georgePosition, 'george')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
      } else if ((currentLives <= 1 && georgeInRoad) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition) {
        removeSprite(georgePosition, 'george')
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        clearInterval(intervalId)
        currentCountdown = countdownStart
        countdownScreen.innerHTML = currentCountdown
        removeSprite(georgeAtHomePosition, 'georgeAtHome')
        removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
        removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
        georgeAtHome = true
        outOfLives = true
        gameisRunning = false
        createOutOfLivesPopup()
        currentLives = livesStart
        livesScreen.innerHTML = currentLives 
        georgeAtHomePosition = null 
        secondGeorgeAtHomePosition = null 
        thirdGeorgeAtHomePosition = null 
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
      } else if ((currentLives <= 1 && georgeInRoad) && georgeAtHomePosition && secondGeorgeAtHomePosition) {
        removeSprite(georgePosition, 'george')
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        clearInterval(intervalId)
        currentCountdown = countdownStart
        countdownScreen.innerHTML = currentCountdown
        removeSprite(georgeAtHomePosition, 'georgeAtHome')
        removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
        georgeAtHome = true
        outOfLives = true
        gameisRunning = false
        createOutOfLivesPopup()
        currentLives = livesStart
        livesScreen.innerHTML = currentLives 
        georgeAtHomePosition = null 
        secondGeorgeAtHomePosition = null 
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
      } else if ((currentLives <= 1 && georgeInRoad) && georgeAtHomePosition) {
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        removeSprite(georgePosition, 'george')
        clearInterval(intervalId)
        currentCountdown = countdownStart
        countdownScreen.innerHTML = currentCountdown
        removeSprite(georgeAtHomePosition, 'georgeAtHome')
        georgeAtHome = true
        outOfLives = true
        gameisRunning = false
        createOutOfLivesPopup()
        currentLives = livesStart
        livesScreen.innerHTML = currentLives 
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeAtHomePosition = null 
      } else if (currentLives <=1 && georgeInRoad) {
        audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
        audio.play()
        removeSprite(georgePosition, 'george')
        georgeInRoad = false
        gameisRunning = false
        outOfLives = true
        clearInterval(intervalId)
        createOutOfLivesPopup()
        currentCountdown = countdownStart
        countdownScreen.innerHTML = currentCountdown
        currentLives = livesStart
        livesScreen.innerHTML = currentLives
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
      } else if (currentLives > 1 && georgeInRoad) {
        livesCountdown()
        // createCollisionPopup()
        audio.src = 'design-elements/audio/serenity.mp3'
        audio.play()
        removeSprite(georgePosition, 'george')
        georgePosition = startPosition
        addSprite(georgePosition, 'george')
        georgeInRoad = false
      }
    }


// <----- Testing Lives ----->
// Again, repeating a lot of code here!
const livesStart = 3
let currentLives = livesStart
let outOfLives = null
const livesScreen = document.querySelector('#currentLives')

function livesCountdown() {
  if (currentLives > 1 && georgeHasCollided || georgeInRoad) {
    currentLives--
    livesScreen.innerHTML = currentLives 
  } else if ((currentLives === 1 && georgeHasCollided || georgeInRoad) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
    removeSprite(georgeAtHomePosition, 'georgeAtHome')
    removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
    removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
    removeSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
    audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
    audio.play()
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    georgeAtHome = true
    outOfLives = true
    currentLives = livesStart
    livesScreen.innerHTML = currentLives 
    georgeAtHomePosition = null 
    secondGeorgeAtHomePosition = null 
    thirdGeorgeAtHomePosition = null 
    fourthGeorgeAtHomePosition = null 
    gameisRunning = false
  } else if ((currentLives === 1 && georgeHasCollided || georgeInRoad) && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition) {
    audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
    audio.play()
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    removeSprite(georgeAtHomePosition, 'georgeAtHome')
    removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
    removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
    georgeAtHome = true
    outOfLives = true
    currentLives = livesStart
    livesScreen.innerHTML = currentLives 
    georgeAtHomePosition = null 
    secondGeorgeAtHomePosition = null 
    thirdGeorgeAtHomePosition = null 
    gameisRunning = false
  } else if ((currentLives === 1 && georgeHasCollided || georgeInRoad) && georgeAtHomePosition && secondGeorgeAtHomePosition) {
    audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
    audio.play()
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    removeSprite(georgeAtHomePosition, 'georgeAtHome')
    removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
    georgeAtHome = true
    outOfLives = true
    currentLives = livesStart
    livesScreen.innerHTML = currentLives 
    georgeAtHomePosition = null 
    secondGeorgeAtHomePosition = null 
    gameisRunning = false
  } else if ((currentLives === 1 && georgeHasCollided || georgeInRoad) && georgeAtHomePosition) {
    audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
    audio.play()
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    removeSprite(georgeAtHomePosition, 'georgeAtHome')
    georgeAtHome = true
    outOfLives = true
    currentLives = livesStart
    livesScreen.innerHTML = currentLives 
    georgeAtHomePosition = null 
    gameisRunning = false
  } else {
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    georgeAtHome = true
    outOfLives = true
    currentLives = livesStart
    livesScreen.innerHTML = currentLives 
    gameisRunning = false
  }
}


// <----- Testing getting home a family of Georges ----->

// First, place bins to avoid 
const homeStretch = cells.filter(cell => {
    if (cell.innerHTML < width) {
      cell.classList.add('home')
    }
  })
console.log(homeStretch)

cells.forEach(cell => {
  if (cell.innerHTML < width && cell.innerHTML % 2 === 0) {
    cell.classList.add('trash')
    cell.classList.remove('home')
  }
})
// Then add trash cans to detection function above...

let georgeAtHome = false
let georgeAtHomePosition = null
let secondGeorgeAtHomePosition = null
let thirdGeorgeAtHomePosition = null
let fourthGeorgeAtHomePosition = null

function arrivedAtHome() {
  detectCollision()
  if (cells[georgePosition].classList.contains('home') && !georgeAtHomePosition && !secondGeorgeAtHomePosition && !thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    audio.src = 'design-elements/audio/summer-of-george.m4a'
    audio.play()
    georgeAtHomePosition = georgePosition
    addSprite(georgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && !secondGeorgeAtHomePosition && !thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    audio.src = 'design-elements/audio/summer-of-george.m4a'
    audio.play()
    secondGeorgeAtHomePosition = georgePosition
    addSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && !thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    audio.src = 'design-elements/audio/summer-of-george.m4a'
    audio.play()
    thirdGeorgeAtHomePosition = georgePosition
    addSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    audio.src = 'design-elements/audio/summer-of-george.m4a'
    audio.play()
    fourthGeorgeAtHomePosition = georgePosition
    addSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    currentScore = currentScore + 500
    currentScore.innerHTML = currentScore
    gameisRunning = false
    createYouWonPopup()
    audio.src = 'design-elements/audio/elaine-dancing-short.m4a'
    audio.play()
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    currentScore = 0
    scoreScreen.innerHTML = currentScore
    currentLives = livesStart
    livesScreen.innerHTML = currentLives
    removeSprite(georgeAtHomePosition, 'georgeAtHome')
    removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
    removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
    removeSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
    georgeAtHomePosition = null
    secondGeorgeAtHomePosition = null
    thirdGeorgeAtHomePosition = null
    fourthGeorgeAtHomePosition = null
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  }
}


// <----- Testing timer ----->

// Timer that registers if George is home and resets
// Long messy code again!

const countdownStart = 60
let currentCountdown = countdownStart
const startButton = document.querySelector('.start')
const countdownScreen = document.querySelector('#timeRemaining')
console.log(countdownScreen.innerHTML)
let intervalId = null
let gameisRunning = null

function handleStartCountdown() {
  if (currentCountdown !== countdownStart && !cells[georgePosition].classList.contains('home')) return
  intervalId = setInterval(() => {
    currentCountdown--
    countdownScreen.innerHTML = currentCountdown
    gameisRunning = true
    if (currentCountdown === 0 && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
      clearInterval(intervalId)
      audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
      audio.play()
      createOutOfTimePopup()
      currentCountdown = countdownStart
      countdownScreen.innerHTML = currentCountdown
      currentScore = 0
      scoreScreen.innerHTML = currentScore
      currentLives = livesStart
      livesScreen.innerHTML = currentLives
      removeSprite(georgeAtHomePosition, 'georgeAtHome')
      removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
      removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
      removeSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
      georgeAtHomePosition = null
      secondGeorgeAtHomePosition = null
      thirdGeorgeAtHomePosition = null
      fourthGeorgeAtHomePosition = null
      removeSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition, 'busBackdrop')
      removeSprite(georgePosition, 'george')
      georgePosition = startPosition
      addSprite(georgePosition, 'george')
      gameisRunning = false
    } else if (currentCountdown === 0 && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition) {
      clearInterval(intervalId)
      audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
      audio.play()
      createOutOfTimePopup()
      currentCountdown = countdownStart
      countdownScreen.innerHTML = currentCountdown
      currentScore = 0
      scoreScreen.innerHTML = currentScore
      currentLives = livesStart
      livesScreen.innerHTML = currentLives
      removeSprite(georgeAtHomePosition, 'georgeAtHome')
      removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
      removeSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
      georgeAtHomePosition = null
      secondGeorgeAtHomePosition = null
      thirdGeorgeAtHomePosition = null
      removeSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition, 'busBackdrop')
      removeSprite(georgePosition, 'george')
      georgePosition = startPosition
      addSprite(georgePosition, 'george')
      gameisRunning = false
    }else if (currentCountdown === 0 && georgeAtHomePosition && secondGeorgeAtHomePosition) {
      clearInterval(intervalId)
      audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
      audio.play()
      createOutOfTimePopup()
      currentCountdown = countdownStart
      countdownScreen.innerHTML = currentCountdown
      currentScore = 0
      scoreScreen.innerHTML = currentScore
      currentLives = livesStart
      livesScreen.innerHTML = currentLives
      removeSprite(georgeAtHomePosition, 'georgeAtHome')
      removeSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
      georgeAtHomePosition = null
      secondGeorgeAtHomePosition = null
      removeSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition, 'busBackdrop')
      removeSprite(georgePosition, 'george')
      georgePosition = startPosition
      addSprite(georgePosition, 'george')
      gameisRunning = false
    } else if (currentCountdown === 0 && georgeAtHomePosition) {
      clearInterval(intervalId)
      audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
      audio.play()
      createOutOfTimePopup()
      currentCountdown = countdownStart
      countdownScreen.innerHTML = currentCountdown
      currentScore = 0
      scoreScreen.innerHTML = currentScore
      currentLives = livesStart
      livesScreen.innerHTML = currentLives
      removeSprite(georgeAtHomePosition, 'georgeAtHome')
      georgeAtHomePosition = null
      removeSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition, 'busBackdrop')
      removeSprite(georgePosition, 'george')
      georgePosition = startPosition
      addSprite(georgePosition, 'george')
      gameisRunning = false
    } else if (currentCountdown === 0) {
      clearInterval(intervalId)
      audio.src = 'design-elements/audio/seinfeld-theme-end.m4a'
      audio.play()
      createOutOfTimePopup()
      currentCountdown = countdownStart
      countdownScreen.innerHTML = currentCountdown
      currentScore = 0
      scoreScreen.innerHTML = currentScore
      currentLives = livesStart
      livesScreen.innerHTML = currentLives
      removeSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition, 'busBackdrop')
      removeSprite(georgePosition, 'george')
      georgePosition = startPosition
      addSprite(georgePosition, 'george')
      gameisRunning = false
    }
  }, 1000)
}

startButton.addEventListener('click', handleStartCountdown)



