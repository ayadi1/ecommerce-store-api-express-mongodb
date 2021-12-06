<!-- .env :{ DB_HOST_NAME=mongodb://localhost:27017/stor-ecom-api
TOKEN_STRING_KEY=t6w9z$C&F)J@NcRfUjXn2r4u7x!A%D*G
TOKEN_LIFE_TIME=30d
SECRET_ADMINS_KEY=password
SECRET_SUPER_ADMINS_KEY=password} -->
<!-- register  -->

## **register User**

Returns json data about a register user.

- **URL**

  /api/v1/register

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  `email=String`
  `password=String`
  `name=String`
  if admin have to sand :{
  `isAdmin=[String:password-have all admin know it]`
  }
  if supper admin have to sand :{

  `isSuperAdmin=[String:password-have all supper admin know it]`
  }

- **Success Response:**

  - **Code:** 201 Created <br />
    **Content:** `{"success": true,"token": "token Secret"}`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{"success": false,"msg": "email already exist"}`

  OR

  - **Code:** 400 bad request <br />
    **Content:** `{"success": false,"msg": "please provide all required field"}`

- **Sample Call:**

  ```javascript
  ObjectData = {
    name: "ayadi",
    email: "super@gmail.com",
    isAdmin: "admin password",
    password: "password",
    isSuperAdmin: "supper admin password",
  };
  await axios.post(".. your server name .../api/v1/register", ObjectData);
  ```

  <!-- login -->

  **login User**

---

Returns json data about a login user.

- **URL**

  /api/v1/login

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  None

- **Data Params**

  `email=String`
  `password=String`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{"success": true,"token": "token Secret"}`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{"success": false,"msg": "email or password not work"}`

  OR

  - **Code:** 400 bad request <br />
    **Content:** `{ "success": false,"msg": "please provide all required field" }`

- **Sample Call:**

  ```javascript
  ObjectData = {
    email: "super@gmail.com",
    password: "password",
  };
  await axios.post(".. your server name .../api/v1/login", ObjectData);
  ```

  <!-- product route -->
  <!-- get all product -->

  **Show User**

---

Returns json data about a all product.

- **URL**

  /api/v1/product

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ "nProduct": 1, "products": [ { "_id": "61ab9ecd2714863f86b03d95", "name": "oppo reno 6", "createdBy": "61a7ed2c80de79df16f39d9d", "quantity": 8, "company": "oppo", "price": 1500, "imageList": [ "ySmDJAg-YUZWIha.jpeg" ], "createdAt": "2021-12-04T17:01:01.675Z", "updatedAt": "2021-12-05T12:29:22.504Z", "__v": 0 }, }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ success: false , error}`

  OR

- **Sample Call:**

  ```javascript
  await axios.get(".. your server name .../api/v1/product");
  ```

  <!-- get single product -->

  **Show User**

---

Returns json data about a single product.

- **URL**

  /api/v1/product/:productID

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ "_id": "61ab9ecd2714863f86b03d95", "name": "oppo reno 6", "createdBy": "61a7ed2c80de79df16f39d9d", "quantity": 8, "company": "oppo", "price": 1500, "imageList": [ "ySmDJAg-YUZWIha.jpeg" ], "createdAt": "2021-12-04T17:01:01.675Z", "updatedAt": "2021-12-05T12:29:22.504Z", "__v": 0 }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ success: false , msg: 'non product by id : ${productID}'}`

- **Sample Call:**

  ```javascript
  await axios.get(".. your server name .../api/v1/product/:productID");
  ```

  <!-- get  product by filter -->

  **Show User**

---

Returns json data about a product by filter.

- **URL**

  /api/v1/product/search

- **Method:**

  `GET`

- **URL Params**
- `name=String`
- `price=Number`
- `company=String`
- `createdAt=date`
- `sort=[String,String]`
- `fields=String`
- `limit=Number`
- `page=Number`

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ "nProduct": 1, "products": [ { "_id": "61ab9ecd2714863f86b03d95", "name": "oppo reno 6", "createdBy": "61a7ed2c80de79df16f39d9d", "quantity": 8, "company": "oppo", "price": 1500, "imageList": [ "ySmDJAg-YUZWIha.jpeg" ], "createdAt": "2021-12-04T17:01:01.675Z", "updatedAt": "2021-12-05T12:29:22.504Z", "__v": 0 }, }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ success: false, error}`

- **Sample Call:**

  ```javascript
  await axios.get(
    ".. your server name .../api/v1/product/search?sort=name,price"
  );
  ```

  <!-- add product -->

  **add new product**

---

Returns json data about new product you added.

- **URL**

  /api/v1/product

- **Method:**

  `POST`

- **header data**

  **Required:**
  `Authorization:"bearer token Secret"`

- **URL Params**

  **Required:**
  None

- **Data Params**
  **Required:**
  `name="String"`
  `company="String"`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ "success": true, "product": { "name": "oppo reno 6", "createdBy": "61a7ed2c80de79df16f39d9d", "quantity": 11, "company": "oppo", "price": 1500, "imageList": [ "MmRTMKJ-O34AaZ8.jpeg" ], "_id": "61ae8247282f705dd3e9c9ee", "createdAt": "2021-12-06T21:36:07.054Z", "updatedAt": "2021-12-06T21:36:07.054Z", "__v": 0 } }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ success: false, error }`

- **Sample Call:**

  ```javascript
  ObjectData = {
    company: "iphone",
    quantity: 1,
    name: "iphone 13",
    images: imageFile,
    price: 1000,
  };
  await axios.post(".. your server name .../api/v1/product", ObjectData);
  ```

  <!-- delete  product -->

  **delete product**

---

Returns json data about delete success.

- **URL**

  /api/v1/product/:productID

- **Method:**

  `DELETE`

- **header data**

  **Required:**
  `Authorization:"bearer token Secret"`

- **URL Params**

  **Required:**
  None

- **Data Params**
  **Required:**
  None

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ success: true, msg: "product was deleted" }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ success: false, msg: "can't delete product" }`
OR
- **Code:** 500 <br />
    **Content:** `{ success: false, error }`


- **Sample Call:**

  ```javascript
  await axios.delete(".. your server name .../api/v1/product/:productID");
  ```
 <!-- update  product -->

  **delete product**

---

Returns json data about delete success.

- **URL**

  /api/v1/product/:productID

- **Method:**

  `PATCH`

- **header data**

  **Required:**
  `Authorization:"bearer token Secret"`

- **URL Params**

  **Required:**
  None

- **Data Params**
  **Required:**
  None

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ success: true, msg: "product was deleted" }`

- **Error Response:**

  - **Code:** 400 bad request <br />
    **Content:** `{ success: false, msg: "can't delete product" }`
OR
- **Code:** 500 <br />
    **Content:** `{ success: false, error }`


- **Sample Call:**

  ```javascript
  await axios.delete(".. your server name .../api/v1/product/:productID");
  ```
