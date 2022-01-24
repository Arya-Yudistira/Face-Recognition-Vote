import face_recognition
import cv2
import numpy as np
from flask import *
from camera import Video
from flask_cors import CORS
import mysql.connector as conn
app = Flask(__name__)
CORS(app)
db = []
def get_data():
    global db
    con = conn.connect(host='localhost', database='skripsi',user='root', charset='utf8', port=3306)
    cursor = con.cursor()
    sql = 'select * from register'
    cursor.execute(sql)
    result = cursor.fetchall()
    for i in result:
        l = []
        l.append(i[0])
        l.append(i[1])
        string = i[2][1:-2]
        nums = []
        for x in string.split():
            nums.append(float(x.strip()))
        l.append(nums)
        db.append(l)
    cursor.close()
    con.close()

@app.route('/')
def index():
    return 'Hello'

@app.route('/register', methods=['GET'])
def register():
    con = conn.connect(host='localhost', database='skripsi',user='root', charset='utf8', port=3306)
    cursor = con.cursor()
    sql = 'insert ignore into register values(%s,%s,%s)'
    nik = request.args.get("nik")
    name = request.args.get("name")
    video_capture = cv2.VideoCapture(0)
    ret, frame = video_capture.read()
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:, :, ::-1]
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
    video_capture.release()
    cv2.destroyAllWindows()
    encoding = ""
    for i in face_encodings:
        encoding += str(i)+","
    li = [nik, name, encoding]
    value = tuple(li)
    cursor.execute(sql, value)
    con.commit()
    cursor.close()
    con.close()
    return "Done"

@app.route("/login")
def login():
    get_data()
    global db
    if(db == []):
        msg = "You are unknown first register your self"
    else:
        known_face_encodings = [i[2] for i in db]
        known_face_names = [i[1] for i in db]
        known_face_nik = [i[0] for i in db]
        face_locations = []
        face_encodings = []
        face_names = []
        video_capture = cv2.VideoCapture(0)
        ret, frame = video_capture.read()
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        video_capture.release()
        cv2.destroyAllWindows()
        if(face_encodings == []):
            name = "You are unknown first register your self"
        else:
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]
                    nik = known_face_nik[best_match_index]
                if(name == "Unknown"):
                    name = "You are unknown first register your self"
                face_names.append(name)
            info = {
                "name":name,
                "nik": nik
            }
    return info

@app.route('/pilih')
def pilih():
    con = conn.connect(host='localhost', database='skripsi',user='root', charset='utf8', port=3306)
    cursor = con.cursor()
    sql ='UPDATE suara SET suara = suara + 1 WHERE id = 1 '
    cursor.execute(sql)
    con.commit()
    cursor.close()
    con.close()
    return "voted"

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(Video()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
