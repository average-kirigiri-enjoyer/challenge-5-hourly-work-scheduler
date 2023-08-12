// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
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
    hourSixteenSeventeen = $("#hour-17")
  ]
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  
  
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?



  //displays current date just above the hour blocks at the top of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});


