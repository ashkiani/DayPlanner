var schedule = ["", "", "", "", "", "", "", ""];

$(document).ready(function () {
  function loadSchedule() {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      console.log(key);
      if (key !== null) {
        if (key === "localSchedule") {
          var value = localStorage.getItem(key);
          console.log('Key: ' + key + ', Value: ' + value);
          var localSchedule = JSON.parse(value);
          if (localSchedule !== null) {
            for (var j = 0; j < schedule.length; j++) {
              if (localSchedule[j] !== null) {
                console.log(localSchedule[j]);
                schedule[j] = localSchedule[j];
              }
            }

          }
        }

      }
    }
  }
  loadSchedule();
  console.log(schedule);
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
      rowEl.attr("id", "row" + i);
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
      controlEl.attr("id", "txt" + i);
      //controlEl.text("text");
      controlEl.appendTo(colEl);
      //button col
      colEl = $("<div>");
      colEl.addClass("col-md-1");
      colEl.appendTo(rowEl);
      controlEl = $("<button>");
      controlEl.addClass("btn btn-primary");
      controlEl.attr("id", "btn" + i);
      controlEl.text("Save");
      controlEl.appendTo(colEl);
    }
  }
  AddControls();
  function loadNotes() {
    for (var i = 0; i < schedule.length; i++) {
      var txtAreaEl = $("#txt" + i);
      txtAreaEl.text(schedule[i]);
    }
  }
  loadNotes();

  function updateTimeTextByInterval() {
    updateTimeText();
  }

  setInterval(updateTimeTextByInterval, 1000);

  function saveNotes() {
    var saveRequired =false;
    for (var i = 0; i < schedule.length; i++) {
      var txtAreaEl = $("#txt" + i);
      var txt = txtAreaEl.val()
      if (schedule[i] !== txt) {
        schedule[i] = txt;
        saveRequired =true;
      }
    }
    if (saveRequired){
      localStorage.setItem("localSchedule",schedule);
    }
  }

  $(".btn").click(function () {
    var txtID = $(this).attr('id');
    txtID = txtID.replace("btn", "txt");
    var txtAreaEl = $("#" + txtID);
    saveNotes();
    // alert(txtAreaEl.val());

  });



});
