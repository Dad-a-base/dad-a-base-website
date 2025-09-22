# Front end

Location ./client

React application initially created with vite


# Backend

Location ./server

# Contract

The following contract was agreed between front-end and back-end teams

Implement:

* `GET /api/jokes` -> Get a list of all jokes (up to potential unspecified limit)
*( `POST /api/joke` -> Add a new joke

In case we change functionality
* `GET /api/joke` -> Hear a joke
* `PUT /api/joke/{id}` -> Fix a bad joke
* `DELETE /api/joke/{id}` -> Pretend that joke never existed

### Rating
- We have discussed adding ratings to jokes.
- However, is not going to be applied until we finish first MVP of project
- There is currently no other RESTful agreement for ratings
