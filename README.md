# Front end

Location ./client

React application initially created with vite


# Backend

Location ./server



# Jokes API

A simple RESTful API for storing and retrieving jokes.

---

## Base URL

```
/api
```

---

## Endpoints

### 1. Get All Jokes

**Endpoint**
```
GET /api/jokes
```

**Description**
Retrieve a list of all jokes stored in the system.
> Note: There may be an unspecified limit applied to the number of jokes returned.

**Response**
- **200 OK**: Returns a JSON array of joke objects.

**Example Response**
```json
[
  {
    "id": "jarvis-unique-abcd",
    "text": "How do you catch a unique rabbit? Unique up on it.",
    "source": "Randall Jarvis"
  },
  {
    "id": "jarvis-tame-efgh",
    "text": "How do you catch a tame rabbit? Tame way!",
    "source": "Randall Jarvis"
  }
]
```

---

### 2. Add a New Joke

**Endpoint**
```
POST /api/joke
```

**Description**
Add a new joke to the collection.

**Headers**
```
Content-Type: application/json
```

**Request Body**
A JSON object with a `joke` key.
The `joke` object must include:
- `text` (string): The joke text.
- `source` (string): The author/source of the joke.

**Example Request**
```json
{
  "joke": {
    "text": "How do you catch a unique rabbit? Unique up on it.",
    "source": "Randall Jarvis"
  }
}
```

**Responses**
- **201 Created**: Returns the newly created joke object.
- **400 Bad Request**: Returned if the request body is invalid or missing required fields.

**Example Response (201 Created)**
```json
{
  "id": "jarvis-tame-efgh",
  "text": "How do you catch a unique rabbit? Unique up on it.",
  "source": "Randall Jarvis"
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message describing the issue"
}
```

**Example (400 Bad Request)**
```json
{
  "error": "Invalid request body. 'text' and 'source' are required."
}
```

---

## Future Improvements

- Support for pagination in `GET /api/jokes`.
- Ability to update or delete jokes.
- Optional query parameters (e.g., search by source or keyword).

In case we add functionality
* `GET /api/joke` -> Hear a joke
* `PUT /api/joke/{id}` -> Fix a bad joke
* `DELETE /api/joke/{id}` -> Pretend that joke never existed

### Rating
- We have discussed adding ratings to jokes.
- However, is not going to be applied until we finish first MVP of project
- There is currently no other RESTful agreement for ratings
