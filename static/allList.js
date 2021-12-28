$(document).ready(function () {
    getmarket();
});

function getmarket(item='all') {
    $('#gift-cards').empty()
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

                let temp_html = `<div class="card long" style="width: 18rem;">
           
            <img class="card-img-top cardsize"
                 src="${image}"
                 alt="Card image cap">
            <div class="card-body">
            <a href="${url}" class="btn btn-primary">${title}</a>
                <p class="card-text">${desc}</p>
                <span class="card-text price">${price}</span>
                 <span class="card-text price">${delivery_fee} </span>
                     <p class="card-text review2">(리뷰: ${review}) (좋아요: ${like})</p>
                      <a href="#" onclick="postlike('${id}','${category}')" 
                       <div style="font-size: 30px; color:deeppink">
                       <i class="far fa-kiss-wink-heart"></i>
                       좋아요 </a>
                              
                       <a href="#" onclick="postdelete('${id}','${category}')"
                          <div style="font-size: 30px; color:dodgerblue">
                           <i class="far fa-sad-tear"></i>
                           삭제 </a>                          
                        
                      
                      

                     
                      </div>
            </div></div>
            `
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

