$(document).ready(function () {
  firstBanner();
  mainBanner();
  bannerCards();
});

// main.html의 배너만 모아놓은 곳! 함수는 페이지에 뜨는 순서대로 정렬했습니다.


// 첫번째 배너 : 각 카테고리에서 1개씩만 뽑아주는 상단배너
function firstBanner() {
  $.ajax({
    type: "get",
    url: "/product/banner?size_give=12",
    data: {},
    success: function (response) {
      let banana = response["documents"];
      for (let i = 5; i < 10; i++) {
        console.log(banana);
        let g_image = banana[i]["image"];
        let g_url = banana[i]["url"];
        let g_category = banana[i]["category"];
        let g_price = banana[i]["price"];
        let g_title = banana[i]["title"];

        let temp_bana01 = `
                <div class="flex flex-col items-center justify-center max-w-sm mx-auto w-full md:w-1/2 mb-3 rota1">
                <a href="${g_url}"><div class="w-full h-full md:w-80 md:h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
                <img class="w-full h-full bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                 src="${g_image}" alt=""></div> </a>
                 
                 <div class="rota2">
                 <div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800 ">
            <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">${g_category}</h3>
            <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <span class="font-bold text-gray-800 dark:text-gray-200 truncate mr-2">${g_title}</span>
                <a href="${g_url}"> <button class="block w-16 px-1 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">${g_price}원</button> </a>
                </div>
                </div>
            </div>
        </div>`;

        $("#banana").append(temp_bana01);
      }
    },
  });
}

// 12개가 플렉스로 띄워지며 각기다른 크기의 이미지파일들을 최대한 보정하는 메인배너

function mainBanner() {
  $.ajax({
    type: "get",
    url: "/product/banner?size_give=12",
    data: {},
    success: function (response) {
      let myBanner = response["documents"];
      for (let i = 0; i < myBanner.length; i++) {
        let image = myBanner[i]["image"];
        let url = myBanner[i]["url"];

        let temp_html = `<div class="flex-auto m-3">
         
            <a href="${url}"><img class="spin w-full h-full md:h-64 rounded-md"
                 src="${image}" alt=""></a>
            <div class="card-body">
            
            </div>

            </div>`;
        $("#banners").append(temp_html);
      }
    },
  });
}

// 카
function bannerCards() {
  $.ajax({
    type: "get",
    url: "/product/banner?size_give=6",
    data: {},
    success: function (response) {
      let myGift = response["documents"];
      for (let i = 0; i < 6; i++) {
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

