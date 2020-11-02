/*
    File: "https://wxuhao.github.io/js/jquery_version.js"
91.61 GUI Programming I Assignment 6: jQuery
Xuhao Wang, UMass Lowell Student, xuhao_wang@student.uml.edu
Created August 5, 2020
jQuery version
*/

// Create the table
function populateTable(topStart, topEnd, leftStart, leftEnd) {
    // Erase old table
    document.getElementById("tHead").innerHTML = '';
    document.getElementById("tBody").innerHTML = '';
    var table = document.getElementById("multTable");
    var topLength = topEnd - topStart;
    var leftLength = leftEnd - leftStart;
    // Create header row
    headRow = table.tHead.insertRow(0);
    console.log(headRow);
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
    success: "valid"
});
$("#form").validate({
    rules: {
        top1: {
            required: true,
            rangelength: [-50, 50]
        },
        top2: {
            required: true,
            rangelength: [-50, 50]
        },
        left1: {
            required: true,
            rangelength: [-50, 50]
        },
        left2: {
            required: true,
            rangelength: [-50, 50]
        }
    },
    // Populate table on success
    submitHandler: function (form) {
        var top1 = document.getElementById('top1').value;
        var top2 = document.getElementById('top2').value;
        var left1 = document.getElementById('left1').value;
        var left2 = document.getElementById('left2').value;
        console.log(top1, top2, left1, left2);
        populateTable(parseInt(top1), parseInt(top2), parseInt(left1), parseInt(left2));
    }
});
// Validate that top end is larger than top beginning
$.validator.addMethod("checkTop2", function (value, element) {
    var top1 = document.getElementById('top1').value;
    var top2 = document.getElementById('top2').value;
    if (top2 < top1) {
        console.log(num, top1);
        return false;
    }
    else {
        return true;
    }
}, 'Must be larger than the top starting number');
// Validate that left end is larger than left beginning using checkLeft2
$.validator.addMethod("checkLeft2", function (value, element) {
    var left1 = document.getElementById('left1').value;
    var left2 = document.getElementById('left2').value;
    if (left2 < left1) {
        return false;
    }
    else {
        return true;
    }
}, 'Must be larger than the left starting number');

// Default table
populateTable(5, 10, 1, 5);