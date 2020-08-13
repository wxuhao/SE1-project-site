$('.tile').draggable({
    containment: $('#board'),
    revert: true,
    snap: true,
    snapMode: "inner"
});
// For snapping
$(".grid").draggable();
$(".grid").draggable("disable");
$('.grid').droppable({
    over: function (event, ui) { $('.tile').draggable({revert: false})},
    out: function (event, ui) { $('.tile').draggable({ revert: true })}
});