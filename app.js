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

// <----- Testing creating and removing sprites ----->
// Have changed from hard coding in preparation for wanting to adapt the grid

const startPosition = Math.floor(cells.length - (width / 2))
console.log(startPosition)
let georgePosition = startPosition
const soupNaziPosition = [width * 6, (width * 6) + Math.floor(width/2)]
let currentSoupNaziPosition = [width * 6, (width * 6) + Math.floor(width/2)]
const uncleLeoPosition = [(width * 6) - 1, (width * 5) + Math.floor(width/2), (width * 8) - 1, (width * 7) + Math.floor(width/2)]
let currentUncleLeoPosition = [(width * 6) - 1, (width * 5) + Math.floor(width/2), (width * 8) - 1, (width * 7) + Math.floor(width/2)]
const taxiOnePosition = [(width * 2) + Math.ceil(width/2), (width * 2) + 1]
let currentTaxiOnePosition = [(width * 2) + Math.ceil(width/2), (width * 2) + 1]
const taxiTwoPosition = [taxiOnePosition[0]+1, taxiOnePosition[1]+1]
let currentTaxiTwoPosition = [taxiOnePosition[0]+1, taxiOnePosition[1]+1]
const busPosition = [width, 
  width + (Math.floor(width/ 3)), 
  width + (Math.floor(width/3 * 2)), 
  width * 3, 
  (width * 3) + (Math.floor(width/ 3)), 
  (width * 3) + (Math.floor(width/3 * 2))]
let currentBusPosition = [width, 
  width + (Math.floor(width/ 3)), 
  width + (Math.floor(width/3 * 2)), 
  width * 3, 
  (width * 3) + (Math.floor(width/ 3)), 
  (width * 3) + (Math.floor(width/3 * 2))]
let currentCoffeePositionHome = 0
let currentCoffeePositionMid = (width * 4) + Math.floor(width/2)


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

currentBusPosition.forEach(bus => {
  addSprite(bus, 'bus')
})

currentTaxiOnePosition.forEach(taxi => {
  addSprite(taxi, 'taxiOne')
})

currentTaxiTwoPosition.forEach(taxi => {
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
  // if (gameisRunning) {

  // removeSprite function so George is only in current position and not last place he moved from
  removeSprite(georgePosition, 'george')

  // Then logic for each direction 
  // can still go over onto a different row, but I'll see if we can tackle that later!
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
  // Then you want to add george class to new cell you enter!
  addSprite(georgePosition, 'george')
}
// }

// Then an event to listen out for the arrow buttons
window.addEventListener('keyup', moveGeorge)



// <----- Testing moving sprites ----->

// hard coding for now just to test accessing arrays

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
      if (uncleLeo === width * 5 || uncleLeo === width * 7) {
        removeSprite(uncleLeo, 'uncle-leo')
        uncleLeo = uncleLeo + width - 1
        addSprite(uncleLeo, 'uncle-leo')
        detectCollision()
      } else if (uncleLeo > width * 5 || uncleLeo > width * 7) {
        removeSprite(uncleLeo, 'uncle-leo')
        uncleLeo--
        addSprite(uncleLeo, 'uncle-leo')
        detectCollision()
      }
    }, 1200)
  })
}
moveUncleLeoLeft()

function moveBusRight() {
  currentBusPosition = busPosition.map(bus => {
    setInterval(() => {
      if (bus === width * 2 - 1 || bus === width * 4 - 1) {
        removeSprite(bus, 'bus')
        bus = bus - (width - 1)
        addSprite(bus, 'bus')
      } else if (bus < width * 2 -1 || bus < width * 4 - 1) {
        removeSprite(bus, 'bus')
        bus++
        addSprite(bus, 'bus')
      }
    }, 1500)
  })
}
moveBusRight()

