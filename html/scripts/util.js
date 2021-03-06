/**
 *  @author Jacob Magnuson <jwmagnuson95@outlook.com>
 *
 *  @module util.js
 *
 *  @version 0.0.0
 *
 *  @file Contains various utility functions
 */


//============================================================================
function toggleVisible(id) {
    /**
     *  @function
     *
     *  @name toggleVisible
     *
     *  @param {String} id - The id to toggle
     *
     *  @description Toggles the visibility of the given id
     */

    // Get the desired element
    ele = document.getElementById(id);

    // Toggle visibility
    ele.style.visibility =
        (ele.style.visibility == 'visible') ? 'hidden' : 'visible';
}


//============================================================================
function loginRedirect() {
    /**
     *  @function
     *
     *  @name loginRedirect
     *
     *  @description Redirects the user to the login page
     */

    window.location.assign('/login.html');
}


//============================================================================
function randString(num) {
    /**
     * @function
     *
     * @name randString
     *
     * @param {Number} num - The length of the desired string
     *
     * @description Generates a random string of length num. The main
     * purpose of this function is to prevent AJAX caching
     */

    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


//============================================================================
function setInner(id, innerText) {
    /**
     *  @function
     *
     *  @name setInner
     *
     *  @param {String} id - The id of an element
     *
     *  @param {String} innerText - A string to replace the id's innerHTML
     *
     *  @description Sets the innerHTML of the given id to the given string
     */

    document.getElementById(id).innerHTML = innerText;
}


//============================================================================
function getDateFromId(id) {
    /**
     *  @function
     *
     *  @name getDateFromId
     *
     *  @param {String} id - The id of an element containing a date string
     *
     *  @return {Date} A date object based on the value of the given id
     *
     *  @description Creates a date object using the value of the given id's
     *  associated element
     */

    return new Date(document.getElementById(id).value);
}


//============================================================================
function getTimestamp(date, time) {
    /**
     *  @function
     *
     *  @name getTimeStamp
     *
     *  @param {Date} date - A date object containing the desired date
     *
     *  @param {Date} time - A date object containing the desired time
     *
     *  @return {Number} A Unix Timestamp reflecting the given date and time
     *
     *  @description Takes date objects containing a desired date and time and
     *  converts them to a Unix Timestamp
     */

    // Build the date object
    var myDate = new Date(date.getFullYear(), date.getMonth(),
                          date.getDate(), time.getHours(),
                          time.getMinutes(), time.getSeconds(), 0, 0);

    // Convert the object to a Unix Timestamp (get rid of the milliseconds)
    // and return
    return Math.floor(myDate.getTime() / 1000);
}


//============================================================================
function generateDates(numDays) {
    /**
     *  @function
     *
     *  @name generateDates
     *
     *  @param {Number} numDays - The number of days to generate
     *
     *  @description Generate's date objects for the given number of days and
     *  adds them to the start-date-select and end-date-select elements
     */

    // Generate array containing the next numDays dates
    var days = [];
    for (var i = 0; i < numDays; i++) {
        var myDate = new Date(new Date().getTime() + 86400000 * i);
        days.push(myDate);
    }

    //Add each item in days to the dataSelect dropdown
    var startDropdown       = document.getElementById('start-date-select');
    var endDropdown         = document.getElementById('end-date-select');
    startDropdown.innerHTML = '';
    endDropdown.innerHTML   = '';

    for (var j = 0; j < days.length; ++j) {
        startDropdown[startDropdown.length] =
            new Option(formatDateString(days[j]), days[j]);
        endDropdown[endDropdown.length] =
            new Option(formatDateString(days[j]), days[j]);
    }
}


//============================================================================
function generateTimes() {
    /**
     *  @function
     *
     *  @name generateTimes
     *
     *  @description generates a date object for every 15-minute interval
     *  in the day (12:00AM to 11:45PM) and adds it to the start-time-select
     *  and end-time-select elements
     */

    // Get the needed elements
    var startDropdown = document.getElementById('start-time-select');
    var endDropdown   = document.getElementById('end-time-select');

    // Clear any existing data inside the elements
    startDropdown.innerHTML = '';
    endDropdown.innerHTML   = '';

    // Generate a new date object at the current time and one at midnight
    var today = new Date();
    var myDate = new Date(today.getFullYear(), today.getMonth(),
                          today.getDate(), 0, 0, 0, 0);

    // Loop through the entire day, adding 15 minutes every loop
    // Append every 15-minute interval to startDropdown and endDropdown
    while (myDate.getDate() == today.getDate()) {
        startDropdown[startDropdown.length] = new Option(formatAMPM(myDate),
                                                         myDate);
        endDropdown[endDropdown.length]     = new Option(formatAMPM(myDate),
                                                         myDate);
        myDate.setTime(myDate.getTime() + 900000);
    }

    // Set today to next quarter hour
    today.setMinutes((today.getMinutes() -
                      (today.getMinutes() % 15)) + 15);

    // Loop through the dropdowns and set the matching time to selected
    for (var i = 0; i < startDropdown.length; i++) {
        myDate = new Date(startDropdown[i].value);
        if(myDate.getHours() == today.getHours() &&
           myDate.getMinutes() == today.getMinutes()) {
            startDropdown[i].selected = true;
            endDropdown[i].selected = true;
        }
    }

}


//============================================================================
function formatAMPM(date) {
    /**
     *  @function
     *
     *  @name formatAMPM
     *
     *  @param {Date} date - The date to be formatted
     *
     *  @return {String} A string containing the formatted time
     *
     *  @description Takes a date object and converts the time from 24-hour to
     *  an AM/PM format
     */

    // Get hours and minutes from date
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // Determine whether to use AM or PM
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Reduce hours if it is greater than 12
    hours = hours % 12;

    // the hour '0' should be '12'
    hours = hours ? hours : 12;

    // Append a 0 if minutes is less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Build and return the newly formatted time string
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


//============================================================================
function formatDateString(date) {
    /**
     *  @function
     *
     *  @name formatDateString
     *
     *  @param {Date} date - the date to be formatted
     *
     *  @return {String} A string containing the formatted date
     *
     *  @description Takes a date and returns a string in the format
     *  'Monday, August 12, 2015'
     */

    // Create arrays containing the day and month names
    var dayNames = [
        'Sun', 'Mon', 'Tues',
        'Wed', 'Thurs', 'Fri',
        'Sat'
    ];

    var monthNames = [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'June',
        'July', 'Aug', 'Sept',
        'Oct', 'Nov', 'Dec'
    ];

    // Create a formatted string using the given date
    var dateString = dayNames[date.getDay()] + ', ' +
        monthNames[date.getMonth()] + ' ' +
        date.getDate() + ', ' + date.getFullYear();

    return dateString;
}


//============================================================================
function formatReservations() {
    /**
     *  @function
     *
     *  @name formatReservations
     *
     *  @description Formats the element with the id 'reservations'
     *  (Should be a table), increasing the readability of dates and booleans
     */

    // Get all table data elements from the reservations table
    var res = document.getElementById('reservations');
    var tab = res.getElementsByTagName('td');

    // Initialize the control variable
    var i = 0;

    // Format the lift data to a readable format
    // The lift data is in the 6th cell of each row
    i = 5;
    while (i < tab.length) {
        // The lift value is currently set as a '0' for false or a '1' for
        // true, this formats it to 'No' for false and 'Yes' for true
        tab[i].innerHTML = tab[i].innerHTML == '1' ? 'Yes' : 'No';
        // The lift field appears once per row, and there are 8 cells per row
        i += 8;
    }

    // Format the date data to a readable format
    // The date data is in the 2nd and 3rd cell of each row
    i = 1;
    while (i < tab.length) {
        // Date string stored in table is incompatible with javascript
        // It needs to be split it up into its parts and rebuilt
        // This splits the date string on the ' ', ':', and '-' characters
        var splitTime = tab[i].innerHTML.split(/[ :-]/);

        // Now the date is built using the pieces that were just made
        var myDate = new Date(splitTime[0], splitTime[1] - 1, splitTime[2],
                              splitTime[3], splitTime[4], splitTime[5], 0);
        // Now format the date using the functions defined earlier
        var dateFormatted = formatAMPM(myDate) + '<br />' +
            formatDateString(myDate);

        // Finally set the element's innerHTML to the newly formatted data
        tab[i].innerHTML = dateFormatted;

        // The dates are currently placed in a pattern like this:
        // 1, 2, 9, 10, 17, 18, etc...
        if(i % 8 == 1)
            i++;
        else if(i % 8 == 2)
            i += 7;
        else
            break;
    }

    // Format reservation IDs
    // The reservation ID is in the first cell of each row
    i = 0;
    while (i < tab.length) {
        tab[i].innerHTML = '#' + tab[i].innerHTML;
        i += 8;
    }
}


//============================================================================
function formatAvailable() {
    /**
     *  @function
     *
     *  @name formatAvailable
     *
     *  @description Formats the element with id 'available'
     *  (should be a table), improving the readability of boolean values
     */

    // Creates an array containing all the 'td' elements in the
    // 'available' div
    var res = document.getElementById('available');
    var tab = res.getElementsByTagName('td');

    // Initialize control variable
    var i = 0;

    // Loop through the table, formatting the needed cells
    i = 4;
    while (i < tab.length) {
        tab[i].innerHTML = tab[i].innerHTML == '1' ? 'Yes' : 'No';
        i += 7;
    }
}


//============================================================================
function addButtonCalls() {
    /**
     *  @function
     *
     *  @name addButtonCalls
     *
     *  @description Sole purpose of this function is to consolidate
     *  the function calls needed when the user presses the 'add'
     *  button (keeps the html page cleaner)
     */

    // Toggle visibility of the add-modal
    toggleVisible('add-modal');

    // Populate the date dropdown with 30 days
    generateDates(30);

    // Populate the time dropdown
    generateTimes();

    // Populate the capacity dropdown
    fillId('capacity-select');

    // Populate the available table
    getAvailable();
}

