import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, abort
from flask_sqlalchemy import SQLAlchemy

from jinja2 import TemplateNotFound

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://fdnsmiaiyxvdwq:9dd4a1631ab7f22c9eed36fd9590e8ecd713ee0ff8b04acfff423667a9af3c8d@ec2-54-204-2-25.compute-1.amazonaws.com:5432/da2vlg0nphc83v"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

Base.classes.keys()

ShowsData=Base.classes.tv_maze


@app.route('/', defaults={'page': 'index'})
@app.route('/<page>')
def html_lookup(page):
    try:
        return render_template('{}.html'.format(page))
    except TemplateNotFound:
        abort(404)

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(ShowsData).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df['name']))


@app.route("/description/<name>")
def description_name(name):
    """Return the MetaData for a given sample."""
    sel = [
        ShowsData.name,
        ShowsData.url,
        ShowsData.language,
        ShowsData.genre,
        ShowsData.premiered,
        ShowsData.rating,
        ShowsData.country,
        ShowsData.image,
        ShowsData.summary,
        ShowsData.updated
    ]

    results = db.session.query(*sel).filter(ShowsData.name == name).all()

    # Create a dictionary entry for each row of metadata information
    description_name = {}
    for result in results:
        description_name["name"] = result[0]
        description_name["url"] = result[1]
        description_name["language"] = result[2]
        description_name["genre"] = result[3]
        description_name["premiered"] = result[4]
        description_name["rating"] = result[5]
        description_name["country"] = result[6]
        description_name["image"] = result[7]
        description_name["summary"] = result[8]
        description_name["updated"] = result[9]

    #print(description_name)
    return jsonify(description_name)

@app.route("/all")
def all():

   sel = [
       ShowsData.name,
       ShowsData.language,
       ShowsData.genre,
       ShowsData.premiered,
       ShowsData.rating,
       ShowsData.country,
   ]

   results = db.session.query(*sel).all()

   shows = []
   for result in results:
       data = {}
       data["name"] = result[0]
       data["language"] = result[1]
       data["genre"] = result[2]
       data["premiered"] = result[3]
       data["rating"] = result[4]
       data["country"] = result[5]
       shows.append(data)

   return jsonify(shows)

if __name__ == "__main__":
    app.run()