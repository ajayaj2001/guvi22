$(document).ready(function () {
  $("#login-submit").submit(function (event) {
    /* stop form from submitting normally */
    event.preventDefault();

    var email = $("#email").val(),
      password = $("#pwd").val();

    if (validateInput(email, password)) {
      // $("#email").val("");
      // $("#pwd").val("");
      sendRequest(email, password);
    }
  });
});

function sendRequest(email, password) {
  $.ajax({
    type: "POST",
    url: "assets/php/login.php",
    data: { email, password },

    success: function (data) {
      if (data.trim() === "success") {
        $("#dis-error").text("");
        window.location.href = "/guvi22/pages/welcome.html";
        alert("Successfully Login");
      } else if (data.trim() === "Invalid email or password") {
        $("#dis-error").text("wrong email or password");
      } else {
        $("#dis-error").text("Refresh and try again");
      }
    },
    error: function (data) {
      alert("some Error");
    },
  });
}

function validateInput(email, password) {
  var emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  var passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%.^&*])[a-zA-Z0-9!@#$.%^&*]{6,16}$/;

  var passCrt = false,
    emailCrt = false;

  if (emailRegex.test(email)) {
    $("#dis-error").text("");
    emailCrt = true;
  } else {
    emailCrt = false;
    $("#dis-error").text("please enter valid email");
  }

  if (passwordRegex.test(password)) {
    $("#dis-error").text("");
    passCrt = true;
  } else {
    $("#dis-error").text(
      "password must contain 1 number 1 special character & length 6 to 16"
    );
    passCrt = false;
  }

  return emailCrt && passCrt;
}
