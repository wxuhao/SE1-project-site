// ADD NEW ITEM TO END OF LIST
//list = document.getElementById('four');
var lastChild = document.getElementById('four');
var end = document.createElement('li');
end.appendChild(document.createTextNode('cream'));
lastChild.after(end);

// ADD NEW ITEM START OF LIST
var list = document.getElementsByTagName('ul')[0];
var firstChild = document.getElementById('one');
var start = document.createElement('li');
start.appendChild(document.createTextNode('kale'));
list.insertBefore(start, firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var li = document.getElementsByTagName('li');
for (i=0; i<li.length; i++) {
    li[i].classList.add('cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var span = document.createElement('span');
span.appendChild(document.createTextNode(li.length));
var h2 = document.getElementsByTagName('h2')[0];
h2.appendChild(span);