function getlogin() {
  let id = $("#id-input").val();
  let pw = $("#pw-input").val();

  $.ajax({
    type: "POST",
    url: "/login",
    data: { id_give: id, pw_give: pw },
    success: function (response) {
      token = response["access_token"];
      localStorage.setItem("access_token", token);
      alert(response["result"]);
      if (response["result"] === "success") {
        window.location.href = "/main";
      }
    },
  });
}

function logout() {
  $.ajax({
    type: "GET",
    url: "/logout",
    success: function (response) {
      alert(response["result"]);
      window.location.href = "/";
      localStorage.removeItem("access_token");
    },
  });
}
