
#Proficio App
## Authentication

After Login the API sends back a unique access token which can be used in subsequent API requests from the client. The access token can be sent in the Authorization headers as shown below.

```sh
Authorization: Bearer <access_token_here>
```



## Errors

The API may return errors with HTTP status codes in the 4xx or 5xx ranges depending on the type of error.

```sh
400     Invalid request

401     Unauthorized

403     Forbidden

404     Resource not found

500     Server error
```

