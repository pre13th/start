$(document).ready(function () {
  ex_banner();
});

function ex_banner() {
  $.ajax({
    type: "get",
    url: "/product/banner?size_give=12",
    data: {},
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
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
