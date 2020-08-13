
Letters = {
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "W", "Y", "Z", "Blank"],
    // Number left in the bag
    num: [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1],
    value: [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 0]
}
// Make tiles draggable and grid droppable
function addDragDrop() {
    $('.tile').draggable({
        containment: $('#area'),
        revert: true,
        snap: true,
        snapMode: 'inner',
        stack: ".tile"
    });

    // Give the board the draggable class and then disable it so we can utilize the snap option
    $('#board .grid').draggable();
    $('#board .grid').draggable('disable');

    $('#board .grid').droppable({
        tolerance: "fit",
        over: function (event, ui) {
            console.log('over');
                // Make the tile not revert if it's in the grid
                $('.tile').draggable({ revert: false });
                // Make the tile snap if it's in the grid.
                $('.tile').draggable({ snap: true });
        },
        // Make the tile revert if it's not in the grid
        out: function (event, ui) {
            console.log('out');
            $('.tile').draggable({ revert: true });
            //Make the tile not snap if it's not in the grid. Otherwise it snaps to the outside
            $('.tile').draggable({ snap: false });
        },
        // Disable non-adjacent squares to prevent spaces
        drop: function (event, ui) {
            console.log('drop');
            $(this)
                .attr('value', ui.draggable.attr('value'))
                .attr('letter', ui.draggable.attr('letter'))
                .droppable('disable');
            // Disable dragging placed tiles
            ui.draggable.draggable("destroy");
            $('.tile').draggable({ revert: true });
            // Make the tile not snap if it's not in the grid. Otherwise it snaps to the outside
            $('.tile').draggable({ snap: false });
        }
    });
}

function newTiles() {
    // Return each letter on the rack to the bag
    $('#rack .grid .tile').each(function () {
        var index = $(this).attr('index');
        returnLetter(index);
    });
    // Delete all tiles on rack grid
    $('#rack .grid').empty();
    // Add a tile to each grid on the rack
    $('#rack .grid').each(function () {
        // letterArr = [letter, value, index]
        letterArr = randLetter();
        letter = letterArr[0];
        value = letterArr[1];
        index = letterArr[2];
        // console.log(letter, value);
        // Make the tile
        var img = new Image(100, 100);
        img.src = 'images/tiles/' + letter + '.jpg';
        img.setAttribute('letter', letter);
        img.setAttribute('value', value);
        img.setAttribute('index', index);
        img.classList.add('tile');
        $(this).append(img);
    });
    addDragDrop();
}

// returns [letter, value, index] or false if no letters are left
function randLetter() {
    // If there are no more letters
    if (Letters.num.reduce((acc, val) => acc + val) <= 0) {
        return false;
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
    console.log(Letters.num.reduce((acc, val) => acc + val));
    return [newLetter, newValue, newIndex];
}

function returnLetter(letterIndex) {
    Letters.num[letterIndex]++;
}

function Submit() {
}

$(function() {addDragDrop()});