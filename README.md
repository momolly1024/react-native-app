# 全台灣健行步道 app

## 使用技術/套件

-   react native
-   react navigation

## 功能

-   步道清單
-   過濾/搜尋功能
-   步道詳情
-   收藏
-   取消收藏
    more
-   指定置頂地區?
-   已完成 and 收藏

## 資料來源

-   https://data.gov.tw/dataset/31169

-   台北市 臺北市健走步道https://data.taipei/dataset/detail?id=fde2a190-8299-4f70-9a1f-6c223109b512

(https://data.taipei/api/v1/dataset/1c6a4f3b-d8e9-4ee0-aed6-1ad9e2387ff5?scope=resourceAquire)

景點

-   全台景點
    https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json

-   新北市觀光旅遊景點(中文-106 年更新) https://data.ntpc.gov.tw/datasets/B3A30A19-4B89-4DA2-8D99-18200DC5DFDE
    https://data.ntpc.gov.tw/api/datasets/B3A30A19-4B89-4DA2-8D99-18200DC5DFDE/json/preview

    https://data.ntpc.gov.tw/api/datasets/B3A30A19-4B89-4DA2-8D99-18200DC5DFDE/json?page=0&size=600

-   台北市 旅遊資訊 API https://www.travel.taipei/open-api/swagger/ui/index#/Attractions/Attractions_All
    https://www.travel.taipei/open-api/zh-tw/Attractions/All

```
curl -X 'GET' \
  'https://www.travel.taipei/open-api/zh-tw/Attractions/All' \
  -H 'accept: application/json'
```
