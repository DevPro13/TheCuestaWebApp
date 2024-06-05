import sys
APP_DIR="../Backend/"
sys.path.append(APP_DIR)
from application import app
import unittest
""""
Please update name and email in formData of CreateUserTest before running the test.
"""
class LoginTest(unittest.TestCase):
    def setUp(self):
        self.client=app.test_client()
        self.credentials={
            "email":"dev@gmail.com",
            "fname":"Dev"
        }
        self.url="/login"
    def test_customer_login(self):
        #LoginSuccess Test
        res=self.client.post(self.url,json=self.credentials)
        data=res.get_json()
        self.assertEqual(res.status_code,200)
        self.assertEqual(data["message"],"Login Success")
    def test_customer_login(self):
        #No account test
        self.credentials["email"]="noaccount@gmail.com"
        res=self.client.post(self.url,json=self.credentials)
        data=res.get_json()
        self.assertEqual(res.status_code,404)
        self.assertEqual(data["message"],"No User Found!")
    def test_customer_login(self):
        #name doesnot match test
        self.credentials["email"]="menuka@gmail.com"
        self.credentials["fname"]="sakuntala"
        res=self.client.post(self.url,json=self.credentials)
        data=res.get_json()
        self.assertEqual(res.status_code,404)
        self.assertEqual(data["message"],"Name Did not match for the given Email!")
class CreateUserTest(unittest.TestCase):
    def setUp(self):
        self.client=app.test_client()
        self.formData={
            "fullname":"mohani",
            "email":"mohaani@gmail.com",
            "address":"Jawalakhel",
            "height":5.6,
            "weight":70
        }
    def test1(self):
        #account create test
        res=self.client.post("/admin/createuser",json=self.formData)
        data=res.get_json()
        self.assertEqual(res.status_code,200)
        self.assertEqual(data["message"],"New customer created!")
    def test2(self):
        #account alreadt exist test
        res=self.client.post("/admin/createuser",json=self.formData)
        data=res.get_json()
        self.assertEqual(res.status_code,302)
class FetchVideoTest(unittest.TestCase):
    def setUp(self):
        self.client=app.test_client()
    def test1(self):
        #fetch success for user
        fetchURI="/?userid="+"1"
        response=self.client.get(fetchURI)
        data=response.get_json()
        print(self.assertEqual(response.status_code,200))
        self.assertEqual(data["message"],"Video fetch success")
class DownLoadVideoTest(unittest.TestCase):
    def setUp(self):
        self.client=app.test_client()
    def test1(self):
        #file obtained to download success
        filepath="VideoUploads/demo-2024-05-03_21.12.30.mp4"
        fetchURI="/download/?file="+filepath
        response=self.client.get(fetchURI)
        self.assertEqual(response.status_code, 200)
#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# class UploadVideoTest(unittest.TestCase):   
#     def setUp(self):
#         self.client=app.test_client()
#     def test0(self):
#         url="http://127.0.0.1:5000/admin/upload"
#         #invalid file upload test
#         #uploading a file with .abc extenction
#         file="test.txt"
#         videofile={'videofile':(open(file,'rb'),file)}
#         data = dict{'title': 'This is the video of Bungee Jumping. Baisakh 2081', 'email': 'dev@example.com','videofile':videofile}
#         response=self.client.post(url,files=data)
#         Video_Extensions=['mp4','mov','mkv','avi','mpeg','ogg','3gp','webm','flv']
#         err_msg="Invalid Video File: Please Upload  a video file. Video files has file extensions as {} etc".format(",".join(i for i in Video_Extensions[:5]))
#         self.assertEqual(response.status_code,401);
#         data=response.get_json()
#         self.assertEqual(data["message"],err_msg)
#     def test1(self):
#         #upload successs test
#         url="/admin/upload"
#         #invalid file upload test
#         #uploading a file with .abc extenction
#         #file="test.txt"
#         file="../Backend/VideoUploads/demo-2024-05-03_21.12.30.mp4"
#         videofile={'videofile':(open(file,'rb'),"demo-2024-05-03_21.12.30.mp4")}
#         data = {'title': 'This is the video of Bungee Jumping. Baisakh 2081', 'email': 'dev@example.com','videofile':videofile}
#         response=self.client.post(url,content_type='multipart/form-data',buffered=True,data=data)
#         Video_Extensions=['mp4','mov','mkv','avi','mpeg','ogg','3gp','webm','flv']
#         err_msg="Invalid Video File: Please Upload  a video file. Video files has file extensions as {} etc".format(",".join(i for i in Video_Extensions[:5]))
#         self.assertEqual(response.status_code,401);
#         data=response.get_json()
#         self.assertEqual(data["message"],err_msg)
if __name__ == '__main__':
    unittest.main()