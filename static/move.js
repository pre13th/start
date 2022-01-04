function login() {
  window.location.href = "/";
}

function home() {
  //   token = localStorage.getItem("access_token");
  //   console.log(token);
  //   $.ajax({
  //     type: "GET",
  //     url: "/main",
  //     headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  //     success: function (response) {
  //       alert(response["result"]);
  //     },
  //   });
  window.location.href = "/main";
}

function star() {
  window.location.href = "/star";
}
function about() {
  window.location.href = "/about";
}

function register() {
  window.location.href = "/create";
}
