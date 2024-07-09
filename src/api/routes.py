"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint("api", __name__)


CORS(api)


@api.route("/signup", methods=["POST"])
def create_user():
    email = request.json.get("email")
    user_name = request.json.get("user_name")
    duplicate_email = User.query.filter_by(email=email).first()
    duplicate_user = User.query.filter_by(user_name=user_name).first()
    user = User(
        email=email,
        user_name=user_name,
        password=request.json.get("password"),
        is_active=True,
    )
    if duplicate_email:
        return jsonify({"msg": "Email already registered"}), 400
    elif duplicate_user:
        return jsonify({"msg": "User already registered"}), 400
    else:
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "User created succesfully"}), 200


@api.route("/login", methods=["POST"])
def login_user():
    user_name = request.json.get("user_name")
    password = request.json.get("password")
    user_exist = User.query.filter_by(user_name=user_name, password=password).first()

    if user_exist:
        access_token = create_access_token(identity=user_name)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Incorrect user or password"}), 401


@api.route("/private", methods=["GET"])
@jwt_required()
def private_access():
    user = get_jwt_identity()
    if not user:
        return jsonify({"msg": "access denied"}), 401
    return jsonify({"user_name": user}), 200
