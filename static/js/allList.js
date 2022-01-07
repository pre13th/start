$(document).ready(function () {
  getAllList('garland');
});

// 이제 각자 주특기를 배우러 가실건데 그전에 알아두셔야 하는 것!
// 카멜케이스입니다! 협업을 위해서도, 향후 다른사람이 만든 api를 사용할때도 필수인 카멜케이스!
// 우리는 소문자 카멜케이스랑 스네이크 케이스를 사용해볼게여(한사람이 하는게 편하니까 제가 한번에 해서 올리겠습니다 ㅋㅋ)
// 자세한 것은 검색해보시면 좋습니다!

//star.html에 들어가는 list 다뽑아오는 함수 + like순으로 정렬하는 함수

function getAllList(item = "all") {

  $("#gift-cards").empty();
  $("#cate").empty();

  temp = `<h1 class="text-2xl md:text-2xl font-medium py-1 m-2 mb-4 my-4 pl-5 bg-blue-400 rounded-md text-white uppercase">${item} item list
    <span class="text-blue-200 cursor-pointer text-xl" onclick="getLike('${item}');"><h2><span class="text-blue-600">좋아요</span> 순으로 정렬하기 >></span></h2></h1>`;
  $("#cate").append(temp);

  $.ajax({
    type: "GET",
    url: "/product",
    data: { item_give: item },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    success: function (response) {
      let myGift = response["documents"];
      for (let i = 0; i < myGift.length; i++) {
        let image = myGift[i]["image"];
        let desc = myGift[i]["desc"];
        let title = myGift[i]["title"];
        let price = myGift[i]["price"];
        let delivery_fee = myGift[i]["delivery_fee"];
        let like = myGift[i]["like"];
        let review = myGift[i]["review"];
        let url = myGift[i]["url"];
        let id = myGift[i]["id"];
        let category = myGift[i]["category"];

        let temp_html = ``;

        if (like < 2) {
          temp_html = `
                <div class="card bg-white rounded-md w-full md:w-72 mx-auto my-2">
                <div class="hidden bg-blue-300 text-xl text-white font-bold px-1 py-2 rounded-sm"></div>
           <a href="${url}">
            <img class="w-full h-72 rounded-b-md"
                 src="${image}"
                 alt=""></a>
            <div class="p-4">
            <a href="${url}"> <p class="truncate">${title}</p></a>
                <p class="text-blue-400 truncate">${desc}</p>
                <span class="card-text price">${price} 원</span>
                 <span class="card-text price">/ 배송비 ${delivery_fee}</span>
                 <div class="flex flex-row justify-between">
                     <p class="card-text review2">리뷰: ${review} ❤: ${like}</p>
                     <button class="text-white bg-blue-300 px-1 text-md rounded-lg" onclick="openModal('main-modal')">댓글보기</button>
                     </div>
<div class="flex flex-row justify-evenly mt-2">
                      <button onclick="postLike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postDelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `;
        } else {
          temp_html = `
                <div class="relative card bg-white rounded-md w-full md:w-72 mx-auto my-2">
                <div class="absolute top-0 right-0 bg-blue-400 text-xl text-white font-bold px-1 py-2 rounded-sm">best</div>
           <a href="${url}">
            <img class="w-full h-72 rounded-b-md"
                 src="${image}"
                 alt=""></a>
            <div class="p-4">
            <a href="${url}"> <p class="truncate">${title}</p></a>
                <p class="text-blue-400 truncate">${desc}</p>
                <span class="card-text price">${price} 원</span>
                 <span class="card-text price">/ 배송비 ${delivery_fee}</span>
                 <div class="flex flex-row justify-between">
                     <p class="card-text review2">리뷰: ${review} ❤: ${like}</p>
                     <button class="text-white bg-blue-300 px-1 text-md rounded-lg" onclick="openModal('main-modal')">댓글보기</button>
                     </div>
<div class="flex flex-row justify-evenly mt-2">
                      <button onclick="postLike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postDelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `;
        }

        $("#gift-cards").append(temp_html);
      }
    },
  });
}

//라이크 별로 정렬해주는 함수

function getLike(item = "all") {
  $("#gift-cards").empty();
  $.ajax({
    type: "GET",
    url: "/product",
    data: { item_give: item, sort_give: -1 },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    success: function (response) {
      let myGift = response["documents"];
      for (let i = 0; i < myGift.length; i++) {
        let image = myGift[i]["image"];
        let desc = myGift[i]["desc"];
        let title = myGift[i]["title"];
        let price = myGift[i]["price"];
        let delivery_fee = myGift[i]["delivery_fee"];
        let like = myGift[i]["like"];
        let review = myGift[i]["review"];
        let url = myGift[i]["url"];
        let id = myGift[i]["id"];
        let category = myGift[i]["category"];

        let temp_html = ``;

// like가 2 이상일 때는 카드 우측 상단에 best

        if (like < 2) {
          temp_html = `
                <div class="card bg-white rounded-md w-full md:w-72 mx-auto my-2">
                <div class="hidden bg-blue-300 text-xl text-white font-bold px-1 py-2 rounded-sm"></div>
           <a href="${url}">
            <img class="w-full h-72 rounded-b-md"
                 src="${image}"
                 alt=""></a>
            <div class="p-4">
            <a href="${url}"> <p class="truncate">${title}</p></a>
                <p class="text-blue-400 truncate">${desc}</p>
                <span class="card-text price">${price} 원</span>
                 <span class="card-text price">/ 배송비 ${delivery_fee}</span>
                 <div class="flex flex-row justify-between">
                     <p class="card-text review2">리뷰: ${review} ❤: ${like}</p>
                     <button class="text-white bg-blue-300 px-1 text-md rounded-lg" onclick="openModal('main-modal')">댓글보기</button>
                     </div>
<div class="flex flex-row justify-evenly mt-2">
                      <button onclick="postLike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postDelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `;
        } else {
          temp_html = `
                <div class="relative card bg-white rounded-md w-full md:w-72 mx-auto my-2">
                <div class="absolute top-0 right-0 bg-blue-400 text-xl text-white font-bold px-1 py-2 rounded-sm">best</div>
           <a href="${url}">
            <img class="w-full h-72 rounded-b-md"
                 src="${image}"
                 alt=""></a>
            <div class="p-4">
            <a href="${url}"> <p class="truncate">${title}</p></a>
                <p class="text-blue-400 truncate">${desc}</p>
                <span class="card-text price">${price} 원</span>
                 <span class="card-text price">/ 배송비 ${delivery_fee}</span>
                 <div class="flex flex-row justify-between">
                     <p class="card-text review2">리뷰: ${review} ❤: ${like}</p>
                     <button class="text-white bg-blue-300 px-1 text-md rounded-lg" onclick="openModal('main-modal')">댓글보기</button>
                     </div>
<div class="flex flex-row justify-evenly mt-2">
                      <button onclick="postLike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postDelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `;
        }

        $("#gift-cards").append(temp_html);
      }
    },
  });
}
