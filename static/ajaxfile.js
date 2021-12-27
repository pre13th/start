$(document).ready(function () {
    getgarland();
});

function getgarland() {
    $.ajax({
        type: 'GET',
        url: '/product/garland',
        data: {},
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

                let temp_html = `<div class="card long" style="width: 18rem;">
           
            <img class="card-img-top"
                 src="${image}"
                 alt="Card image cap">
            <div class="card-body">
            <a href="${url}" class="btn btn-primary">${title}</a>
                <p class="card-text">${desc}</p>
                <span class="card-text price">${price}</span>
                 <span class="card-text price">${delivery_fee} </span>
                     <p class="card-text review2">(리뷰: ${review}) (좋아요: ${like})</p>
                      <a href="#" onclick="postlike('${id}')" 
                       <div style="font-size: 30px; color:deeppink">
                      <i class="far fa-kiss-wink-heart"></i>
                      좋아요
                          <div style="font-size: 30px; color:dodgerblue">
                           <i class="far fa-sad-tear"></i>
                           삭제                               
                      
                      

                     
                      </div>
            </div></div>
            `
                $('#gift-cards').append(temp_html)

            }

        }
    });
}

function postlike(id) {
    $.ajax({
        type: 'POST',
        url: '/product/like',
        data: {id_give: id},
        success: function (response) {
            alert(response['result']);
            window.location.reload()
        }
    });
}


