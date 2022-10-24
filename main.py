import PyPDF2
import similarity
import cgitb; cgitb.enable()
import cgi, os

from flask import Flask, render_template, request
app = Flask(__name__)
# Get filename here.
@app.route('/', methods=['GET', 'POST'])
def hello_world():
    return render_template('index.html')

@app.route('/signup.html', methods=['GET', 'POST'])
def signUp():
    return render_template('signup.html')

@app.route('/index.html', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/history.html', methods=['GET', 'POST'])
def history():
    return render_template('history.html')

@app.route('/Plagiarism-check.html', methods=['GET', 'POST'])
def Plagiarism():
    return render_template('Plagiarism-check.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    string = similarity.Upload();
    Data,average = similarity.report(str(string))
    return render_template('report.html' ,Table=Data, Average=round(average,2 ))

@app.route('/report',methods = ['POST', 'GET'])
def result():
        if request.method == 'POST':
            result = request.form['text']
            #return render_template('report.html')
            #return (similarity.returnTable(similarity.report(str(result))))
            Data,average = similarity.report(str(result))

            return render_template('report.html' , Table=Data , Average=round(average,2 ))

if __name__ == '__main__':
   app.run(debug = True, host='0.0.0.0', port=5555)
