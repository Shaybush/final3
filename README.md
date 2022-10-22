## Getting started with Books REST API
Server system in VSCode using technologies NodeJS and express. <br>
The server takes care of encrypting its users password with bcrypt - library to help you hash passwords. <br>

# Available Scripts
In the project directory, you can run:<br>
```npm start``` <br>
Runs the Express server in development mode.<br>
By default, the server runs on port 3000 at http://localhost:3000 on your machine, and catches requests that begin<br> with the prefifx of 'api'.<br>
```run and debug``` -  in VSCode use run and debug while standing on js file. work the same 
# Client
In the project directory, you can use:<br>
[postman](https://www.postman.com/) - An application used for API testing.<br>
It is an HTTP client that tests HTTP requests, utilizing a graphical user interface,<br>
through which we obtain different types of responses that need to be subsequently validated. <br>
Must use postman for all users functionallity: <br>
1. first Register in POST method to the adress : https://ill-plum-barracuda-vest.cyclic.app/users <br> 
send in the body:<br>
{<br>
    "fullName" :{<br>
        "firstName" : "Name",<br>
        "lastName" : "Last"<br>
    },<br>
    "email" : "example@gmail.com",<br>
    "password" : "*****"<br>
}<br>
2. Than login and take the token to required authentication requests <br>
send the token in key : x-api-key value : your token
