# 크리스마스 쇼핑몰 REST API

## 상품목록 가져오기
- 상품목록을 가져옵니다. 추가적인 파라미터는 없습니다.<br>
응답 바디는 documents로 구성된 json 객체입니다.
## ▶ Request

#### URL

```
GET  /api/product  HTTP 1.0
```

#### Parameter

| Name | Type | Description | Required |
| :----: | :----: | :-----------: | :--------: |
|  X  |  X  |      X      |    X    |

## ▶ Response
### documents

|     Name     |  Type  | Description              |
|:------------|:------|:-------------------------|
|    title     | String | 상품 제목                    |
|     desc     | String | 상품 설명                    |
|    price     | String | 상품 가격                    |
| delivery_fee | String | 배달 요금(요금이 없으면 "별도표시"로 반환 |
|    review    | String | 리뷰 개수                    |
|     like     | Integer | 좋아요 개수                   |
|    image     | String | 이미지 Url                  |
|     url      | String | 상품 판매 웹 Url              |
