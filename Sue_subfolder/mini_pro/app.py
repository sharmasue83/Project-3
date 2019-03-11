import os

import pandas as pd
import numpy as np 

import sqlalchemy 
from sqlalchemy.ext.automap import automap_base 
from sqlalchemy.orm import Session 
from sqlalchemy import create_engine 
import pymysql
import flask_mysqldb

from flask import Flask, jsonify, render_template, abort 
from flaskext.mysql import MySQL
#from flaskext.mysql import MySQL
#from flask.ext.mysql import MySQL
from flask_mysql import MySQL
#from flask_mysqldb import MySQL

from flask_sqlalchemy import SQLAlchemy

from jinja2 import TemplateNotFound

app = Flask(__name__)



app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:ilu100%MOM@localhost:3306/fda_data"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db =  SQLAlchemy(app)

conn = mysql.connect()
cursor = conn.cursor()

cursor.execute("SELECT * from merged_table")

data = cursor.fetchone()

print(data)


@app.route("/")
def index():
    #     """Return the homepage."""
    return render_template("index.html")

 
@app.route("/recall")


def recall():
    cursor = fda_data.cursor()
    sql = "SELECT * FROM merged_table"
    cursor.execute(sql)
    results = cursor.fetchall()

    recalls = []
    for result in results:

        data = {}
        data["Classification_date"] = result[0]
        data["City"] = result[1]
        data["Country"] = result[2]
        data["Distrubution_pattern"] = result[3]
        data["Initial_firm_Notification"] = result[4]
        data["Postal_Code"] = result[5]
        data["Product_quantity"] = result[6]
        data["Product_type"] = result[7]
        data["Reason_for_recall"] = result[8]
        data["Recall_Number"] = result[9]
        data["Report_Date"] = result[10]
        data["Recalling_firm"] = result[11]
        data["Product_description"] = result[12]
        data['Report_Year'] = result[13]






        recalls.append(data)

        return jsonify(recalls)


    



if __name__ == '__main__':
    app.run(debug=True)



'''

Base = automap_base()

Base.prepare(db.engine, reflect= True)

Base.classes.keys()

fdaData = Base.classes.fda_data


@app.route("/recall")
def recall():

   sel = [
       fdaData.Classification_date,
       fdaData.City,
       fdaData.Country,
       fdaData.Distrubution_pattern,
       fdaData.Initial_firm_Notification,
       fdaData.Postal_Code,
       fdaData.Product_quantity,
       fdaData.Product_type,
       fdaData.Reason_for_recall,
       fdaData.Recall_Number,
       fdaData.Report_Date,
       fdaData.Recalling_firm,
       fdaData.Product_description,
       fdaData.Report_Year

   ]

   results = db.session.query(*sel).all()

   recalls = []
   for result in results:
       data = {}
       data["Classification_date"] = result[0]
       data["City"] = result[1]
       data["Country"] = result[2]
       data["Distrubution_pattern"] = result[3]
       data["Initial_firm_Notification"] = result[4]
       data["Postal_Code"] = result[5]
       data["Product_quantity"] = result[6]
       data["Product_type"] = result[7]
       data["Reason_for_recall"] = result[8]
       data["Recall_Number"] = result[9]
       data["Report_Date"] = result[10]
       data["Recalling_firm"] = result[11]
       data["Product_description"] = result[12]
       data['Report_Year'] = result[13]






       recalls.append(data)

   return jsonify(recalls)


'''

"""
class Database:
    def __init__(self):
        host = "localhost"
        user = "root"
        password="ilu100%MOM"
        db = "fda_data"


        self.con = pymysql.connect(host =host, user=user,
        password=password, db=db, cursorclass = pymysql.cursors.DictCursor)

        self.cur = self.con.cursor()

        def list_parameters(self):
            self.cur.execute("Select City, Postal_Code from employees LIMIT 50")
            result = self.cur.fetchall()

            return result
@app.route('/')
def recall():
    def db_query():
        db = Database()
        reca = db.list_parameters()

        return reca

    res = db_query()

    return render_template(recall.html, result = res, content_type ="application/json")




if __name__ == "__main__":
    app.run()




"""