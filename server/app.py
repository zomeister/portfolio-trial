from flask import session, request, make_response, jsonify, abort
from flask_restful import Resource
from flask_login import login_user, logout_user, login_required, current_user
from config import app, api, login_manager, toolbar
from models import User
import traceback

@app.route('/')
def index():
    return '<h1>Welcome to Zed Gui PORTFOLIO</h1>'
# -------- AUTH -------- () ---- #
@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=int(user_id)).first()


# # -------- SIGNUP, LOGIN, LOGOUT -------- () ---- #
# class Register(Resource):
#     def post(self):
#         userData = request.get_json()
#         if not userData:
#             return make_response({"error": "invalid user data"}, 400)
#         try:
#             new_user = User(
#                 email=userData['email'],
#             )
#             new_user.password_hash = userData['password']
#             db.session.add(new_user)
#             db.session.commit()
#             login_user(new_user, remember=True)
#             return make_response(new_user.to_dict(), 201)
#         except Exception as e:
#             return make_response({"error": str(e)}, 500)
# api.add_resource(Register, '/register')

# class Profile(Resource):
#     @login_required
#     def post(self):
#         userData = request.get_json()
#         if not userData:
#             return make_response({"error": "invalid user data"}, 400)
#         try:
#             new_profile = Profile(
#                 username=userData['username'],
#                 first_name=userData['firstName'],
#                 last_name=userData['lastName'],
#                 telephone=userData['telephone'],
#                 photo_url=userData['photoUrl'],
#                 birthday=userData['birthDate'],
#                 location=userData['location'],
#                 bio=userData['bio'],
#                 # user_id=userData['user_id']
#             )
#             return make_response(new_profile.to_dict())
#         except Exception as e:
#             return make_response({"error": str(e)}, 500)
#     @login_required
#     def get(self):
#         user_id = session['user_id']
#         user = User.query.filter_by(id=user_id).first()
#         profile = Profile.query.filter_by(username=user.email).first()
#         return make_response(profile.to_dict(), 200)
# api.add_resource(Profile, '/profile')




class Login(Resource):
    def post(self):
        userData = request.get_json()
        if not userData:
            return make_response({"error": "invalid user data"}, 400)
        username = userData['username']
        password = userData['password']
        user = User.query.filter_by(email=username).first()
        if not user:
            return make_response({"error": "user not found"}, 404)
        elif user.authenticate(password):
            # login_user(new_user, remember=True)
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-_password_hash',)), 200)
        else:
            return make_response({"error": "invalid username or password"}, 401)
api.add_resource(Login, '/login')
class Logout(Resource):
    @login_required
    def delete(self):
        try:
            session['user_id'] = None
            # logout_user()
            return make_response({}, 204)
        except Exception as e:
            return {"error": str(e)}, 500
api.add_resource(Logout, '/logout')


class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()
        if not user:
            return make_response({"error": "user not in session"}, 404)
        else:
            return make_response(user.to_dict(), 200)
api.add_resource(CheckSession, '/check_session')

class AuthorizeSession(Resource):
    def get(self):
         try:
             if current_user.is_authenticated:
                 profile = current_user
             return make_response(profile.to_dict(), 200)
         except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
api.add_resource(AuthorizeSession, '/authorize_session')



if __name__ == '__main__':
    app.run(port=5555, debug=True)