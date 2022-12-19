# EOL Development
# Backend TFTT - BPO2B Global Inc
_Save and consult data._


## 🔧 Install

_You need a **.env** file with the following data:_

- MONGO_URI : your mongodb uri
- SECRET_KEY : your secret to generate tokens
- PORT : (optional) port where the server will be listening, defaults 3000
- ENV : (optional) just a fancy name for your enviroment 😀

_You can start in the project folder running:_
```
npm i
```
_And then_
```
npm run start
```

## 🔌 Endpoints
_Save your data and retrieve your users._

### /api/login
_This endpoint only allows posts request_
#### POST(body): token
The request needs a JSON body content as following:
   ```json
"email": "emailCredential",
"password": "passwordCredential"
```
And will return an **authentication token** if the login is successful.

### /api/infouser
_This endpoint allows to save user data, consult, update and delete that data._

_We will use `userObject` to refeer the model of an user, so refer to this table when needed:_

| _Field_     | _type_   | _required_ | _assignable_  |
|:-----------:|:--------:|:----------:|:-------------:|
| email       | `String` | `true`     | `true`        |
| firstname   | `String` | `true`     | `true`        |
| lastname    | `String` | `true`     | `true`        |
| wallet      | `String` | `true`     | `true`        |
| country     | `String` | `false`    | `true`        |
| city        | `String` | `false`    | `true`        |
| address     | `String` | `false`    | `true`        |
| zipcode     | `String` | `false`    | `true`        |
| phone       | `Number` | `false`    | `true`        |
| countryCode | `String` | `false`    | `true`        |
| created_at  | `Date`   | `false`    | `false`       |
| upddated_at | `Date`   | `false`    | `false`       |

_If a field is **required** means that it needs to exists with a non falsy value in the new user._
_If a field is **assignable** means that it can be saved in a new user._
_The **email** field needs to be unique._


#### *GET(@[page,limit]): {msg:String, users:[userObject]}
You need to be authenticated to use this enpoint. To authenticate your request, send the **token** throught the **Authorization** header:
```
Authorization: Bearer <token>
```
This request accepts two query params

| _param_  | _default_  |
| ------------ | ------------ |
| page  | 1  |
| limit  | 10  |

Use `limit` for the amount of users you want to retrieve.
Use `page` for pagination according with `limit` value.

For example:
```
https://www.example.com/api/infouser?page=2&limit=20
```
**⚠ warning:** You can set `limit` to zero if you want to get all the users, but this can harm the performance of the endpoint, so try to use it only when needed.

The response body contains the following JSON-type return:

```JSON
{
	"msg": "actionMessage",
	"users":[ "userObject" ]
}
```
If an error happens, the response will be the error itself.

#### POST(body): {msg: String, user: userObject}
You dont need to be authenticated to send data throught this method. Doing a post request, we expect the info to be saved in a new `userObject`.

**⚠ warning:** The email needs to be unique, and you have to ensure that all required fields exists or an error will be thrown.

The response body contains the following JSON-type return:

```JSON
{
	"msg": "actionMessage",
	"user": "userObject"
}
```
If an error happens, the response will be the error itself.

#### *PUT(body): {msg: String, user: userObject}
You need to be authenticated to use this enpoint. To authenticate your request, send the **token** throught the **Authorization** header:
```
Authorization: Bearer <token>
```
The body of the request need the following fields:
```json
"email": "emailFromUserToUpdate",
"updateUser":{ "assignableFieldsToUpdate" }
```
If the update is successful, the `updated_at` field will save the current time

The response body contains the following JSON-type return:

```JSON
{
	"msg": "actionMessage",
	"user": "userObject"
}
```
If an error happens, the response will be the error itself.

#### *DELETE(body): {msg: String, user: userObject}
You need to be authenticated to use this enpoint. To authenticate your request, send the **token** throught the **Authorization** header:
```
Authorization: Bearer <token>
```
The body of the request need the following fields:
```json
"email": "emailForUserToDelete"
```
**⚠ warning:** Be careful with this request

The response body contains the following JSON-type return:

```JSON
{
	"msg": "actionMessage",
	"user": "userObject"
}
```
If an error happens, the response will be the error itself.
