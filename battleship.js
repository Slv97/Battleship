let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');

    },
    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');

    }     
}; 

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [
        {locations: ['10', '20', '30'], hits: ['', '', '']},
        {locations: ['32', '33', '34'], hits: ['', '', '']},
        {locations: ['06', '16', '26'], hits: ['', '', '']}
    ],
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('Попал!');
                if (this.isSunk(ship)) {
                    view.displayMessage('Ты потопил мой корабль!')
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('Промах.');
        return false;
    },
    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

let controller = {
    guesses: 0,
    processGuess: function(guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('Ты потопил все мои корабли. Количетство выстрелов составило: ' + this.guesses + '.');
            }
        }
    }
};

function parseGuess(guess) {
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (guess === null || guess.length !== 2) {
        view.displayMessage('Что-то не так, пожалуйста введите букву и цифру.');
    } else {
        firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            view.displayMessage('Что-то не так, таких данных нет на боевой доске');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            view.displayMessage('Ты вышел за пределы поля. Попробуй еще раз.');
        } else {
            return row + column;
        }
    }
    return null;
}

function init() {
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;

    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = '';
}

function handleKeyPress(e) {
    let fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;






// let randomLok = Math.floor(Math.random() * 5),
//     location1 = randomLok,
//     location2 = location1 + 1,
//     location3 = location2 + 1,
//     guess,
//     hits = 0,
//     guesses = 0,
//     isSunk = false,
//     exquess;

// while (isSunk == false) {
//     guess = prompt('Ready, aim, fire! (enter a number 0-6): ');
    
//     if (guess < 0 || guess > 6) {
//         alert("Please enter a valid cell number!");
//     } else {
//         guesses = guesses + 1;

//         if (guess == location1 || guess == location2 || guess == location3) {
//             alert("HIT!");
//             hits = hits + 1;
//             if (hits == 3) {
//                 isSunk = true;
//                 alert("You sank my battleship!");
//             } 
//         } else {
//             alert("MISS");       
//         }; 
//     };
// };
// let stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " + (3/guesses);
// alert(stats);

// function clunk(times) {
//     var num = times;
//     while (num > 0) {
//     display("clunk");
//     num = num - 1;
//     }
//     }
//     function thingamajig(size) {
//     var facky = 1;
//     clunkCounter = 0;
//     if (size == 0) {
//     display("clank");
//     } else if (size == 1) {
//     display("thunk");
//     } else {
//     while (size > 1) {
//     facky = facky * size;
//     size = size - 1;
//     }
//     clunk(facky);
//     }
//     }
//     function display(output) {
//     console.log(output);
//     clunkCounter = clunkCounter + 1;
//     }
//     var clunkCounter = 0;
//     thingamajig(5);
//     console.log(clunkCounter)