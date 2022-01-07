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
- 로그인 권한이 필요합니다. JWT 토큰을 headers에 실어서 요청해주세요.

## ▶ Request

#### URL

```
POST  /product/like  HTTP 1.1
data :{id_give: "..." , item_give:"..."}
headers: {
      Authorization: `Bearer {ACCESS_TOKEN}`,
    },
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
- 로그인 권한이 필요합니다. JWT 토큰을 headers에 실어서 요청해주세요.
## ▶ Request

#### URL

```
DELETE  /product  HTTP 1.1
data :{id_give: "..." , item_give:"..."}
headers: {
      Authorization: `Bearer {ACCESS_TOKEN}`,
    },
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

## 4. 배너 랜덤 이미지 가져오기

- 랜덤 이미지 가져오기

## ▶ Request

#### URL

```
GET  /product/banner  HTTP 1.1
url: "/product/banner?size_give=12",
```

#### Parameter


| Name | Type | Description | Required |
| :----- | :----- | :------------ | :--------: |
| size_give   | String    | 배너 개수           |    O    |

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


___

## 5. 로그인 api
- 로그인을 하기 위해서 사용자의 id와 pw을 넘겨주세요.
## ▶ Request

#### URL

```
POST  /login  HTTP 1.1
data :{id_give: "..." , pw_give:"..."}
```

#### Parameter


| Name | Type | Description | Required |
| :----- | :----- | :------------ | :--------: |
| id_give   | String    | id문자열           |    O    |
| pw_give   | String    | pw문자열           |    O    |
## ▶ Response
### result

- 로그인 성공 시 : "success" 메세지를 반환합니다.
- ID가 DB에 없을 때 : "저희 사이트 회원이 아닙니다." 메세지를 반환합니다.
- PW가 불일치 : "비밀번호가 일치하지 않습니다." 메세지를 반환합니다.

### access_token


| Name         | Type    | Description                               |
| :------------- | :-------- | :------------------------------------------ |
| access_token           | String | JWT토큰 발행                            |

___

## 6. 로그아웃 api
- 로그인을 하기 위해서 사용자의 id와 pw을 넘겨주세요.
## ▶ Request

#### URL

```
GET  /logout  HTTP 1.1
```

#### Parameter


| Name | Type | Description | Required |
| :----- | :----- | :------------ | :--------: |
| X   | X    | X           |   X    |
## ▶ Response
### result

- 로그아웃 성공 시 : "로그아웃 되었습니다." 메세지를 반환합니다.

___

## 7. 회원가입 api
- 회원가입을 위해서 사용자의 이름, id와 pw1, pw2, email을 넘겨주세요.
## ▶ Request

#### URL

```
[GET or POST]  /register  HTTP 1.1
data :{id_give: "..." , pw_give:"..."}
```

#### Parameter [GET]
- 필요없음

#### Parameter [POST]

| Name | Type | Description | Required |
| :----- | :----- | :------------ | :--------: |
| userName_give   | String    | 이름          |    O    |
| userId_give   | String    | ID           |    O    |
| password_give   | String    | PW문자열           |    O    |
| repassword_give   | String    | PW문자열           |    O    |
| email_give   | String    | 이메일           |    O    |

## ▶ Response

### render_template [GET]
- 회원가입 페이지인 create.html 파일을 렌더링합니다.

### result [POST]

- 이미 사용중인 ID가 DB에 있으면 : "사용중인 아이디입니다." 메세지를 반환합니다.
- 공란인 데이터가 있다면 : "빈칸을 채워주세요." 메세지를 반환합니다.
- pw1과 pw2 불일치 : "비밀번호가 다릅니다." 메세지를 반환합니다.
- 회원가입 성공 시 : "result' : '가입 성공! 로그인 해주세요!" 메세지를 반환합니다.

