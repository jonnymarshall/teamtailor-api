# Teamtailor Jobs API

## A React on Rails application which fetches live jobs from the teamtailor api and allows the user to filter and favourite jobs. Favourites are persisted to the database for a user, and can be returned to and filtered at any time.

### Compatibility

Tested for compatibility with RUBY VERSION: 2.7.1


### User.rb
A user account must be created in order to be able to save favourites which are persisted to the database and can be used as a filter.

A user must be created with an email and password, and uses Devise.

```
User.create(email: hello@example.com, password: password)
```

The above credentials can be used to test the application. No email verification is required.

### Favourite.rb

A favourite is an object belonging to User, containing the job_id from teamtailor which relates to the job which which has been favourited by the user.

```
Favourite.create(job_id: integer, user: foreign_key)
```

Each job_id must be unique to scope: user.

### Indexing, Creating and destroying favourites - AJAX

A signed in user can make requests for their favourites in the following format:

```
GET https://teamtailor-api.herokuapp.com/
accept: "application/json", "X-CSRF-Token": csrfToken
```

Using Fetch API:

```
fetch("https://teamtailor-api.herokuapp.com/favourites",
{
  method: "GET",
  headers: { accept: "application/json", "X-CSRF-Token": csrfToken }
})
```

A signed in user can create a new favourite in the following format:

```
GET https://teamtailor-api.herokuapp.com/favourites?job_id=id
accept: "application/json", "X-CSRF-Token": csrfToken
```

Using Fetch API:

```
fetch("https://teamtailor-api.herokuapp.com/favourites?job_id=id",
{
  method: POST,
  headers: { accept: "application/json", "X-CSRF-Token": csrfToken }
})
```


A signed in user can destroy a favourite in the following format:

```
GET https://teamtailor-api.herokuapp.com/favourites/job_id=id"
accept: "application/json", "X-CSRF-Token": csrfToken
```

Using Fetch API:

```
fetch("https://teamtailor-api.herokuapp.com/favourites/job_id=id",
{
  method: DELETE,
  headers: { accept: "application/json", "X-CSRF-Token": csrfToken }
})
```


### Heroku

This app is on heroku and can be [tested here](https://teamtailor-api.herokuapp.com/).