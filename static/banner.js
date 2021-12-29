$(document).ready(function () {
    ex_banner();
});

function ex_banner() {
    $('#bana01').empty()
    $('#bana02').empty()
    $.ajax({
        type: 'get',
        url: '/product/banner',
        data: {},
        success: function (response) {
            let banana = response['documents']
            
            console.log(banana)
                let g_image = banana[0]['image']
                let g_url = banana[0]['url']
                let g_category = banana[0]['category']
//                let g_price = banana[0]['price']
                let g_title = banana[0]['title']

                let m_image = banana[3]['image']
                let m_url = banana[3]['url']
                let m_category = banana[3]['category']
//                let m_price = banana[3]['price']
                let m_title = banana[3]['title']

                let temp_bana01 = `<div class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md rota" style="background-image: url(${g_image})"></div>`
                let temp_bana02 = `<div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
            <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">${g_category}</h3>
            <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <span class="font-bold text-gray-800 dark:text-gray-200 truncate mr-2">${g_title}</span>
                <a href="${g_url}"> <button class="block w-14 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">보러가기</button> </a>
            </div>
        </div>`
                let temp_banana01 = `<div class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style="background-image: url(${m_image})"></div>`
                let temp_banana02 = `<div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
            <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">${m_category}</h3>
            <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <span class="font-bold text-gray-800 dark:text-gray-200 truncate mr-2">${m_title}</span>
                <a href="${m_url}"> <button class="block w-14 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">보러가기</button> </a>
            </div>
        </div>`

                $('#bana01').append(temp_bana01)
                $('#bana02').append(temp_bana02)
                $('#banana01').append(temp_banana01)
                $('#banana02').append(temp_banana02)
            
        }
    });
}