function moveTaxiOneLeft() {
  currentTaxiOnePosition = taxiOnePosition.map(taxi => {
    setInterval(() => {
      if (taxi === width * 2) {
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
      if (taxi === width * 2) {
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
    cells[georgePosition].classList.remove('coffee')
  }
}

// call in moveGeorge function


// <----- Making George move with the buses ----->
// Have amended below so it now looks like George is travelling with the bus
// seems overly complicated - sure there's an easier way to do it!

function moveGeorgeRightWithBus() {
  setInterval(() => {
    if (georgePosition === width * 2 -1 && cells[georgePosition].classList.contains('bus') || georgePosition === width * 4 -1 && cells[georgePosition].classList.contains('bus')) {
      removeSprite(georgePosition, 'george')
      cells[georgePosition].classList.remove('busBackdrop')
      georgePosition = georgePosition - (width - 1)
      cells[georgePosition].classList.add('busBackdrop')
      cells[georgePosition-1].classList.remove('bus')
    } else if (georgePosition < width * 2 - 1 && cells[georgePosition].classList.contains('bus') || georgePosition < width * 4 - 1 && cells[georgePosition].classList.contains('bus')) {
      removeSprite(georgePosition, 'george')
      cells[georgePosition].classList.remove('busBackdrop')
      georgePosition++
      cells[georgePosition].classList.add('busBackdrop')
      cells[georgePosition-1].classList.remove('bus')
    } 
  }, 1500)
}

moveGeorgeRightWithBus()


function moveGeorgeLeftWithTaxiOne() {
  setInterval(() => {
    if (georgePosition === width * 2 && cells[georgePosition].classList.contains('taxiOne')) {
      removeSprite(georgePosition, 'george')
      removeSprite(georgePosition, 'taxiBackdrop')
      georgePosition = (width * 3) - 1
      addSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition+1, 'taxiOne')
    } else if (georgePosition > width * 2 && cells[georgePosition].classList.contains('taxiOne')) {
      removeSprite(georgePosition, 'george')
      removeSprite(georgePosition, 'taxiBackdrop')
      georgePosition--
      addSprite(georgePosition, 'taxiBackdrop')
      removeSprite(georgePosition+1, 'taxiOne')
    } 
  }, 1500)
}

moveGeorgeLeftWithTaxiOne()

function moveGeorgeLeftWithTaxiTwo() {
  setInterval(() => {
    if (georgePosition === width * 2 && cells[georgePosition].classList.contains('taxiTwo')) {
      removeSprite(georgePosition, 'george')
      removeSprite(georgePosition, 'taxiBackdrop')
      georgePosition = (width * 3) - 1
      addSprite(georgePosition, 'taxiBackdrop')
      // removeSprite(georgePosition+1, 'taxiTwo')
    } else if (georgePosition > width * 2 && cells[georgePosition].classList.contains('taxiTwo')) {
      removeSprite(georgePosition, 'george')
      removeSprite(georgePosition, 'taxiBackdrop')
      georgePosition--
      addSprite(georgePosition, 'taxiBackdrop')
      // removeSprite(georgePosition+1, 'taxiTwo')
    } 
  }, 1500)
}

moveGeorgeLeftWithTaxiTwo()

// <----- Testing for collision ----->
let georgeHasCollided = null

function detectCollision() {
  if ( cells[georgePosition].classList.contains('georgeAtHome') || cells[georgePosition].classList.contains('soup-nazi') || cells[georgePosition].classList.contains('uncle-leo') || cells[georgePosition].classList.contains('trash')) {
      georgeHasCollided = true
      livesCountdown()
      addCoffeePoints()
      window.alert('Oh no!')
      cells[georgePosition].classList.remove('george')
      georgePosition = startPosition
      addSprite(georgePosition, 'george')
    }
}

// <----- Testing falling in road----->

// Making road just one line while I test
// function createRoad() {
//   cells.filter(cell => {
//     if (cell.innerHTML >= width * 3 && cell.innerHTML < width * 4) {
//       cell.classList.add('road')
//     }
//   })
// }
// createRoad()

function createRoad() {
  cells.filter(cell => {
    if (cell.innerHTML >= width && cell.innerHTML < width * 4) {
      cell.classList.add('road')
    }
  })
}
createRoad()

// <----- New fall in road function to reset lives ----->
// Annoyingly having to repeat code in this function, but only way I could get it to work!

let georgeInRoad = null

function detectFallingInRoad() {
  if (cells[georgePosition].classList.contains('road') && !(cells[georgePosition].classList.contains('bus') || cells[georgePosition].classList.contains('taxiOne') || cells[georgePosition].classList.contains('taxiTwo'))) {
    georgeInRoad = true
  }
  if (currentLives > 1 && georgeInRoad) {
    livesCountdown()
    window.alert('Oh no!')
    cells[georgePosition].classList.remove('george')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')
    georgeInRoad = false
  } else if (currentLives <=1 && georgeInRoad) {
    window.alert('You have run out of lives!')
    outOfLives = true
    clearInterval(intervalId)
    currentCountdown = countdownStart
    countdownScreen.innerHTML = currentCountdown
    currentLives = livesStart
    livesScreen.innerHTML = currentLives
    georgePosition = startPosition
    addSprite(georgePosition, 'george')
    gameisRunning = false
  } else {
    moveGeorgeRightWithBus()
    moveGeorgeLeftWithTaxiOne
    moveGeorgeLeftWithTaxiTwo
  }
} 


// <----- Testing Lives ----->
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
    window.alert('You have run out of lives!')
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
    window.alert('You have run out of lives!')
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
    window.alert('You have run out of lives!')
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
    window.alert('You have run out of lives!')
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
    window.alert('You have run out of lives!')
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
// livesCountdown()



// <----- Testing getting home a family of Georges ----->

// Right now, code below (both home and timer) works for one George sprite, but what if I want to get a family of George's home...

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

// didn't end up needing the some or every below

// let someHomeCellsAreGeorge = cells.some(cell => {
//   return cell.classList.contains('home') && cell.classList.contains('georgeAtHome')
// })
// console.log(someHomeCellsAreGeorge)

// let everyHomeCellIsGeorge = cells.every(cell => {
//   return cell.classList.contains('home') && cell.classList.contains('georgeAtHome')
// })
// console.log(everyHomeCellIsGeorge)


// There must be a simpler way to do this! 

let georgeAtHome = false
let georgeAtHomePosition = null
let secondGeorgeAtHomePosition = null
let thirdGeorgeAtHomePosition = null
let fourthGeorgeAtHomePosition = null

function arrivedAtHome() {
  detectCollision()
  if (cells[georgePosition].classList.contains('home') && !georgeAtHomePosition && !secondGeorgeAtHomePosition && !thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    window.alert(`You did it! You got your first George home, now try another`)
    georgeAtHomePosition = georgePosition
    addSprite(georgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && !secondGeorgeAtHomePosition && !thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    window.alert(`Woohoo! You got your second George home, keep on going!`)
    secondGeorgeAtHomePosition = georgePosition
    addSprite(secondGeorgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && !thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    window.alert(`Third time lucky, just two more to go!`)
    thirdGeorgeAtHomePosition = georgePosition
    addSprite(thirdGeorgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && !fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    window.alert(`So close! One more George to cross the street.`)
    fourthGeorgeAtHomePosition = georgePosition
    addSprite(fourthGeorgeAtHomePosition, 'georgeAtHome')
    georgePosition = startPosition
    addSprite(georgePosition, 'george')  
    georgeAtHome = true
  } else if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {
    addCoffeePoints()
    currentScore = currentScore + 500
    currentScore.innerHTML = currentScore
    window.alert(`You did it! You got all your Georges home - summer of George! Your final score is ${currentScore}`)
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
    gameisRunning = false
  }
}

// Old version for reference

// function arrivedAtHome() {
//   // if (cells[georgePosition].classList.contains('home') && !outOfLives) {
//   if (cells[georgePosition].classList.contains('home')) {
//       currentScore = currentScore + 500
//       addCoffeePoints()
//       currentScore.innerHTML = currentScore
//       window.alert(`You did it! You got your first George home, now try another`)
//       georgeAtHomePosition = georgePosition
//       addSprite(georgeAtHomePosition, 'georgeAtHome')
//       georgePosition = 59
//       addSprite(georgePosition, 'george')  
//       georgeAtHome = true
//   }
// }

// call function in moveGeorge function above


// <----- Testing timer ----->

// Timer that registers if George is home and resets
// Meant amending georgeHome function to update a let georgeAtHome boolean variable that could be read by timer
// Long messy code, but again, just testing right now!

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
      window.alert('Game over - you are out of time!')
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
      window.alert('Game over - you are out of time!')
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
      window.alert('Game over - you are out of time!')
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
      window.alert('Game over - you are out of time!')
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
      window.alert('Game over - you are out of time!')
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




