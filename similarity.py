import nltk
import websearch
from flask import Flask, render_template, request
import PyPDF2
import similarity
import cgitb; cgitb.enable()
import cgi, os
from difflib import SequenceMatcher
import pandas as pd

nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(nltk.corpus.stopwords.words('english')) 

def purifyText(string):
    words = nltk.word_tokenize(string)
    return (" ".join([word for word in words if word not in stop_words]))

def webVerify(string, results_per_sentence):
    sentences = nltk.sent_tokenize(string)
    matching_sites = []
    for url in websearch.searchBing(query=string, num=results_per_sentence):
        matching_sites.append(url)
    for sentence in sentences:
        for url in websearch.searchBing(query = sentence, num = results_per_sentence):
            matching_sites.append(url)

    return (list(set(matching_sites)))

def similarity(str1, str2):
    return (SequenceMatcher(None,str1,str2).ratio())*100

def report(text):

    matching_sites = webVerify(purifyText(text), 2)
    matches = {}
    Finale_matches = {}
    average=0.0
    for i in range(len(matching_sites)):
        matches[matching_sites[i]] = similarity(text, websearch.extractText(matching_sites[i]))

    matches = {k: v for k, v in sorted(matches.items(), key=lambda item: item[1], reverse=True)}
    for key in matches :
        if (matches[key] >=1):
            Finale_matches[key]=matches[key]
            print (Finale_matches[key] );
            average +=matches[key] ;

    if (len(Finale_matches)!=0):
     average /= len(Finale_matches)

    return Finale_matches,average

def Upload ():
    UPLOAD_FOLDER = '/path/to/the/uploads'
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    uploaded_file = request.files['file']
    print(uploaded_file.filename)
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
    dfFileObject = open(uploaded_file.filename, 'rb')
    pdfReader = PyPDF2.PdfFileReader(dfFileObject, strict=False)
    count = pdfReader.numPages
    string = ""
    for i in range(count):
        page = pdfReader.getPage(i)
        content = page.extractText()
        string += content
    return string

def returnTable(dictionary):

    df = pd.DataFrame({'Similarity (%)': dictionary})
    #df = df.fillna(' ').T
    #df = df.transpose()
    return df.to_html()

if __name__ == '__main__':
    report('This is a pure test')
