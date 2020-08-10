/*
    File: "https://wxuhao.github.io/js/jquery_version.js"
91.61 GUI Programming I Assignment 6: jQuery
Xuhao Wang, UMass Lowell Student, xuhao_wang@student.uml.edu
Created August 5, 2020
Assignment 7
*/

// Create the table
function populateTable(topStart, topEnd, leftStart, leftEnd) {
    // Erase old table
    document.getElementById('tHead').innerHTML = '';
    document.getElementById('tBody').innerHTML = '';
    var table = document.getElementById('multTable');
    var topLength = topEnd - topStart;
    var leftLength = leftEnd - leftStart;
    // Create header row
    headRow = table.tHead.insertRow(0);
    // Create empty first cell
    headCell = document.createElement('th');
    headRow.appendChild(headCell);
    // Insert header cells
    for (i = 0; i <= topLength; i++) {
        headCell = document.createElement('th');
        headRow.appendChild(headCell);
        headCell.innerHTML = topStart + i;
    }
    // Insert table rows
    tBody = table.tBodies[0];
    for (i = 0; i < leftLength + 1; i++) {
        row = tBody.insertRow(i);
    }
    // Insert left header cells
    for (i = 0; i <= leftLength; i++) {
        row = table.rows[i + 1];
        cell = document.createElement('th');
        row.appendChild(cell);
        cell.innerHTML = leftStart + i;
    }
    // Populate table
    for (row = 1; row <= leftLength + 1; row++) {
        thisRow = table.rows[row];
        for (col = 1; col <= topLength + 1; col++) {
            cell = thisRow.insertCell(col);
            cell.innerHTML = (row + leftStart - 1) * (col + topStart - 1);
        }
    }
}
// jQuery Validation version:
jQuery.validator.setDefaults({
    success: 'valid'
});
$('#form').validate({
    rules: {
        top1: {
            required: true,
        },
        top2: {
            required: true,
        },
        left1: {
            required: true,
        },
        left2: {
            required: true,
        }
    },
    // Populate table on success
    submitHandler: function (form) {
        var top1 = document.getElementById('top1').value;
        var top2 = document.getElementById('top2').value;
        var left1 = document.getElementById('left1').value;
        var left2 = document.getElementById('left2').value;
        populateTable(parseInt(top1), parseInt(top2), parseInt(left1), parseInt(left2));
    }
});
// Validate that top end is larger than top beginning
$.validator.addMethod('checkTop2', function (value, element) {
    var top1 = document.getElementById('top1').value;
    var top2 = document.getElementById('top2').value;
    if (parseInt(top2) < parseInt(top1)) {
        return false;
    }
    else {
        return true;
    }
}, 'Must be larger than the top starting number');
// Validate that left end is larger than left beginning using checkLeft2
$.validator.addMethod('checkLeft2', function (value, element) {
    var left1 = document.getElementById('left1').value;
    var left2 = document.getElementById('left2').value;
    if (parseInt(left2) < parseInt(left1)) {
        return false;
    }
    else {
        return true;
    }
}, 'Must be larger than the left starting number');

var sliderOptions = {
    min: -50,
    max: 50,
    step: 1,
    value: 0,
    // Get id of field by using slice to remove last 6 characters, which is always 'slider'. top1slider --> top1
    slide: function() {changeField(this.id.slice(0,-6), $(this).slider('option','value'));},
    stop: function () {changeField(this.id.slice(0, -6), $(this).slider('option', 'value')); }
}
$('#top1slider').slider(sliderOptions);
$('#top2slider').slider(sliderOptions);
$('#left1slider').slider(sliderOptions);
$('#left2slider').slider(sliderOptions);
// Change slider value when textbox changes
function changeSlider(slider, value) {
    $(slider).slider('value', value);
    $('form').valid();
}
$('#top1').on('keyup change', function() {changeSlider('#top1slider', $('#top1').val())});
$('#top2').on('keyup change', function () { changeSlider('#top2slider', $('#top2').val()) });
$('#left1').on('keyup change', function () { changeSlider('#left1slider', $('#left1').val()) });
$('#left2').on('keyup change', function () { changeSlider('#left2slider', $('#left2').val()) });
// Change box value when slider changes
function changeField(field, value) {
    document.getElementById(field).value = value;
    $('form').valid();
}
// Default table
populateTable(5, 10, 1, 5);
// Display required fields
$('form').valid();