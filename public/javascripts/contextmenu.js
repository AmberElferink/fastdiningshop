//references used to make this code
//https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app
//from: https://stackoverflow.com/questions/17042997/jquery-copy-selected-text-from-paragraph-to-input-on-button-click-multiple-inpu

//variables used for the function that alter the text on the pages and are by default false, making the text look normal
var isBold = false;
var isItalic = false;
var isPink = false;
var isGreen = false;
var isBlue= false;

//this function makes the text on the page bold
function functionBold() {
    if (isBold) {
        //if the text is already bold (isBold=true) the text is changed back to normal when clicking the bold-button
        isBold = false;
        document.getElementById("text").style.fontWeight = "normal"
    } else {
        //if the text is normal the text is changed to bold when clicking the bold-button
        isBold = true;
        document.getElementById("text").style.fontWeight = "bold";
    }
}

//this function makes the text on the page italic
function functionItalic(){
    if (isItalic) {
        //if the text is already italic (isItalic=true) the text is changed back to normal when clicking the italic button
        isItalic = false;
        document.getElementById("text").style.fontStyle = "normal";
    } else {
        //if the text is normal the text is changed to italic when clicking the italic-button
        isItalic = true;
        document.getElementById("text").style.fontStyle = "italic";
    }
}

//this function makes the text color pink
function functionColorPink() {
    if (isPink){
        //if the text is already pink (isPink=true) the text is changed back to the color black
        isPink = false;
        document.getElementById("text").style.color="black";
    } else{
        //if the text is black the text color is changed to pink
        isPink = true;
        document.getElementById("text").style.color="pink";
    }

}

//this function makes the text color green
function functionColorGreen() {
    if (isGreen) {
        //if the text is already green (isGreen=true) the text color is changed back to black
        isGreen = false;
        document.getElementById("text").style.color = "black";
    } else {
        //if the text is black the text color is changed to green
        isGreen = true;
        document.getElementById("text").style.color = "green";
    }

}

//this function makes the text color blue
function functionColorBlue() {
    if (isBlue) {
        //if the text color is already blue (isBlue=true) the text color is changed back to black
        isBlue = false;
        document.getElementById("text").style.color = "black";
    } else {
        //if the text is black the text color is changed to blue
        isBlue = true;
        document.getElementById("text").style.color = "blue";
    }
}

//When right clicked the context menu must be shown
$(document).bind("contextmenu", function (event) {
    //global variable for the selected text when the menu showed
    window.selected = getSelectedText();

    // Avoid the normal context menu
    event.preventDefault();

    // Show new custom contextmenu
    $(".context-menu").finish().toggle(100).

    // The context menu must be shown at the place of the cursor
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});


// If the document is clicked somewhere else on the screen, the context menu will hide
$(document).bind("mousedown", function (e) {

// If the clicked element is not the menu
    if (!$(e.target).parents(".context-menu").length > 0) {
        // Hide it
        $(".context-menu").hide(100);
    }
});

// Get user selection text on page
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}