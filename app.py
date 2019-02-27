import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://fdnsmiaiyxvdwq:9dd4a1631ab7f22c9eed36fd9590e8ecd713ee0ff8b04acfff423667a9af3c8d@ec2-54-204-2-25.compute-1.amazonaws.com:5432/da2vlg0nphc83v"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)

shows = Base.classes.tv_maze

stmt = db.session.query(shows).statement
data = pd.read_sql_query(stmt, db.session.bind)
print(data)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
