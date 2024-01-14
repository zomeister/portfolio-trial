# Server Guide


## I. Setup

``` bash
# Install dependencies
cd server
pipenv install [OPTIONS] [PACKAGES]
pipenv shell [OPTIONS] [SHELL_ARGS]

# Setup database
flask db upgrade

# Upgrade database models
export FLASK_APP=app.py
flask db init
flask db upgrade head

# Run migrations
flask db revision --autogenerate -m 'message'
flask db upgrade head

# Migrate database models
flask db stamp head
flask db migrate
flask db upgrade

# Seed database
python seed.py

# Run backend
python app.py

```


## II. Packages

[***`flask`***](https://flask.palletsprojects.com/en/3.0.x/) - `Flask`, `session`, `request`, `make_response`, `jsonify`, `abort`

[***`sqlalchemy`***](https://www.sqlalchemy.org/) - `MetaData`

[***`flask-sqlalchemy`***](https://flask-sqlalchemy.palletsprojects.com/en/3.1.x//) - [`SQLAlchemy`](https://www.sqlalchemy.org/)


[***`flask-login`***](https://flask-login.readthedocs.io/en/latest/)

- [`UserMixin`]()
  - `<User(bool: is_authenticated, bool: is_active, bool: is_anonymous, str: get_id())>`
- [`LoginManager`](https://flask-login.readthedocs.io/en/latest/#flask_login.LoginManager)
  - `@login_required` current user required LOGIN and AUTHENTICATION (Protecting Views)
  - `@fresh_login_required` current user required LOGIN and AUTHENTICATION without looking at cookies (Protecting Views)
  - `login_user` login with credentials
    - `user` - user object to log in
    - `remember: False` - boolean indicating whether to remember user after session expiration
    - `duration: None` - time before cookie expiration
    - `force: False` - boolean indicating whether to force login inactive user
    - `fresh: True` - boolean indicating whether session is fresh
  - `logout_user` logout and clear remember me cookies, cleanup remember me cookie
  - `current_user` proxy for current user
  - `confirm_login` sets current session as fresh

[***`flask-bcrypt`***](https://flask-bcrypt.readthedocs.io/en/1.0.1/) - [`Bcrypt`](https://github.com/pyca/bcrypt/)

[***`sqlalchemy-serializer`***](https://medium.com/@seanstevens729/flask-sqlalchemy-serializer-a-comprehensive-guide-to-serialization-aec8eeb8b456) - [`SerializerMixin`]()

[***`flask-migrate`***](https://flask-migrate.readthedocs.io/en/latest/) - `Migrate`

[***`flask-restful`***](https://flask-restful.readthedocs.io/en/latest/) - [`Resource`](), `Api`

[***`flask-cors`***](https://flask-cors.readthedocs.io/en/latest/) - `CORS`

[***`requests`***](https://requests.readthedocs.io/en/latest/)

[***`ipdb`***](https://pypi.org/project/ipdb/#description)

[***`pytest`***](https://docs.pytest.org/en/6.2.x/index.html)

[`faker`](https://flask.palletsprojects.com/en/3.0.x/)

[`emoji`](https://flask.palletsprojects.com/en/3.0.x/)

[`progress`](https://flask.palletsprojects.com/en/3.0.x/)

[`colorama`](https://flask.palletsprojects.com/en/3.0.x/)


## II. Routes
-  **`/`** -
- **`/register`** - `POST` (first name, last name, username, email, phone number, birthday, password hash)
- **`/login`** - `POST` (username, password)
- **`/check_session`** - `GET`
- **`/logout`** - `DELETE`
- **`/profile`** - `POST` (bio, location, photo url, user_id/username), `GET`, `PATCH`
- **`/friends`** - `GET`, `POST`
- **`/friends/<int:profile_id>`** - `GET`, `DELETE`
- **`/messages`** -
- **`/messages/<string:friend_username>`** -
- **`/profile`** -

## II. Models
