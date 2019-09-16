from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__, template_folder="templates")

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'flow_task') 
COLLECTION_NAME = 'training'


@app.route('/')
def index():
    """
    A Flask view to serve the dashboard page.
    """
    return render_template('index.html')

@app.route('/trainees/')
def trainees():
    return render_template('trainees.html')

@app.route('/trainees/manage')
def manage_trainees():
    return render_template('trainees/manage.html')

@app.route('/trainees/add')
def add_trainees():
    return render_template('trainees/add.html')

@app.route('/trainees/import')
def import_trainees():
    return render_template('trainees/import.html')

@app.route('/branches/')
def branches():
    return render_template('branches.html')

@app.route('/branches/manage')
def manage_branches():
    return render_template('branches/manage.html')

@app.route('/branches/add')
def add_branches():
    return render_template('branches/add.html')

@app.route('/branches/import')
def import_branches():
    return render_template('branches/import.html')

@app.route('/reports/')
def reports():
    return render_template('reports.html')

@app.route('/reports/engagement')
def engagement():
    return render_template('reports/engagement.html')

@app.route('/reports/training')
def training_progress():
    return render_template('reports/training.html')

@app.route('/reports/data')
def data_extract():
    return render_template('reports/data.html')

@app.route('/settings/')
def settings():
    return render_template('settings.html')

@app.route('/settings/company')
def company_settings():
    return render_template('settings/company.html')

@app.route('/settings/module')
def module_settings():
    return render_template('settings/module.html')

@app.route('/flow_task/training')
def db_data():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'branch': True, 'area': True, 'region': True,
        'modules_passed': True, 'modules_failed': True, 'modules_in_progress': True,
        'modules_overdue': True
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))


if __name__ == '__main__':
    app.run(debug=True)