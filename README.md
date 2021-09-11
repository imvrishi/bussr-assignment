#### Bussr Assignment

Steps to run the project using docker compose
Note: For this to run successfully you will need to make sure no other application is running on port 3000 and 27017 otherwise you can change the desired port in the docker-compose.yml

```
1. Clone the project
2. cd to the cloned project
3. run `docker-compose up --build`
```

Steps to run the project using nest
Note: For this to run successfully you will need to make sure no other application is running on port 3000 otherwise you can change the desired port in main.ts and a mongodb instance should be running at port 27017

```
1. Clone the project
2. cd to the cloned project
3. run `npm i`
4. run `npm run build`
5. run `npm start`
```

Once the project is running you can look at the swagger documentation by opening http://localhost:3000/swagger

You first have to authorize yourself by requesting the /auth/login api to get the jwt token then put the jwt token in the bearer by clicking on the Authorize button on the top right corner and the by pasting the token inside the form field
Note: By default the user bussr is created for testing

To run the unit test cases please run `npm test` command

```
Technology Used
 1. NestJS
 2. MongoDB
 3. Docker
 4. Jest
 5. Swagger (OpenAPI)
```
