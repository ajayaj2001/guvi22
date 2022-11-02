$(document).ready(function () {
  $("#reg-submit").submit(function (event) {
    /* stop form from submitting normally */
    event.preventDefault();

    var email = $("#email").val(),
      password = $("#pwd").val(),
      name = $("#name").val(),
      pNum = $("#pNum").val();

    if (validateInput(email, password, name, pNum)) {
      $("#dis-error").text("");
      // $("#email").val("");
      // $("#pwd").val("");
      // $("#name").val("");
      // $("#pNum").val("");
      sendRequest(email, password, name, pNum);
    } else {
      console.log("error");
    }
  });
});

function sendRequest(email, password, name, pNum) {
  $.ajax({
    type: "POST",
    url: "../assets/php/register.php",
    data: { email, password, name, pNum },

    success: function (data) {
      if (data.trim() === "success") {
        $("#dis-error").text("");
        alert("Successfully Account created");
        window.location.href = "/guvi22/index.html";
      } else if (data.trim() === "This email already exists") {
        $("#dis-error").text("email already exist");
      } else if (data.trim() === "some field empty") {
        $("#dis-error").text("Enter All data / remove space");
      }
    },
    error: function (data) {
      alert("some Error");
    },
  });
}

function validateInput(email, password, name, PNum) {
  var emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  var phRegex = /^\d{10}$/;

  var passCrt = false,
    emailCrt = false,
    nameCrt = false,
    pNumCrt = false;

  if (name.length > 0 && name.length < 16) {
    nameCrt = true;
  } else {
    nameCrt = false;
    $("#dis-error").text("Name length less than 16");
  }

  if (emailRegex.test(email)) {
    emailCrt = true;
  } else {
    emailCrt = false;
    $("#dis-error").text("please enter valid email");
  }

  if (passwordRegex.test(password)) {
    passCrt = true;
  } else {
    passCrt = false;
    $("#dis-error").text(
      "password must contain 1 number 1 special character length 6 to 16"
    );
  }

  if (phRegex.test(PNum)) {
    pNumCrt = true;
  } else {
    pNumCrt = false;
    $("#dis-error").text("Enter Valid Ph number");
  }

  return emailCrt && passCrt && nameCrt && pNumCrt;
}

function createUserInJsonDb(email, password, name, PNum) {}
