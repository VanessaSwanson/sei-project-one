# General Assembly Project 1: Seinfeld Frogger

![](https://lh4.googleusercontent.com/CSrcs8M_5KQVIDIbYL3O6I9xiFUmSUxlDkTkGiIc7P5IwZRNYohTOh0D67zB6KZqP-kyoO0gF-kVg3T6JCLtFbO59hV_lh0K52QWZlBQcmWRksxrO5vc4cJ3Cf0vuSGCpNCsYc0=s0)

## Table of contents

1. [Overview](#overview)

2. [Project Brief](#projectbrief)

3. [Seinfeld Frogger](#seinfeldfrogger)

4. [Process](#process)

    1. [Planning](#planning)

    2. [The grid](#grid)

    3. [Stretches](#stretches)

    4. [Sprites](#sprites)

    5. [Moving George](#movinggeorge)

    6. [Moving the other sprites](#movingothersprites)

    7. [Where things start to get tricky!](#tricky)

    8. [Winning and losing](#winningandlosing)

5. [Known bugs](#bugs)

6. [Wins](#wins)

7. [Challenges](#challenges)

8. [Key learnings](#keylearnings)

9. [Future content](#futurecontent)


Overview <a name="overview"></a>
========

This was my first project as part of the General Assembly immersive Software Engineering course, in which I built a frogger game using Vanilla JavaScript.

Project Brief <a name="projectbrief"></a>
=============

Create your own version of a classic game that will be rendered in the browser using HTML, CSS and Vanilla JavaScript.

Timeframe: 8 days

Technologies used:

-   HTML5 

-   CSS3 

-   JavaScript (ES6)

-   Git

-   GitHub

Seinfeld Frogger <a name="seinfeldfrogger"></a>
================

As a huge Seinfeld fan, I decided to pay homage to the Frogger episode by building a Seinfeld version of the classic [Frogger game](https://en.wikipedia.org/wiki/Frogger), in which the character George Costanza represents the frog and Monk's Diner represents the lily pad the frog is trying to reach.

You can play the deployed game [here](https://vanessaswanson.github.io/sei-project-one/), or you can watch the video below for an overview of game play functionality.







## Process <a name="process"></a>
-------

### Planning <a name="planning"></a>

I started by playing frogger games online! This reminded me of the various elements needed for a standard frogger game so I could begin to think about how to create the different game functions and properly assess what I felt would be doable in the time frame, what would count towards my MVP and what would constitute stretch goals.

During this initial research phase, I wrote several pieces of throwaway code to test my understanding of how to make certain features of the game work, such as sprite movement and collision, which helped greatly with my planning.

My list of desired MVP features included:

-   A home screen before you enter the game.

-   Getting one George across the road to complete the game.

-   A timer.

-   A lives countdown.

-   Obstacles to avoid in the first half of the game.

-   'Logs' to travel on in the second half of the game.

-   George would also lose a life if he fell in the road (river on classic Frogger) or if he went over the edge of the row.

My stretch goals included:

-   Getting multiple Georges home.

-   The ability to travel along the 'logs' as you can in classic Frogger.

-   Allowing George to pick up points by collecting randomly appearing coffee cup sprites.

-   Fun sound effects.

-   Additional, harder levels.

Finally, I created a wireframe for my game and mapped out a plan with goals and deadlines for the week ahead, the key deadline being to reach MVP with fully working functionality 36 hours before the final deadline to ensure I had time to style and catch any bugs.

### The grid <a name="grid"></a>

```

// <----- Variables ----->

const  width = 11

const  height = 9

const  gridCellCount = width * height

const  cells = []

// <----- Building the grid ----->

const  grid = document.querySelector('.grid')

function  createGrid() {

 for (let  i = 0; i < gridCellCount; i++) {

   const  cell = document.createElement('div')

   cell.innerHTML = i

   cell.classList.add('square')

   cells.push(cell)

   grid.appendChild(cell)

 }

}

createGrid()
```

I created the game grid using a for loop which pushed a new 'cell' into my 'cells' array for each square in the grid. These were represented by a div in the DOM, which could be manipulated using Flexbox in my CSS styling to make them align neatly as a rectangular grid.

Each cell's index value was assigned to the innerHTML value of the div, so it could then be used to clarify where to move my various sprites within the game.

By using this method to create the grid, I could easily adjust the grid size when needed by simply amending the width and height variables. Originally I started with a narrower grid, but after testing the game, I realised it would be a better user experience to make the rows wider.

### 'Stretches' <a name="stretches"></a>

I then assigned designated 'stretches' to the game grid, which represented the different sections of the road, such as the safe pavements vs the dangerous road. I added a class to those divs which allowed me to recognise collisions, etc later in the code.

Again, I avoided hard coding which cells matched which stretches of the road in case I wanted to change my grid size later.

```

// <----- Marking safe stretches on the board ----->

function  createSafeRoad() {

 cells.filter(cell  => {

   if (cell.innerHTML >= width * 5 && cell.innerHTML < width * 8) {

     cell.classList.add('safeRoad')

   }

 })

}

createSafeRoad()
```

### Sprites <a name="sprites"></a>

The positions of my game sprites were assigned using arrays (again, I avoided hard-coding positions here). 
```

const  soupNaziPosition = [

 width * 6,

 ((width * 6) + Math.floor(width/3)),

 ((width * 6) + Math.floor(width/3 * 2))

]
```


The sprites were added and removed from the grid (e.g. when George loses a life and needs to be placed at the start position again) using these functions:
```

function  addSprite(position, assignedClass) {

 cells[position].classList.add(assignedClass)

}

function  removeSprite(position, assignedClass) {

 cells[position].classList.remove(assignedClass)

}
```

### Moving George <a name="movinggeorge"></a>

To move George, I used a switch statement which listened for a keyup event on the arrow keys to determine which way the sprite should move, with certain conditions added. For example, as you can see below, George can only move right if he is not in the final div of the grid, or in a cell which already has the 'borderRight' class, in which case he would be travelling over the edge of a row:

```

switch (event.keyCode) {

     case  39:

       if (georgePosition < cells.length - 1 && !cells[georgePosition].classList.contains('borderRight')) {

         georgePosition++

       }

       break
```


### Moving the other sprites <a name="movingothersprites"></a>

The other sprites were moved on a setInterval loop. Each function was slightly different depending on their movement and position on the board, but here is an example function to move the Soup Nazi sprite:

```

function  moveSoupNaziRight() {

 currentSoupNaziPosition = soupNaziPosition.map(soupNazi  => {

   setInterval(() => {

     if (soupNazi === (width * 7) - 1) {

       removeSprite(soupNazi, 'soup-nazi')

       soupNazi = soupNazi - (width - 1)

       addSprite(soupNazi, 'soup-nazi')

       detectCollision()

} else  if ((width * 7) - 1) {

       removeSprite(soupNazi, 'soup-nazi')

       soupNazi++

       addSprite(soupNazi, 'soup-nazi')

       detectCollision()

     }

}, 900)

 })

}

moveSoupNaziRight()
```

### Where things start to get tricky! <a name="tricky"></a>

The other functions of the game (moving George with the buses and taxis, colliding with other sprites, losing lives and running out of time) all involve a possible end of game scenario. When I started with my MVP of one George getting home, this was fine, but I discovered when adding multiple Georges to the game, with not so long to go until the deadline, that this added extra complexity to the conditional logic, which sometimes resulted with old George sprites remaining on the home stretch after the end of the game, and other buggy things.

In order to make the game work in time, I added extra conditions to these functions depending on whether the various Georges were at home, or how many lives he had remaining, and as you'll see this led to lots of repetitive code. Obviously this is not ideal and if I was to come back to this project with the experience and knowledge I have now, I would massively refactor and clean this up, but it is at least a good personal reminder of how much my understanding grew in just three months!

This is a snippet with an if statement to give you an idea of the many moving parts being considered:

```

function  moveTaxiTwoLeft() {

 currentTaxiTwoPosition = taxiTwoPosition.map(taxi  => {

   setInterval(() => {

     if ((taxi === width * 2&& georgePosition === taxi) && currentLives === 1 && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {

 . . .

}
```

This function sets the current taxiTwo (second taxi in the taxi floats) position by mapping the starting taxiTwo positions and, on a setInterval, moves them left across the board by reducing their relevant grid index by 1. However, in the section of code above, it adds that if the taxi is at the end of the row, and George is travelling with the taxi AND George only has one life left, the sequence for ending the game needs to be carried out as he will have gone over the edge. Furthermore it clarifies that if there are currently four Georges in the home stretch, each George sprite must be removed before the game restarts.

### Winning and losing <a name="winningandlosing"></a>

I created functions for the different methods in which lives could be lost, principally whether George had collided with another sprite, if he had fallen in the road or if he had travelled over the edge of the row while on a bus or taxi.

Here is an example from the collision function - as you can see, collision was determined by whether the cell marking George's current position also contained one of the various classes to signal another sprite.

This then set off a sequence of actions depending on how many Georges were home, or how many lives were remaining (omitted here, but can be found in the code if of interest). These actions included sending George to the 'startPosition', updating the livesScreen.innterHTML accordingly and triggering the relevant sound effect and/or popup message.

```

// <----- Collision ----->

let  georgeHasCollided = null

function  detectCollision() {

if (cells[georgePosition].classList.contains('georgeAtHome') || cells[georgePosition].classList.contains('soup-nazi') || cells[georgePosition].classList.contains('uncle-leo') || cells[georgePosition].classList.contains('trash') || cells[georgePosition].classList.contains('susan')) {

   georgeHasCollided = true

}

. . .

}

Winning was determined by whether all Georges had made it home in time and was included in the arrivedAtHome function. Once all George's were home, an extra 500 points were added to the score screen, and the end of game actions such as removing George sprites and resetting the countdown screen were enacted.

function  arrivedAtHome() {

. . .

} else  if (cells[georgePosition].classList.contains('home') && georgeAtHomePosition && secondGeorgeAtHomePosition && thirdGeorgeAtHomePosition && fourthGeorgeAtHomePosition) {

   addCoffeePoints()

   currentScore = currentScore + 500

   currentScore.innerHTML = currentScore

   createYouWonPopup()

   audio.src = 'design-elements/audio/elaine-dancing-short.m4a'

   audio.play()

   . . .

  }

}
```

Known bugs <a name="bugs"></a>
----------

When George passively travels over the edge of a row on either a bus or taxi (as opposed to travelling over the edge by accidentally clicking on an arrow key) it removes a bus or taxi from the float train.

Wins
----

-   I'm really happy with the overall look and performance of the game. 

-   It was great to add in some of my stretch targets.

Challenges <a name="challenges"></a>
----------

-   Giving George the ability to move along the buses and taxis as opposed to just passively travelling with them was trickier than I originally expected. To begin with, when hopping onto the buses, he would immediately travel to the front of the float and when a player tried moving him with the arrow keys, he would glitch back to the front. Once I saw that George was able to move along the taxi floats, I knew I needed to analyse any differences in the code to find the solution. From here I was able to determine the issue, which ended up being due to the order of my elements within the float arrays. I had instinctually written the arrays in the order of direction of travel, with the first bus/taxi as the first in the array, whereas they needed to be in numerical order by their starting grid index. This is why movement on the taxi floats (which were moving left across the board and therefore started on a lower index) worked whereas the buses (moving right across the board) did not. 

-   As mentioned above, adding multiple Georges ended up adding huge complexity to the code which I didn't foresee. This was a great lesson!

Key learnings <a name="keylearnings"></a>
-------------

-   This project was an excellent way to solidify my understanding of JavaScript fundamentals.

-   It was great to learn about the planning process for a coding project. Elements such as building a wireframe and writing up an MVP outline were new to me, whereas thinking of the user journey from the start to the end of the game to plan for all eventualities was more familiar from my event planning experience, as was factoring in time for unexpected problems, and methodically problem solving independently before escalating and seeking help from the amazingly helpful teaching assistants at GA in a timely manner.

-   If I was to redo this project now, I would completely scrap this code and work much more succinctly. In hindsight I can't believe I didn't think to write a simple end of game function to stop so much of the repetition happening in the code, along with a whole host of other things.

Future content <a name="futurecontent"></a>
--------------

-   Additional, harder levels where I could amend the grid variables, speed of the floats, etc.

-   Utilising local storage to allow users to log their scores and create a leaderboard.
