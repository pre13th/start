# 크리스마스 쇼핑몰 REST API

## 1. 상품 목록 가져오기

- 상품목록을 가져옵니다. 응답 body는 documents로 구성된 json 객체입니다.

## ▶ Request

#### URL

```
GET  /product  HTTP 1.1
data :{item_give: ... }
```

#### Parameter


| Name      | Type    | Description                        | Required |
| :---------- | :-------- |:-----------------------------------| :--------: |
| item_give | String  | 조회를 원하는 상품 이름                      |    O    |
| sort_give | Integer | 결과 문서 정렬 방식 ( 오름차순: 1 / 내림차순: -1 ) |    X    |

> 모든 상품 조회 : item_give에 "all"을 담아 주세요. /
> 상품이름 : "garland", "musicbox", "light", "doll", "candle"

## ▶ Response

### documents


| Name         | Type    | Description                               |
| :------------- | :-------- | :------------------------------------------ |
| id           | Integer | 상품 아이디                               |
| category     | String  | 상품 종류                                 |
| title        | String  | 상품 제목                                 |
| desc         | String  | 상품 설명                                 |
| price        | String  | 상품 가격                                 |
| delivery_fee | String  | 배달 요금(요금이 없으면 "별도표시"로 반환 |
| review       | String  | 리뷰 개수                                 |
| like         | Integer | 좋아요 개수                               |
| image        | String  | 이미지 Url                                |
| url          | String  | 상품 판매 웹 Url                          |

### result

"success" 메세지를 반환합니다.

---

## 2. (좋아요+1) 추가하기

- 특정 상품의 like를 추가합니다. 파라미터로 상품의 id와 item을 넘겨주세요.

## ▶ Request

#### URL

```
POST  /product/like  HTTP 1.1
data :{id_give: "..." , item_give:"..."}
```

#### Parameter


| Name      | Type    | Description        | Required |
| :---------- | :-------- | :------------------- | :--------: |
| id_give   | Integer | 선택된 상품 아이디 |    O    |
| item_give | String  | 선택된 상품 종류   |    O    |

## ▶ Response

### result

"success" 메세지를 반환합니다.

---

## 3. 상품 삭제하기

- 특정 상품을 삭제합니다. 파라미터로 상품의 id와 item을 넘겨주세요.

## ▶ Request

#### URL

```
DELETE  /product  HTTP 1.1
data :{id_give: "..." , item_give:"..."}
```

#### Parameter


| Name      | Type    | Description        | Required |
| :---------- | :-------- | :------------------- | :--------: |
| id_give   | Integer | 선택된 상품 아이디 |    O    |
| item_give | String  | 선택된 상품 종류   |    O    |

## ▶ Response

### result

"success" 메세지를 반환합니다.

---

## 3. 배너 랜덤 이미지 가져오기

- 랜덤 이미지 가져오기

## ▶ Request

#### URL

```
GET  /product/banner  HTTP 1.1
```

#### Parameter


| Name | Type | Description | Required |
| :----- | :----- | :------------ | :--------: |
| X    | X    | X           |    X    |

## ▶ Response

### documents


| Name         | Type    | Description                               |
| :------------- | :-------- | :------------------------------------------ |
| id           | Integer | 상품 아이디                               |
| category     | String  | 상품 종류                                 |
| title        | String  | 상품 제목                                 |
| desc         | String  | 상품 설명                                 |
| price        | String  | 상품 가격                                 |
| delivery_fee | String  | 배달 요금(요금이 없으면 "별도표시"로 반환 |
| review       | String  | 리뷰 개수                                 |
| like         | Integer | 좋아요 개수                               |
| image        | String  | 이미지 Url                                |
| url          | String  | 상품 판매 웹 Url                          |

### result

"success" 메세지를 반환합니다.