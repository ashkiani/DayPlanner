var schedule = ["", "", "", "", "", "", "", ""];

$(document).ready(function () {
  function loadSchedule() {

    var value = localStorage.getItem("localSchedule");
    if (value !== null) {
      console.log(value);
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
  loadSchedule();
  console.log(schedule);
  function updateTimeText() {
    $(".currentDate").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  }
  updateTimeText();

  function AddElement(elementTag, elementClass, elementID, elementText, parentElement) {
    element = $("<" + elementTag + ">");
    if (elementClass !== null && elementClass !== "") {
      element.addClass(elementClass);
    }
    if (elementID !== null && elementID !== "") {
      element.attr("id", elementID);
    }
    if (elementText !== null && elementText !== "") {
      element.text(elementText);
    }
    element.appendTo(parentElement);
    return element;
  }

  function AddControls() {
    var rowEl;
    var colEl;
    var controlEl;
    var txt;
    var backColor;
    for (var i = 0; i < 9; i++) {
      rowEl = AddElement("div", "row", "row" + i, null, $(".schedule"));
      //time col
      txt = (9 + i);
      var currentHr = parseInt(moment().format("hh"));
      if (txt < currentHr) {
        backColor = "lightgray";
      }
      else if (txt == currentHr) {
        backColor = "lightgreen";
      }
      else {
        backColor = "lightblue";
      }
      colEl = AddElement("div", "col-md-1", null, txt + ":00", rowEl);
      colEl.css("background-color", backColor);
      colEl = AddElement("div", "col-md-10", null, null, rowEl);
      colEl.css("background-color", backColor);
      controlEl = AddElement("textarea", "form-control", "txt" + i, null, colEl);
      //button col
      colEl = AddElement("div", "col-md-1", null, null, rowEl);
      colEl.css("background-color", backColor);
      controlEl = AddElement("button", "btn btn-primary p-1", "btn" + i, "Save", colEl);
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

  //this function will save all of the notes that are changed
  function saveNotes() {
    var saveRequired = false;
    for (var i = 0; i < schedule.length; i++) {
      var txtAreaEl = $("#txt" + i);
      var txt = txtAreaEl.val()
      if (schedule[i] !== txt) {
        schedule[i] = txt;
        saveRequired = true;
        txtAreaEl.css("background-color", "white");
      }
    }
    if (saveRequired) {
      localStorage.setItem("localSchedule", JSON.stringify(schedule));
    }
  }

  $(".btn").click(function () {
    var radioValue = $("input[name='optradio']:checked").val();
    if (radioValue == "saveAllRows") {
      console.log("Saving All Rows");
      saveNotes();
    }
    else {
      console.log("Saving One Row");
      var btnID = $(this).attr('id');
      var index = parseInt(btnID.replace("btn", ""));
      txtID = "txt" + index;
      var txtAreaEl = $("#" + txtID);

      var txt = txtAreaEl.val()
      if (schedule[index] !== txt) {
        schedule[index] = txt;
        localStorage.setItem("localSchedule", JSON.stringify(schedule));
      }
      txtAreaEl.css("background-color", "white");
    }

  });

  $(".form-control").on('change', function () {
    $(this).css("background-color", "red");
  });


});
