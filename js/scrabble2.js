/*
    File: "https://wxuhao.github.io/js/scrabble.js"
    91.61 GUI Programming I Assignment 8: Scrabble
    Xuhao Wang, UMass Lowell Student, xuhao_wang@student.uml.edu
    Created Aug 12, 2020
    Scrabble
    Images received from https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.html
    checkTouchScreen() taken from https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
    */
var Letters = {
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "W", "Y", "Z", "Blank"],
    // Number left in the bag
    num: [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1],
    value: [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 0]
}

// To reset the game after tiles have been used up
const startingNum = [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1];
var lettersLeft = 100;
var score = 0;
var highScore = 0;

// letterArr = [letter, value, index]
function makeTile() {
    letterArr = randLetter();
    // Stop immediately if game is over
    if (tryGameOver()) { return; }
    letter = letterArr[0];
    value = letterArr[1];
    index = letterArr[2];
    var img = new Image();
    img.src = 'images/tiles/' + letter + '.jpg';
    img.setAttribute('letter', letter);
    img.setAttribute('value', value);
    img.setAttribute('index', index);
    img.classList.add('tile');
    return img
}

// returns [letter, value, index] or false if no letters are left
function randLetter() {
    // Stop immediately if game is over
    if (tryGameOver()) { 
        return; 
    }
    // Filter out letters which are 0 in num (used up)
    var remainingLetters = Letters.letter.filter((currentValue, index) => Letters.num[index] > 0);
    var remainingValues = Letters.value.filter((currentValue, index) => Letters.num[index] > 0);
    // Get a random remaining letter
    var rand = Math.floor(remainingLetters.length * Math.random());
    var newLetter = remainingLetters[rand];
    var newValue = remainingValues[rand];
    // Find index of the removed letter
    var newIndex = Letters.letter.findIndex(aLetter => aLetter == newLetter);
    // Remove 1 from that remaining letter
    Letters.num[newIndex]--;
    lettersLeft--;
    return [newLetter, newValue, newIndex];
}

// Return a letter to the bag
function returnLetter(letterIndex) {
    if (Letters.num[letterIndex] !== undefined) {
        Letters.num[letterIndex]++;
        lettersLeft++;
    }
}

// Return pieces on the board to the hand
function returnToHand() {
    // Remove the css that moves tiles
    $('#hand .slot .tile').css({'left': 0,'top': 0});
    // Re-enable dragging from hand
    $('#hand .slot .tile').draggable('enable');
    resetBoard();
}

// Erase tile properties from the board and re-enable tile droppability
function resetBoard() {
    $('#board .slot')
        .removeAttr('value')
        .removeAttr('letter')
        .removeClass('greyed-out')
        .droppable('enable');
}

function fillHand() {
    emptySlots = $('#hand .slot:empty');
    $(emptySlots).each(function() {
        $(this).append(makeTile());
    });
    addDragDrop();
}

function removeUsedFromHand() {
    $('#hand .ui-draggable-disabled').each(function () {
        $(this).remove();
    });
    resetBoard();
}

function getNewHand() {
    resetBoard();
    $('#hand .slot').empty();
    fillHand();
}

function validateWord() {
    word = [];
    $('.slot[letter]').each(function() {
        word.push($(this).attr('letter'))
    });
}

function submitWord() {
    validateWord();
    updateScore();
    removeUsedFromHand();
    fillHand();
}

function updateScore() {
    const addValuesHelper = (totalWordScore, thisScore) => totalWordScore + thisScore;
    values = []
    filledSlots = $('.slot[letter]');
    if (filledSlots.length){
        $(filledSlots).each(function () {
            thisValue = parseInt($(this).attr('value'));
            values.push(thisValue);
        });
        total = values.reduce(addValuesHelper);
        score += parseInt(total);
        displayScore();
    }
}

function displayScore() {
    if (score > highScore) {
        highScore = score;
    }
    $('#high_score').text(highScore);
    $('#score').text(score);
}

function restart() {
    getNewHand();
    score = 0;
    displayScore()
    resetBag();
}

function resetBag() {
    Letters.num = startingNum.slice();
    lettersLeft = 100;
}

// Make tiles draggable and slot droppable
function addDragDrop() {
    $('.tile').draggable({
        containment: $('#area'),
        // Go back to the hand unless changed by a droppable over class
        revert: true,
        // Snap into other tiles so tiles can snap into the board, which is made of disabled tiles
        snap: true,
        snapMode: 'inner',
        // Bring the dragged tile to the top of all tiles
        stack: ".tile",
        stop: function (event, ui) {
            // Refresh event handlers
            addDragDrop();
        }
    });

    // Give the board the draggable class and then disable it so we can utilize the snap option
    $('#board .slot').draggable()
        .draggable('disable');

    $('#board .slot').droppable({
        // Only let the tile be dropped when the mouse is in the slot and the tile snaps into the slot
        tolerance: "fit",
        over: function (event, ui) {
            // Make the tile not revert if it's in the slot
            $('.tile').draggable({ revert: false, snap: true });
            // Make the tile snap if it's in the slot.
            //$('.tile').draggable({  });
            // Rebind all events
            //addDragDrop();
        },
        // Make the tile revert if it's not in the slot
        out: function (event, ui) {
            // Make the tile revert if it's not in the slot
            $('.tile').draggable({ revert: true, snap: false });
            //$('.tile').draggable({  });
            // Rebind all events
            addDragDrop();
        },
        drop: function (event, ui) {
            // Record which tile is dropped here
            $(this)
                .attr('value', ui.draggable.attr('value'))
                .attr('letter', ui.draggable.attr('letter'));
            // Disable add droppables and then re-enable the valid ones in order to prevent spaces
            $('#board .slot').droppable('disable')
                // And add the greyed-out style
                .addClass('greyed-out');
            // Start from either side, look for the first tile on either side, and enable any adjacent empty tile(s)
            // Start from the second tile and go to the last tile, finding the first tile that has a letter, and enabling the left tile
            for (i = 1; i <= 6; i++) {
                // If this tile is the first from the left to have a letter on it, enable the left adjacent side tile, and stop
                if ($('#board-slot-' + i).attr('letter')) {
                    var prevTile = i - 1;
                    $('#board-slot-' + prevTile).droppable('enable')
                        // And remove the greyed-out style
                        .removeClass('greyed-out');
                    break;
                }
            }
            // Start from the second to last tile and go to the first tile, finding the first tile that has a letter, and enabling the right tile
            for (i = 5; i >= 0; i--) {
                // If this tile is the first from the right to have a letter on it, enable the right adjacent side tile, and stop
                if ($('#board-slot-' + i).attr('letter')) {
                    var nextTile = i + 1;
                    $('#board-slot-' + nextTile).droppable('enable')
                        // And remove the greyed-out style
                        .removeClass('greyed-out');
                    break;
                }
            }
            // Disable dragging placed tiles
            $('.tile').draggable({ revert: false });
            ui.draggable.draggable("disable");
            $(this).droppable('disable');

        }
    });
}


function tryGameOver() {
    if (lettersLeft === 0) {
        $('#game-over').addClass('in');
        return true;
    }
}

// Taken from https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
// Show the doesn't work on touchscreen banner on touchscreens
function touchScreenBanner() {
    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    if (hasTouchScreen) {
        $('#touchscreen').addClass('in');
    }
}

// On load
$(function () {
    // Show the doesn't work on touchscreen banner on touchscreens
    touchScreenBanner();
    addDragDrop();
    restart();
});