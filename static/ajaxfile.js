$(document).ready(function () {
    $('#gift-cards').empty()
    getmarket();
    getbanner();
});


function getmarket(item='all') {
    $.ajax({
        type: 'GET',
        url: '/product',
        data: {item_give: item},
        success: function (response) {
            let mygift = response['documents']
            for (let i = 0; i < 12; i++) {
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

                let temp_html = `<div class="card bg-white rounded-md w-full md:w-72 mx-auto my-2">
           <a href="${url}">
            <img class="card-img-top w-full h-72 rounded-b-md"
                 src="${image}"
                 alt=""></a>
            <div class="card-body p-4">
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
                $('#gift-cards').append(temp_html)

            }

        }
    });
}

function getbanner() {
    $.ajax({
        type: 'get',
        url: '/product/banner',
        data: {},
        success: function (response) {
            let mybanner = response['documents']
            for (let i = 0; i < mybanner.length; i++) {
                let image = mybanner[i]['image']
                let url = mybanner[i]['url']

                let temp_html = `<div class="flex-auto m-3">
         
            <a href="${url}"><img class="spin w-full h-64 rounded-b-md"
                 src="${image}" alt=""></a>
            <div class="card-body">
            
            </div>

            </div>`
                $('#banners').append(temp_html)
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
            window.location.reload()
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

