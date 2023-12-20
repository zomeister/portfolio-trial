# Server Guide

## `Pipfile`, `pipenv`, and `pip`
### Pipenv
To install dependencies:
``` bash
cd server
pipenv install [OPTIONS] [PACKAGES]
pipenv shell [OPTIONS] [SHELL_ARGS]
```
[Other Commands:](https://pipenv.pypa.io/en/latest/cli.html#)
``` python
clean # remove packages not in Pipfile.lock
graph # dependency graph
lock # create a lock file
sync # sync dependencies to Pipfile.lock
uninstall # uninstall dependencies
upgrade # update dependencies to current version
update # locks, upgrades, & syncs dependencies
```

## Testing and Debugging
[`ipdb`](https://pypi.org/project/ipdb/#description)  
[`pytest`](https://docs.pytest.org/en/6.2.x/index.html)  
[`pytest --pdb`](https://docs.pytest.org/en/6.2.x/index.html)  

## `Flask` and `SQLAlchemy`

### Flask
To setup database:
``` bash
flask db upgrade
```
To upgrade database models:
``` bash
export FLASK_APP=app.py
flask db init
flask db upgrade head
```
To run migrations and seed db:
``` bash
flask db revision --autogenerate -m 'message'
flask db upgrade head
python seed.py
```
#### Imports
*`flask`*
- `session`
- `request`
- `make_response`
- `jsonify`
- `abort`

*`flask_login`*
- `login_user`
- `logout_user`
- `login_required`
- `current_user`

## Very Useful Packages

## Other Packages