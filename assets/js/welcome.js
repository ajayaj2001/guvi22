function checkLogin() {
  $.ajax({
    type: "GET",
    url: "../assets/php/welcome.php",
    success: function (data) {
      if (data.includes("redirect")) {
        alert("Please Login To view this page");
        window.location.href = "/guvi22/index.html";
      } else {
        $("#heading").text("Welcome " + data);
      }
    },
    error: function (data) {
      alert("some Error");
    },
  });
}

checkLogin();

$(document).ready(function () {
  $("#signout-check").click(function (event) {
    /* stop form from submitting normally */
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "../assets/php/logout.php",
      success: function (data) {
        if (data == "success") {
          window.location.href = "/guvi22/index.html";
        } else {
          $("#heading").text("Welcome " + data);
        }
      },
      error: function (data) {
        alert("some Error");
      },
    });
  });
});
