$(document).ready(function () {
        gift_order();
});



function home() {

    window.location.href = '/';
};

function star() {


    window.location.href = '/star';

};
function about() {


    window.location.href = '/about';
}
function gift_order() {
                $.ajax({
                    type: 'GET',
                    url: '/order',
                    data: {},
                    success: function (response) {
                        let mygift = response['gift_order']
                        for (let i = 0; i <mygift.length; i++){
                               let image = mygift[i]['image']
                               let desc = mygift[i]['desc']
                               let title = mygift[i]['title']
                               let price = mygift[i]['price']
                               let delivery_fee = mygift[i]['delivery_fee']
                               let like = mygift[i]['like']
                               let review = mygift[i]['review']
                               let url = mygift[i]['url']

                               let temp_html = `<div class="card long" style="width: 18rem;">
           
            <img class="card-img-top"
                 src="${image}"
                 alt="Card image cap">
            <div class="card-body">
            <a href="${url}" class="btn btn-primary">${title} (: ${like}</a>
                <p class="card-text">${desc}</p>
              
                <span class="card-text price">${price}</span>
                 <span class="card-text price">${delivery_fee} </span>
                     <p class="card-text review2">(리뷰: ${review})</p>             
            </div></div>
            `
                            $('#gift-cards').append(temp_html)

                        }

                    }
                });
}
