  // function q1() {
  //
  //           let login = $('#username').val();
  //           if (login == '') {
  //               alert('입력하세요');
  //           } else {
  //               alert(login);
  //           }
  //       }
  //        function q2() {
  //
  //           let email = $('#memberEmail').val();
  //           if (email.includes('@')) {
  //               let Connection = email.split('@')[1].split('.')[0];
  //               alert(Connection)
  //           } else {
  //               alert('이메일이 아닙니다.')
  //           }
  //       }


function userJoin()  {
	let memberId = 	$('#memberId').val()
		memberId = memberId.replace(/ /g,"")
		let memberPw = $('#memberPw').val()
			memberPw = memberPw.replace(/ /g,"")
		let memberPw2 = $('#memberPw2').val()
			memberPw2 = memberPw2.replace(/ /g,"")
		let memberEmail= $('#memberEmail').val()
			memberEmail = memberEmail.replace(/ /g,"")
		let memberName = $('#memberName').val()
			memberName = memberName.replace(/ /g,"")


	// 아이디 중복검사
		$.ajax({
			url: "/register",
			type: "POST",
			data: {
				userName_give: memberName,
				userId_give: memberId,
				password_give: memberPw,
				repassword_give: memberPw2,
				email_give:memberEmail
			},
    success: function (response) {
      alert(response["result"]);
      if (response["result"] === "가입 성공! 로그인 해주세요!") {
        window.location.href = "/";
      }
	}
			});
}
const email = document.querySelector("#memberEmail");
const update = document.querySelector(".update");
console.log(email)
  console.log(update)
email.addEventListener("input", inputEmail);

function inputEmail(e) {
	console.log(e)
  const input = e.target.value;
  if (input && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input)) {
    update.textContent = "Valid Email";
    update.classList.add("success");
    update.classList.remove("failure");
  } else {
    update.textContent = "keep going...";
    update.classList.remove("success");
    update.classList.add("failure");
  }
}


