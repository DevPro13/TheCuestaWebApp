from flask import Flask,request,jsonify
from flask_sqlalchemy  import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager,create_access_token,jwt_required
import bcrypt
from sqlalchemy import inspect
app = Flask(__name__)
#app configuration
cors = CORS(app)
load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] =os.getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_SECRET_KEY"]=os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION']= ['headers']
#Initialize DB
db=SQLAlchemy(app)
"""...............................Data base Table Models......................................"""
class Admin(db.Model):
    """
    This table contains admin information
    """
    __tablename__="admin"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(50),unique=True,nullable=False)#this must be unique
    password=db.Column(db.String(100),nullable=False)

    def __repr__(self):
        return '<Admin %r>' % self.username
class Customer(db.Model):
    """
    This table contains User details
    """
    __tablename__='customer'
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(50),nullable=False)
    email=db.Column(db.String(50),unique=True,nullable=False)
    address=db.Column(db.String(100),nullable=False)
    height=db.Column(db.Float,nullable=False)
    weight=db.Column(db.Float,nullable=False)
    adminid=db.Column(db.Integer,db.ForeignKey('admin.id'))
    admin=db.relationship('Admin')
    def __repr__(self):
        return '<Customer %r>'% self.name
class VideoTable(db.Model):
    """
    This table contains video file name and detials of the owner.
    """
    __tablename__='videotable'
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(100),nullable=False)
    filename=db.Column(db.String(100),unique=True,nullable=False)
    customerid=db.Column(db.Integer,db.ForeignKey('customer.id'))
    customer=db.relationship('Customer')
with app.app_context():
	inspect_tbl_created=inspect(db.engine)
	#check any table (users ot videotables) exists or not
	if not inspect_tbl_created.has_table("customer"):
		with app.app_context():
			#create all tables
			db.create_all()
			print("Database tables created successfully!!")
jwt=JWTManager(app)
@app.route("/", methods=["GET"])
@jwt_required
@jwt_required()
def Home():
	return 'Hello World'
@app.route("/login",methods=["POST"])
def CustomerLogin():
	data=request.get_json()
	customer=Customer.query.filter_by(email=data['email'])
	if customer and bcrypt.check_password_hash(customer.email, customer.email):
		#customer has account
		access_token=create_access_token(customer.id)
		return jsonify({
		"data":{
			"user":customer.name,
			"session_of":"customer",
			"token":access_token
		},
		"message":"Login Success",
	})
	else:
		#customer doesnot has an account
		return jsonify({
		"data":{
			"user":"",
			"session_of":"",
			"token":""
		},
		"message":"No User Found!",
	})
	
@app.route('/admin/login',methods=["POST"])
def AdminLogin():
	data=request.get_json()
	passwd=admin["passwd"]
	admin=Customer.query.filter_by(username=data['user'])
	if admin and bcrypt.check_password_hash(admin.password,passwd):
		#customer has account
		access_token=create_access_token(admin.id)
		return jsonify({
		"data":{
			"user":admin.username,
			"session_of":"admin",
			"token":access_token
		},
		"message":"Login Success",
	})
	else:
		#customer doesnot has an account
		return jsonify({
		"data":{
			"user":"",
			"session_of":"",
			"token":""
		},
		"message":"Unauthorized!",
	})
@app.route('/admin/createuser',methods=["POST"])
def CreateUser():
	pass
@app.route('/admin/upload',methods=["POST"])
def Upload():
	pass
cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}}) 
if __name__ == '__main__':
	app.run(debug=True)