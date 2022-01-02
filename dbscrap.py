from start import settings

SECRET_KEY = getattr(settings, 'SECRET_KEY', 'localhost')

from pymongo import MongoClient
client = MongoClient(SECRET_KEY, 27017)
db = client.dbproducts

import requests
from bs4 import BeautifulSoup

# 네이버쇼핑 모바일웹 오르골 스크래핑
def item_scrap():
    indexId = 1;
    for i in range(1, 5):
        url = f'https://msearch.shopping.naver.com/search/all?catId=50001069&frm=NVSHCAT&origQuery=%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4&pagingIndex={i}&pagingSize=40&productSet=total&query=%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4&sort=rel&viewType=lst'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        data = requests.get(url, headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')
        all_list = soup.select(
            "#__next > div > div.products_list__3sRwl.products_list_extend__UO1HK > ul>li.product_list_item__2tuKA")

        for li in all_list:
            title_tag = li.select_one('div.product_info_main__1RU2S > div > a')
            img_tag = li.select_one('div.product_info_main__1RU2S > a > img')
            url_tag = li.select_one('.product_info_main__1RU2S > a')
            price_tag = li.select_one('.product_info_main__1RU2S > div > div.product_price__JznNt > strong')
            delivery_tag = li.select_one('.product_info_main__1RU2S > div > div.product_info_shipping__3s2Q4')
            review_tags = li.select('.product_info_main__1RU2S > div > div.product_info_count__1C19W > span')
            review_filter = list(filter(lambda x: str(x).find('리뷰') > 0, review_tags))

            if url_tag is None:
                url_tag = li.select_one('a')

            if title_tag is None:
                title_tag = li.select_one('a.product_info_main__1RU2S.linkAnchor > div > span')
            if img_tag is None:
                img_tag = li.select_one('a.product_info_main__1RU2S.linkAnchor > span > img')


            url = url_tag['href']
            title = title_tag.text
            price = price_tag.text

            if img_tag['src'].find('&type=w&size=200') > 0 :
                image = img_tag['src'].replace('&type=w&size=200','')
            else:
                image = img_tag['src'].replace('?type=f200', '')

            try:
                review = review_filter[0].select_one('em').text
            except:
                review = '0'

            try:
                delivery_fee = delivery_tag.text[3:8]
            except:
                delivery_fee = "별도 표시"

            desc = get_ogdata(url)
            doc ={
                'id': indexId,
                'category' : 'doll',
                'title' : title,
                'price':price,
                'desc':desc,
                'delivery_fee': delivery_fee,
                'like': 0,
                'review': review,
                'image': image,
                'url': url,
            }

            db.doll.insert_one(doc)
            print(indexId)
            indexId += 1



# og:image, og:description 데이터 추출
def get_ogdata(url_receive):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    try:
        desc = soup.select_one('meta[property="og:description"]')['content']
    except:
        desc = 'temporary text'

    return desc


item_scrap()


