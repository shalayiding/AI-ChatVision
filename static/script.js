$(function () {
  function none_code_markdown(str, markdown_div) {
    var none_code_div = document.createElement("div");
    none_code_div.className = "none_code_markdown";
    var htmlContent = marked(str);
    none_code_div.innerHTML = htmlContent;
    markdown_div.appendChild(none_code_div);
  }
  function code_markdown(str, markdown_div) {
    var code = document.createElement("pre");
    var sub_code = document.createElement("code");
    sub_code.innerHTML = str;
    code.appendChild(sub_code);
    markdown_div.appendChild(code);
  }

  function Format_markdown(str, container, class_name) {
  // format the given string base on type (userinput, chatgpt message)
  var markdown_div = document.createElement("div");

  if (class_name == "message sent") {
    // user format
    var htmlContent = str.replace(/\n/g, "<br>");
    markdown_div.innerHTML = htmlContent;
  } else {
    if (Array.isArray(str)) {
      str.forEach((stringItem) => {
        if (stringItem[1]) {
          code_markdown(stringItem[0], markdown_div);
          // prettyPrint(markdown_div);
        } else {
          none_code_markdown(stringItem[0], markdown_div);
        }
      });
    } else {
      // Handle the case when `str` is not an array
      none_code_markdown(str, markdown_div);
    }
  }

  while (markdown_div.firstChild) {
    container.appendChild(markdown_div.firstChild);
  }
}


  function createDiv(str, chatid, class_name) {


    var Box_div = document.createElement("div");
    // Create the <i> element
    var iconElement = document.createElement("i");

    var honeycombContainer = document.createElement("div");

    if(class_name == 'message received'){
      var honeycombContainer = document.querySelector(".honeycomb");
      if (honeycombContainer) {
        // Remove the honeycomb container from its parent
        honeycombContainer.parentNode.removeChild(honeycombContainer);
      }
      Box_div.setAttribute("class", 'bot_response');
      iconElement.setAttribute("class", "fas fa-robot");
      
    }else{
      Box_div.setAttribute("class", 'user_response');
      iconElement.setAttribute("class", "fa fa-user-circle-o");
      
      
      
      honeycombContainer.classList.add("honeycomb");

      // Create and append the child div elements
      for (var i = 0; i < 8; i++) {
        var honeycombDiv = document.createElement("div");
        honeycombContainer.appendChild(honeycombDiv);
      }
     
    }
    iconElement.style.fontSize = "25px";
    iconElement.style.color = "white";
    iconElement.style.margin = 'auto';
    // Append the <i> element to the div
    Box_div.appendChild(iconElement);



    // Create a new div element
    var mesDiv = document.createElement("div");
    // Set the class attribute of the div element
    mesDiv.setAttribute("class", class_name);


    Format_markdown(str, mesDiv, class_name);
    // Append the <i> element to the div
    Box_div.appendChild(mesDiv);

    // Get a reference to an existing HTML element
    var existingElement = document.getElementById(chatid);
    if(class_name != 'message received'){
      Box_div.appendChild(honeycombContainer);
    }

    // Append the new div element as a child of the existing HTML element
    existingElement.appendChild(Box_div);
    hljs.highlightAll();
  }

  $("#form").submit(function () {
    $("#msend").trigger("click");
    return false;
  });

  // when the send is click
  $("#msend").click(function () {
    var scroll = $(".conversation-container").scrollTop() + 1550;

    var message = $("#val").val();
    if (message == "") {
      $("#val").focus();
    } else {
      message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      createDiv(message, "ap", "message sent");
      document.getElementById("val").value = ""; // clear input field after adding message
      document.getElementById("val").style.height = "84px";
      // document.getElementById("val").style.lineHeight = "2";
      lastmessage = message.toUpperCase().trim();
      $(".conversation-container").scrollTop(scroll);
      send(message);
    }
  });

  function send(usermessage) {
    // $.show_message(usermessage)(function (gpt_result) {
    //   createDiv(gpt_result, "ap", "message received");
    // });

    $.ajax({
      url: '/process',
      type: 'POST',
      data: { message: usermessage },
      success: function(response) {
          console.log("Response from Flask backend:", response);
          
          var content = response.response.message; // Access the correct property
          console.log("Content:", content);
          for (var i = 0; i < content.length; i++) {
            if (typeof content[i][0] === 'string') {
              content[i][0] = content[i][0].replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Replace even index with asterisk (*)
            }
          }
          createDiv(response.response.message, "ap", "message received");
          // Handle the response from the Flask backend here
      },
      error: function(error) {
          console.log("Error:", error);
          createDiv("Error with GPT API call", "ap", "message received");
      }
  });
  


  }



});
