$(document).ready(function () {
    getmarket();
});

function getmarket(item='all') {
    $('#gift-cards').empty();
    $('#cate').empty();

    temp = `<h1 class="text-2xl md:text-2xl font-medium py-1 m-2 mb-4 my-4 pl-5 bg-blue-400 rounded-md text-white uppercase">${item} item list
    <span class="text-blue-200 cursor-pointer text-xl" onclick="getLike('${item}');"><h2><span class="text-blue-600">좋아요</span> 순으로 정렬하기 >></span></h2></h1>`;
    $('#cate').append(temp);

    $.ajax({
        type: 'GET',
        url: '/product',
        data: {item_give: item},
        success: function (response) {
            let mygift = response['documents']
            for (let i = 0; i < mygift.length; i++) {
                let image = mygift[i]['image']
                let desc = mygift[i]['desc']
                let title = mygift[i]['title']
                let price = mygift[i]['price']
                let delivery_fee = mygift[i]['delivery_fee']
                let like = mygift[i]['like']
                let review = mygift[i]['review']
                let url = mygift[i]['url']
                let id = mygift[i]['id']
                let category = mygift[i]['category']

                let temp_html = ``

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
                      <button onclick="postlike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postdelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `
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
                      <button onclick="postlike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postdelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `
                        }

                $('#gift-cards').append(temp_html)

            }

        }
    });
}

function postlike(id, category) {
    $.ajax({
        type: 'POST',
        url: '/product/like',
        data: {id_give: id, item_give: category},
        success: function (response) {
            alert(response['result']);
            // window.location.reload()
        }
    });
}

function postdelete(id, category) {
    $.ajax({
        type: 'DELETE',
        url: '/product',
        data: {id_give: id, item_give: category},
        success: function (response) {
            alert(response['result']);
            window.location.reload()
        }
    });
}

function getLike(item='all') {
    $('#gift-cards').empty()
    $.ajax({
        type: 'GET',
        url: '/product',
        data: {item_give: item, sort_give:-1},
        success: function (response) {
            let mygift = response['documents']
            for (let i = 0; i < mygift.length; i++) {
                let image = mygift[i]['image']
                let desc = mygift[i]['desc']
                let title = mygift[i]['title']
                let price = mygift[i]['price']
                let delivery_fee = mygift[i]['delivery_fee']
                let like = mygift[i]['like']
                let review = mygift[i]['review']
                let url = mygift[i]['url']
                let id = mygift[i]['id']
                let category = mygift[i]['category']

                let temp_html = ``

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
                      <button onclick="postlike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postdelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `
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
                      <button onclick="postlike('${id}','${category}')" class="animate-pulse jello">

                       <span style="color:deeppink" class="text-xl"><i class="far fa-kiss-wink-heart"></i>
                       좋아요</span></button>
                              
                       <button onclick="postdelete('${id}','${category}')" class="hover:animate-ping">

                           <span style="color:dodgerblue" class="text-xl"><i class="far fa-sad-tear"></i>
                           삭제</span></button>                          
</div>
                      </div>
            </div></div>
            `
                        }

                $('#gift-cards').append(temp_html)

            }

        }
    });
}