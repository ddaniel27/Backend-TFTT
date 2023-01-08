# TFTT

*Backend*

## Structure

Structure for this repo is based on microservices architecture, so this is the file system:

```
/
|
|- index.js
|- app.js
|- .env
|- /database
|  |
|  |- index.js
|  |- connection.js
|  |- /users
|  |  |
|  |  |- index.js
|  |
|  |- /admins
|  |  |
|  |  |- index.js
|
|- /components
|  |
|  |- index.js
|  |- /infouser
|  |  |
|  |  |- index.js
|  |
|  |- /login
|  |  |
|  |  |- index.js
|  |
|  |- /home
|  |  |
|  |  |- index.js
|
|- /utils
|  |
|  |- index.js
|  |
|  |- /middlewares
|  |  |
|  |  |- auth.js
|  |  |- validation.js
```

- `index.js` is the main file and has all the global configuration for the backend.

- `app.js` is the core of the backend, it exports a function to create a new app ussing dependency injection for testing purpouses.

- `.env` is the environment variables file.

- `database` folder has all the database file's related. It has a `connection.js` file which defines the connection to the DB. Every table has their own folder and all methods are exposed with the `index.js` file. 

- Inside every `components` folder there is all the related files with that specific component (endpoint).

- `utils` is a folder with shared methods that can be used by any component.

---

## Enviroment Variables

There is a list of all enviroment variables used in this project and their description



| NAME       | TYPE   | DESCRIPTION                                      |
|:----------:|:------:|:------------------------------------------------:|
| PORT       | INT    | Port where the server will be listening          |
| DB_HOST    | STRING | Database host direction                          |
| DB_USER    | STRING | Database user with premission for read and write |
| DB_PASS    | STRING | Database password for Database user              |
| DB_NAME    | STRING | Database table name                              |
| JWT_SECRET | STRING | Secrete to generate JWT                          |

---

## Database Structure

This is the structure for the database in this project:



### Admins

| NAME     | TYPE         | DESCRIPTION         |
|:--------:|:------------:|:-------------------:|
| email    | varchar(64)  | PRIMARY KEY.        |
| password | varchar(64)  | NOT NULL.           |



### Users

| NAME         | TYPE        | DESCRIPTION          |
|:------------:|:-----------:|:--------------------:|
| email        | varchar(64) | PRIMARY KEY.         |
| firstname    | varchar(64) | NOT NULL.            |
| lastname     | varchar(64) | NOT NULL.            |
| wallet       | varchar(64) | NOT NULL.            |
| country      | varchar(64) | NULL.                |
| city         | varchar(64) | NULL.                |
| address      | varchar(64) | NULL.                |
| zipcode      | varchar(16) | NULL.                |
| phone        | varchar(32) | NULL.                |
| country_code | varchar(8)  | NULL.                |
| created_at   | datetime    | CURRENT_TIMESTAMP(). |
| updated_at   | datetime    | CURRENT_TIMESTAMP(). |

---
## Endpoints 

There are three endpoints

### /

#### GET (/):{ message }

#### POST (/):{ message }



### /login

#### POST (/):{ token }

**BODY PARAMS**
- email (required): A valid email to login

- password (required): A valid password to login



### /infouser

#### GET(/): { users }

**QUERY PARAMS**
- limit (default 10): A valid limit parameter to consult users

- page (default 1): A valid page parameter to consult users

#### POST(/): { message }

**BODY PARAMS**
- email (required)

- firstname (required)

- lastname (required)

- wallet (required)

- country (optional)

- city (optional)

- address (optional)

- zipcode (optional)

- phone (optional)

### /consult

#### POST(/posts):{ []posts }

**HEADERS**
- token (required): A valid token to validate the request

**QUERY PARAMS**
- limit (default: 100): A **number** that describes how many posts retieve. NO MAX, MIN 1

#### POST(/comments):{ []posts }

**HEADERS**
- token (required): A valid token to validate the request

**QUERY PARAMS**
- limit (default: 100): A **number** that describes how many posts retieve. NO MAX, MIN 1
