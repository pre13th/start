import settings
SECRET_KEY = getattr(settings, 'SECRET_KEY', 'localhost')

from pymongo import MongoClient
client = MongoClient(SECRET_KEY, 27017)
db = client.dbproducts

import requests
from bs4 import BeautifulSoup

# 네이버쇼핑 모바일웹 garland 스크래핑
def item_scrap():
    indexId = 1;
    for i in range(1, 6):
        url = f'https://msearch.shopping.naver.com/search/all?origQuery=%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4&pagingIndex={i}&pagingSize=40&productSet=total&query=%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4&sort=rel&themeFilter=1487&viewType=lst'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        data = requests.get(url, headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')
        all_list = soup.select(
            "#__next > div > div.products_list__3sRwl.products_list_extend__UO1HK > ul>li.product_list_item__2tuKA")

        for li in all_list:
            name_tag = li.select_one('div.product_info_main__1RU2S > div > a')
            url_tag = li.select_one('.product_info_main__1RU2S > a')
            price_tag = li.select_one('.product_info_main__1RU2S > div > div.product_price__JznNt > strong')
            delivery_tag = li.select_one('.product_info_main__1RU2S > div > div.product_info_shipping__3s2Q4')
            review_tags = li.select('.product_info_main__1RU2S > div > div.product_info_count__1C19W > span')
            review_filter = list(filter(lambda x: str(x).find('리뷰') > 0, review_tags))

            if url_tag is None:
                url_tag = li.select_one('a')
                name_tag = li.select_one('a.product_info_main__1RU2S.linkAnchor > div > span')

            url = url_tag['href']
            title = name_tag.text
            price = price_tag.text

            try:
                review = review_filter[0].select_one('em').text
            except:
                review = '0'

            try:
                delivery_fee = delivery_tag.text[3:8]
            except:
                delivery_fee = "별도 표시"

            doc = get_ogdata(url)
            doc['id'] = indexId
            doc['title'] = title
            doc['price'] = price
            doc['delivery_fee'] = delivery_fee
            doc['like'] = 0
            doc['review'] = review
            doc['url'] = url

            db.garland.insert_one(doc)
            indexId += 1


# og:image, og:description 데이터 추출
def get_ogdata(url_receive):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')
    try:
        # title = soup.select_one('meta[property="og:title"]')['content']
        image = soup.select_one('meta[property="og:image"]')['content']
        desc = soup.select_one('meta[property="og:description"]')['content']
    except:
        # title = 'Nothing'
        image = 'Nothing'
        desc = 'temporary text'

    doc = {
        # 'title': title,
        'image': image,
        'desc': desc,
    }
    return doc


item_scrap()
