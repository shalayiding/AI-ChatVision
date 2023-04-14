


$(function () {



  function none_code_markdown(str,markdown_div){
    var none_code_div = document.createElement("div");
    none_code_div.className = "none_code_markdown"
    var htmlContent = marked(str);
    none_code_div.innerHTML = htmlContent;
    markdown_div.appendChild(none_code_div);

  }
  function code_markdown(str,markdown_div){

    var code = document.createElement("pre");
    var sub_code = document.createElement("code");
    sub_code.innerHTML = str;
    code.appendChild(sub_code);
    markdown_div.appendChild(code);

  }



  function Format_markdown(str, container, class_name) { // format the given string base on type (userinput,chatgpt message)

    var markdown_div = document.createElement("div");

    if (class_name == 'message sent') { //user format
      var htmlContent = str.replace(/\n/g, "<br>");
      markdown_div.innerHTML = htmlContent;

    } else {
      
      str.forEach((stringItem) => {
        if(stringItem[1]){
          code_markdown(stringItem[0],markdown_div);
          // prettyPrint(markdown_div);
        }else{
          none_code_markdown(stringItem[0],markdown_div);
        }
      });
      console.log(str);

    }

    while (markdown_div.firstChild) {
      container.appendChild(markdown_div.firstChild);
    }
    
  }


  function createDiv(str, chatid, class_name) {
    // Create a new div element
    var mesDiv = document.createElement("div");

    // Set the class attribute of the div element
    mesDiv.setAttribute("class", class_name);
    //write string to usermessage

    Format_markdown(str, mesDiv, class_name);
    // Get a reference to an existing HTML element
    var existingElement = document.getElementById(chatid);

    // Append the new div element as a child of the existing HTML element
    existingElement.appendChild(mesDiv);
    hljs.highlightAll();

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
      document.getElementById("val").style.height = "84px";
      // document.getElementById("val").style.lineHeight = "2";
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