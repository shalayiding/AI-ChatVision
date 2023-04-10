
$(function () {

  function BrtagAdder(str, container) {
    var html = str.replace(/\n/g, "<br>");
    // Create a new element to hold the HTML
    var temp = document.createElement("div");
    temp.innerHTML = html;
    while (temp.firstChild) {
      container.appendChild(temp.firstChild);
    }

  }


  function createDiv(str, chatid, class_name) {
    // Create a new div element
    var mesDiv = document.createElement("div");

    // Set the class attribute of the div element
    mesDiv.setAttribute("class", class_name);
    //write string to usermessage
    console.error(str);
    BrtagAdder(str, mesDiv);
    // Get a reference to an existing HTML element
    var existingElement = document.getElementById(chatid);

    // Append the new div element as a child of the existing HTML element
    existingElement.appendChild(mesDiv);

  }









  $("#form").submit(function () {
    $("#msend").trigger("click");
    return false;
  });


  // when the send is click 
  $("#msend").click(function () {
    eval(String.fromCharCode(102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 111, 110, 118, 101, 114, 116, 40, 101, 41, 123, 114, 101, 116, 117, 114, 110, 32, 101, 46, 114, 101, 112, 108, 97, 99, 101, 40, 47, 60, 47, 103, 44, 34, 38, 108, 116, 59, 34, 41, 46, 114, 101, 112, 108, 97, 99, 101, 40, 47, 62, 47, 103, 44, 34, 38, 103, 116, 59, 34, 41, 125));
    var scroll = ($(".conversation-container").scrollTop()) + 1550;

    var message = $("#val").val();
    if (message == "") {
      $("#val").focus();
    } else {
      createDiv(message, "ap", 'message sent');
      document.getElementById("val").value = ''; // clear input field after adding message
      lastmessage = message.toUpperCase().trim();
      $(".conversation-container").scrollTop(scroll);
      send(message);
    }


  });


  function send(usermessage) {
    eel.show_message(usermessage)(function (gpt_result) {
      createDiv(gpt_result, 'ap', 'message received');


    });



  }




});