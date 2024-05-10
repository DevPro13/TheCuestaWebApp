from flask import Flask,redirect,request,jsonify,url_for,send_file
from flask_sqlalchemy  import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager,get_jwt_identity,create_access_token,jwt_required
from sqlalchemy import inspect
from werkzeug.utils import secure_filename
UPLOAD_FOLDER = 'VideoUploads'
Video_Extensions=['mp4','mov','mkv','avi','mpeg','ogg','3gp','webm','flv']#to allow only video file
app = Flask(__name__,static_folder='../myapp/build', static_url_path='/')
#app configuration
cors = CORS(app)
load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] =os.getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_SECRET_KEY"]=os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION']= ['headers']
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
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
	def getTableDataInDict(self):
		return{
			"title":self.title,
			"filename":os.path.join(app.config['UPLOAD_FOLDER'],self.filename),
		}
#>>>>>>>>>>>>>>>>>>>>>>>CREATE TABLE IN THE DATABASE IF NOT EXIST>>>>>>>>>>>>>>>>>>>>>
with app.app_context():
	inspect_tbl_created=inspect(db.engine)
	#check any table (users ot videotables) exists or not
	if not inspect_tbl_created.has_table("customer"):
		with app.app_context():
			#create all tables
			db.create_all()
			print("Database tables created successfully!!")
jwt=JWTManager(app)
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
@app.route("/", methods=["GET"])
def Home():
	if not request.args:
		return app.send_static_file('index.html')
	uid=int(request.args.get('userid'))
	print(uid)
	with app.app_context():
		videos=VideoTable.query.filter_by(customerid=uid).all()
		if len(videos)!=0:
			videoDetails=[video.getTableDataInDict() for video in videos]
			return jsonify({
				"videos":videoDetails,
				"message":"Video fetch success"
			}),200
	return app.send_static_file('index.html')
@app.route("/login",methods=["POST"])
def CustomerLogin():
	data=request.get_json()
	with app.app_context():	
		customer=Customer.query.filter_by(email=data['email']).first()
		if customer:
			name=customer.name.lower()
			if not name==data['fname'].split(" ")[0].lower():
				return jsonify({"message":"Name Did not match for the given Email!"}),404
			#customer has account
			access_token=create_access_token(customer.id)
			return jsonify({
			"data":{
				"userID":customer.id,
				"user":customer.name,
				"session_of":"customer",
				"token":access_token
			},
			"message":"Login Success",
		}),200
		else:
			#customer doesnot has an account
			return jsonify({
			"data":{
				"userID":None,
				"user":"",
				"session_of":"",
				"token":""
			},
			"message":"No User Found!",
		}),404
@app.route('/admin/login',methods=["POST"])
def AdminLogin():
	data=request.get_json()
	passwd=data["passwd"]
	with app.app_context():
		admin=Admin.query.filter_by(username=data['user']).first()
		if admin and admin.password==passwd:
			access_token=create_access_token(admin.id)
			return jsonify({
						"data":{
						"user":admin.username,
						"session_of":"admin",
						"token":access_token
					},
						"message":"Login Success",
				}),200
		else:
			#customer doesnot has an account
			return jsonify({
						"data":{
						"user":"",
						"session_of":"",
						"token":""
					},
						"message":"Unauthorized!",
				}),401
@app.route('/admin/createuser',methods=["POST"])
def CreateUser():
	data=request.get_json()
	with app.app_context():
		customerExist=Customer.query.filter_by(email=data["email"]).first()
		if not customerExist:
			#create account for the new customer
			admin=Admin.query.filter_by(username="devpro13").first()
			new_customer=Customer(name=data['fullname'],email=data['email'],address=data['address'],height=float(data['height']),weight=float(data['weight']),admin=admin)
			db.session.add(new_customer)
			db.session.commit()
			return jsonify({
					'message':"New customer created!"
			}),200
		else:
			return jsonify({
					'message':"Customer Account for email:{} already exist".format(data['email'])
			}),302
@app.route('/admin/upload',methods=["POST"])
def Upload():
	videodata=request.files
	file=videodata['videofile']
	filename = secure_filename(file.filename)
	if filename.split('.').pop() not in Video_Extensions:
		err_msg="Invalid Video File: Please Upload  a video file. Video files has file extensions as {} etc".format(",".join(i for i in Video_Extensions[:5]))
		return jsonify({'message': err_msg}),401
	title = request.form.get('title')
	email = request.form.get('email')
	with app.app_context():
		customer=Customer.query.filter_by(email=email).first()
		if customer:
			fileExist=VideoTable.query.filter_by(filename=filename).first()
			if fileExist:
				return jsonify({'message'
				:"Video file with simular filename already uploaded to the user"}),302
			else:
				#upload in the database
				print("I was here")
				new_video=VideoTable(title=title,filename=filename,customer=customer)
				print("I was not here..ok  here")
				db.session.add(new_video)
				db.session.commit()
				file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
				return jsonify({'message': 'File uploaded successfully'}),200
		else:
			return jsonify({'message': 'Customer email does match or customer account does not exist'}),404
@app.route('/download',methods=["GET"])
def Download():
	video_path=request.args.get('file')
	return send_file(video_path,as_attachment=True),200
cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}}) 
if __name__ == '__main__':
	app.run(debug=True)