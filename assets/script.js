/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 5 Weekly Challenge - Hourly Work Day Scheduler
Created 2023/08/09
Last Edited 2023/08/13
*/

//waits until document is finished loading before running main code
$(document).ready(function()
{
  //creates an array including each individual hour block
  workHours =
  [
    hourNine = $("#hour-9"),
    hourTen = $("#hour-10"),
    hourEleven = $("#hour-11"),
    hourTwelve = $("#hour-12"),
    hourThirteen = $("#hour-13"),
    hourFourteen = $("#hour-14"),
    hourFifteen = $("#hour-15"),
    hourSixteen = $("#hour-16"),
    hourSeventeen = $("#hour-17")
  ]

  //function to render already-existing event data from local storage
  function loadEvents()
  {
    hourNine.children("textarea").val(localStorage.getItem("9AM"));
    hourTen.children("textarea").val(localStorage.getItem("10AM"));
    hourEleven.children("textarea").val(localStorage.getItem("11AM"));
    hourTwelve.children("textarea").val(localStorage.getItem("12PM"));
    hourThirteen.children("textarea").val(localStorage.getItem("1PM"));
    hourFourteen.children("textarea").val(localStorage.getItem("2PM"));
    hourFifteen.children("textarea").val(localStorage.getItem("3PM"));
    hourSixteen.children("textarea").val(localStorage.getItem("4PM"));
    hourSeventeen.children("textarea").val(localStorage.getItem("5PM"));
  }

  //render all saved event data from local storage
  loadEvents();

  //sends any applicable event data to local storage when a button is clicked
  $("button").on("click", function()
  {
    //retrieves the hour title of the block containing the button that was clicked
    var blockClicked = $(this).siblings("div").text();

    //retrives any event data within the hour block that was clicked
    var eventData = $(this).siblings("textarea").val();

    //sends event data to local storage under the same name as blockClicked
    localStorage.setItem(blockClicked, eventData);
  });
  
  //converts current hour in 24-hour format to an integer
  var currentHour = parseInt(dayjs().format("HH"))

  //if it is between and including 12:00 AM and 8:59 AM, all hour blocks are assigned the future class, and cleared of all other hour-based classes
  if (currentHour < 9)
  {
    for (hour = 0; hour < workHours.length; hour++)
    {
      workHours[hour].removeClass("past")
      workHours[hour].removeClass("present")
      workHours[hour].addClass("future");
    }
  }
  else if (currentHour > 17) //if it is past between and including 6:00 PM and 11:59 PM, removes present class from 5:00 PM block and assigns all blocks past class
  {
    workHours[8].removeClass("present")

    for (hour = 0; hour < workHours.length; hour++)
    {
      workHours[hour].addClass("past");
    }
  }
  else //if it is between and including 9:00 AM and 5:59 PM, colours hour blocks accordingly
  {
    //assigns past class and associated styles to all blocks for hours that have passed
    for (hour = 0; hour < currentHour - 9; hour++)
    {
      workHours[hour].removeClass("present")
      workHours[hour].addClass("past");
    }

    //assigns present class and associated styles for current hour block
    workHours[currentHour - 9].removeClass("future")
    workHours[currentHour - 9].addClass("present")

    //assigns future class and associated styles to all blocks for hours that have yet to arrive
    for (hour = 8; hour > currentHour - 9; hour--)
    {
      workHours[hour].addClass("future");
    }
  }

  //displays current date just above the hour blocks at the top of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});


