/*
    author:		Alexandre S Ito
    date:		12-Mar-2022
    notes:		Project Dice Game
*/

//Element by id
const $showHidePlayButton = $('#show-hide-play');
const $showHideRuleButton = $('#show-hide-rule');
const $howToPlayInfo = $('#how-to-play-info');
const $rulesInfo = $('#rules-info');

//Initial status
$howToPlayInfo.hide();
$rulesInfo.hide();

//Helpers
function hideShowTextChange(element) {
    if (element.text() == "Show") {
        element.text("Hide");
    }
    else {
        element.text("Show");
    }
};

//BUTTON SHOW HIDE
$showHidePlayButton.click(function () {
    $howToPlayInfo.slideToggle("slow");
    hideShowTextChange($showHidePlayButton);
});
$showHideRuleButton.click(function () {
    $rulesInfo.slideToggle("slow");
    hideShowTextChange($showHideRuleButton);
});