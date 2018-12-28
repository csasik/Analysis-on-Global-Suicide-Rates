from flask import (
    Flask,
    render_template,
    jsonify)
    
import pymongo

app = Flask(__name__)

# Establish connection to remote MongoDB
conn = 'mongodb://simon:Letmein12!@ds131814.mlab.com:31814/heroku_71l1lzgl'
client = pymongo.MongoClient(conn)
db = client.heroku_71l1lzgl

@app.route("/")
def index():
   # """Return the homepage."""
    return render_template("index.html")

@app.route("/index")
def index2():
   # """Return the homepage."""
    return render_template("index.html")


@app.route("/chart")
def chart():

    print("-----> /chart")

   # """Return the homepage."""
    return render_template("chart.html")

@app.route("/form")
def form():

    print("-----> /form")
    
   # """Return the homepage."""
    return render_template("form.html")

# Add any other routes here
@app.route("/suicide-rate-by-country")
def suicide_rate_by_country():
    
    print("-----> YOU ARE HERE ----------------------")

    results = db.suicide_rates_by_country.find({}, {'_id': False})

    rate_by_country = []

    for result in results:
        rate_by_country.append(result)

    print("-----> YOU ARE not HERE ----------------------")

    return jsonify(rate_by_country)

@app.route("/suicide-rate-by-age")
def suicide_rate_by_age():

    print("-----> /suicide-rate-by-age")

    results = db.suicide_death_rate_by_age.find({}, {'_id': False})

    rate_by_age = []

    for result in results:
        rate_by_age.append(result)
    
    return jsonify(rate_by_age)

@app.route("/suicide-factors")
def suicide_factors():

    print("-----> /suicide-factors")

    results = db.suicide_factors.find({}, {'_id': False})

    factors = []

    for result in results:
        factors.append(result)
    
    return jsonify(factors)

@app.route("/hospitals")
def hospitals():

    print("-----> /hospitals")

    results = db.hospitals.find({}, {'_id': False})

    hospitals = []

    for result in results:
        hospitals.append(result)
    
    return jsonify(hospitals)

@app.route("/countries")
def countries():

    print("-----> /countries")

    results = db.countries.find({}, {'_id': False})

    countries = []

    for result in results:
        countries.append(result)
    
    return jsonify(countries)

@app.route("/gender")
def gender():

    print("-----> /gender")

    results = db.gender.find({}, {'_id': False})

    genders = []

    for result in results:
        genders.append(result)
    
    return jsonify(genders)

@app.route("/")
def male_female_suicide_rate():
   # """Return the homepage."""
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
