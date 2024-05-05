from flask import Flask
app = Flask(__name__)
@app.route('/')
def home():
	return 'Hello World'
@app.route('/login')
def UserLogin():
	pass
@app.route('/admin')
def Admin():
	pass
@app.route('/admin/login')
def AdminLogin():
	pass
@app.route('/admin/createuser')
def CreateUser():
	pass
@app.route('/admin/upload')
def Upload():
	pass
if __name__ == '__main__':
	app.run(debug=True)