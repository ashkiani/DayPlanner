$(document).ready(function () {

  function updateTimeText() {
    $(".currentDate").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  }
  updateTimeText();
  function AddControls() {
    var rowEl;
    var colEl;
    var controlEl;
    for (var i = 0; i < 9; i++) {
      rowEl = $("<div>");
      rowEl.addClass("row");
      //time col
      colEl = $("<div>");
      colEl.addClass("col-md-1");
      colEl.text((9 + i) + ":00");
      colEl.appendTo(rowEl);
      rowEl.appendTo($(".container"));
      //text col
      colEl = $("<div>");
      colEl.addClass("col-md-10");
      colEl.appendTo(rowEl);
      controlEl = $("<textarea>");
      controlEl.addClass("form-control");
      controlEl.text("text");
      controlEl.appendTo(colEl);
      //button col
      colEl = $("<div>");
      colEl.addClass("col-md-1");
      colEl.appendTo(rowEl);
      controlEl = $("<button>");
      controlEl.addClass("btn btn-primary");
      controlEl.text("Save");
      controlEl.appendTo(colEl);
    }
  }
  AddControls();

  function updateTimeTextByInterval() {
    updateTimeText();
  }

  setInterval(updateTimeTextByInterval, 1000);
});
