
var wins = 0;
var losses = 0;
var counter = 0;
var targetNumber;

// The function to generate a random number from 1-12 for the crystals
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Create 4 unique integers
function getRandomInts() {
    var ints = [];
    while (ints.length < 4) {
        var randNum = getRandomInt(1, 12);
        if (!ints.includes(randNum)) {
            ints.push(randNum);
        }
    }
    return ints;
}

var numberOptions

// Next we create a for loop to create crystals for every numberOption.
function createNewCrystals() {
    for (var i = 0; i < numberOptions.length; i++) {

        // For each iteration, we will create an imageCrystal
        var imageCrystal = $("<img>");

        // First each crystal will be given the class ".crystal-image".
        // This will allow the CSS to take effect.
        imageCrystal.addClass("crystal-image");

        // Each imageCrystal will be given a src link to the crystal image
        imageCrystal.attr("src", "../crystal-game/assets/images/" + i + ".png");

        // Each imageCrystal will be given a data attribute called data-crystalValue.
        // This data attribute will be set equal to the array value.
        imageCrystal.attr("data-crystalvalue", numberOptions[i]);

        // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
        $("#crystals").append(imageCrystal);
    }
}

//This function will reset the game
function resetGame() {
    numberOptions = getRandomInts();
    // This generates the random number for the score that needs to be achieved
    targetNumber = 9//getRandomInt(19, 120);
    $("#targetNumber").html(targetNumber);
    createNewCrystals();
    counter = 0;
    $("#counter").html(counter)
    console.log(numberOptions);
    $(document).ready();
}

resetGame();
// This time, our click event applies to every single crystal on the page. Not just one.
$(document).ready(function () {
    $(".crystal-image").on("click", function () {

        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        // We then add the crystalValue to the user's "counter" which is a global variable.
        // Every click, from every crystal adds to the global counter.
        counter += crystalValue;

        // All of the same game win-lose logic applies. So the rest remains unchanged.
        $("#counter").html(counter);

        if (counter === targetNumber) {
            wins++;
            $("#wins").html(wins);
            $(".crystal-image").remove();
            resetGame();
        }

        else if (counter > targetNumber) {
            losses++;
            $("#losses").html(losses);
            $(".crystal-image").remove();
            resetGame();
        }

    })
});