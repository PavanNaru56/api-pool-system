This is a complete backend project without any frontend
By using the Postman application we can run our project

Request : for hosting replace the localhost with this link : https://api-pooling-system.onrender.com 

USE:
POST :  http://localhost:8000/api/v1/questions/create
POST : http://localhost:8000/api/v1/questions/:id/options/create
GET : http://localhost:8000/api/v1/questions/:id
GET : http://localhost:8000/api/v1/options/:id/addVote
DELETE : http://localhost:8000/api/v1/questions/:id/delete