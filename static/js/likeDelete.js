

function postLike(id, category) {
  $.ajax({
    type: "POST",
    url: "/product/like",
    data: { id_give: id, item_give: category },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    success: function (response) {
      alert(response["result"]);
      window.location.reload();
    },
    error: function (request, status, error) {
      console.log(error);
      if (error === "UNAUTHORIZED") {
        alert("토큰 유효시간이 끝났습니다. 다시 로그인해주세요.");
        window.location.href = "/";
        localStorage.removeItem("access_token");
      } else if (error === "UNPROCESSABLE ENTITY") {
        alert("토큰이 없습니다. 회원가입과 로그인해주세요.");
        window.location.href = "/";
      }
    },
  });
}

function postDelete(id, category) {
  $.ajax({
    type: "DELETE",
    url: "/product",
    data: { id_give: id, item_give: category },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    success: function (response) {
      alert(response["result"]);
      window.location.reload();
    },
    error: function (request, status, error) {
      console.log(error);
      if (error === "UNAUTHORIZED") {
        alert("토큰 유효시간이 끝났습니다. 다시 로그인해주세요.");
        window.location.href = "/";
        localStorage.removeItem("access_token");
      } else if (error === "UNPROCESSABLE ENTITY") {
        alert("토큰이 없습니다. 회원가입과 로그인해주세요.");
        window.location.href = "/";
      }
    },
  });
}
