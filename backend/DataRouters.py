from main import *
from flask import request,jsonify
from bson import ObjectId
from json import dumps
db=client.db.rooms
dbx=client.db.announcements
@app.route('/getroominfo',methods=['POST'])
def getroominfo():
    req=request.json
    name=req["name"]
    if name :
        try:
            print("running..")
            data=db.find_one({"name":name})
            print(data)
            return dumps(data,default=str)
        except  Exception as e:
            res={
                "err":e
            }
            print(e)
            return dumps(res,default=str)
    else:
        res={
            "err":"Provide all the details"
        }
        return jsonify(res)
@app.route('/addstaff',methods=['PUT'])
def addstaff():
    req=request.json
    name=req["name"]
    staff=req["staff"]
    if name and staff and request.method=='PUT':
        try:
            data=db.find_one({"name":name})
            if data is not None:
                newvalues={"$push":{"staffs":ObjectId(staff)}}
                db.update_one({"name":name},newvalues)
                print("succesfully added")
                res={
                    "err":"Staff successfully added"                    
                }
                return jsonify(res)
            if data is None:
                res={
                    "err":"No class found"
                }
                return jsonify(res)
        except Exception as e:
            print(e)
            res={
                "err":e
            }
            return dumps(res,default=str)
    else:
        res={
            "err":"Provide all the fields"
        }
        return jsonify(res)
@app.route('/createclassroom',methods=['POST'])
def createclassroom():
    req=request.json
    name=req["name"]
    staff=req["staff"]
    if request.method == 'POST'and name and staff:
        try:
            data=db.find_one({"name":name})
            if data is None:
                students=[]
                staffs=[]
                staffs.append(ObjectId(staff))
                x=db.insert_one({
                    "name":name,
                    "creator":ObjectId(staff),
                    "students":students,
                    "staffs":staffs
                })
                newvalues = { "$push": { "classesasstaff":ObjectId(x.inserted_id) } }
                client.db.users.update_one({"_id":ObjectId(staff)},newvalues)
                print("Classroom created successfully")
                res={
                    "msg":"Classroom created successfully"
                }
                return jsonify(res)
            else:
                res={
                    "err":"A classroom already exists with this name .Try another one"
                }
                return jsonify(res)
        except Exception as e:
            res={
                "err":e
            }
            return dumps(res,default=str)
    else:
        res={
            "err":"Provide all the fields"
        }
        return jsonify(res)
        
@app.route("/getrooms",methods=["POST"])
def getrooms():
    req=request.json
    _id=req["_id"]
    if _id and request.method == "POST":
        try:
            print("Running...")
            data=client.db.users.find_one({"_id":ObjectId(_id)})
            print("userdata retrived...")
            classes=data["classesasstudent"]+data["classesasstaff"]
            classes=[ classes[i] for i in range(len(classes))]
            print(classes)
            cl=db.find()
            print("classes data retrived")
            x=[]
            for i in cl:
                print(ObjectId(i["_id"]))
                if(i["_id"] in classes):
                    admin=client.db.users.find_one({"_id":i["creator"]})
                    print("\n\n\n\n",admin["name"])
                    i["creator"]=admin["name"]
                    x.append(i)
            print(x)
            res={
                "msg":x,
            }
            return dumps(res,default=str)
        except Exception as e:
            pass
    else:

        res={
            "err":"Provide all the details"
        } 
        return jsonify(res)
@app.route("/deleteroom",methods=["DELETE"])
def deleteroom():
    req=request.json
    name=req["name"]
    if name and request.method=="DELETE":
        print('Runnning...')
        try:
            data=db.find_one({"name":name})
            if data is not None:
                db.delete_one({"name":name})
                res={
                    "msg":"Successfully deleted"
                }
                return jsonify(res)
            else:
                print("No class found")
                res={
                    "err":"No class found"
                }
                return jsonify(res)
        except Exception as e:
            res={
                "err":e
            }
            return dumps(res,default=str)
    else:
        res={
            "err":"Provide all the fields"
        }
        return jsonify(res)
@app.route("/addstudent",methods=["PUT"]) 
def addstudent():
    req=request.json
    name=req["name"]
    student=req["student"]  
    if name and student and request.method=='PUT':
        try:
            data=db.find_one({"name":name})
            if data is not None:
                newvalues={"$push":{"students":ObjectId(student)}}
                db.update_one({"name":name},newvalues)
                newvalues = { "$push": { "classesasstudent": data["_id"] } }
                da=client.db.users.update_one({"_id":ObjectId(student)},newvalues)
                print(da)
                print("succesfully added")
                res={
                    "msg":"Student successfully added"                    
                }
                return jsonify(res)
            else:
                res={
                    "err":"No class found"
                }
                return jsonify(res)
        except Exception as e:
            print(e)
            res={
                "err":e
            }
            return dumps(res,default=str)
    else:
        res={
            "err":"Provide all the fields"
        }
        return jsonify(res)
# announcements
@app.route("/announcement",methods=['POST'])
def announcement():
    req=request.json
    title=req["title"]
    text=req["text"]
    name=req["name"]
    position=req["position"]
    _id=req["_id"]
    if text and name and request.method=='POST':
        try:
            data=db.find_one({"name":name})
            if data is not None:
                room_id=data["_id"]
                staff=False
                if position=="staff" :
                    staff=True
                dbx.insert_one({
                    "title":title,
                    "text":text,
                    "staff":staff,
                    "person_id":ObjectId(_id),
                    "room_id":ObjectId(room_id)
                })
                res={
                    "msg":"Announcement created successfully"
                }
                return dumps(res,default=str)
            else:
                res={
                    "err":"No class found"
                }
                return jsonify(res)
        except Exception as e:
            res={
                "err":e
            }
            return dumps(res)
    else:
        res={
            "err":"Provide all fields"
        }
        return jsonify(res)
@app.route("/getannouncements",methods=["POST"])
def getannouncements():
    req=request.json
    room_id=req["room_id"]
    if(room_id):
        print("runiing..")
        try:
            print(room_id)
            data=dbx.find({"room_id":ObjectId(room_id)})
            print(data)
            arr=[]
            for i in data:
                arr.append(i)
            return dumps(arr,default=str)
        except Exception as e:
            res={
                "err":e
            }
            return dumps(res)
    else:
        res={
            "err":"Provide all the details"
        }
        return jsonify(res)
    
@app.route("/delannouncements",methods=['DELETE'])
def delannouncements():
    req=request.json
    _id=req["_id"]
    print(_id)
    if _id and request.method=="DELETE":
        try:
            dbx.delete_one({"_id":ObjectId(_id)})
            res={
                "msg":"Deleted successfully"
            }
            return jsonify(res)
        except Exception as e:
            res={
                "err":e
            }
            return dumps(res)
    else:
        res={
            "err":"Provide all the details"
        }
        return jsonify(res)
