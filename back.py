from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import json
import keras
from keras.models import load_model
import pickle
import numpy as np 
import pandas as pd 
import nltk
from nltk.tokenize import word_tokenize
from nltk import FreqDist
import os
import gc
from keras.preprocessing import sequence,text
from keras.preprocessing.text import Tokenizer
from keras.models import Sequential
from keras.layers import Dense,Dropout,Embedding,LSTM,Conv1D,GlobalMaxPooling1D,Flatten,MaxPooling1D,GRU,SpatialDropout1D,Bidirectional
from keras.callbacks import EarlyStopping, ModelCheckpoint
from keras.utils import to_categorical
from keras.losses import categorical_crossentropy
from keras.optimizers import Adam
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score,confusion_matrix,classification_report,f1_score
import matplotlib.pyplot as plt
import warnings
import keras.backend as K
warnings.filterwarnings("ignore")
#pd.set_option('display.max_colwidth',100)
pd.set_option('display.max_colwidth', -1)

app = Flask(__name__)
api = Api(app)

K.clear_session()

model = load_model('../models/lstm_3_1.h5')
model._make_predict_function()

#sev_model = load_model('../models/sev_lstm_3_1.h5')
#K.clear_session()

with open('../models/tokenizer.pickle', 'rb') as f:
    tokenizer = pickle.load(f)
    
#with open('../models/sev_tokenizer.pickle', 'rb') as f:
#    sev_tokenizer = pickle.load(f)

    
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
  
class Model(Resource):
    def get(self):
        return {"text": "Post the string"}, 200
        
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("text")
        args = parser.parse_args()
        text = args["text"]
        print(text)
        testsequences = tokenizer.texts_to_sequences(np.asarray([text]))
        testdata = sequence.pad_sequences(testsequences, maxlen=374)
        prediction = model.predict(testdata)[0][0]
        label = "Offensive" if prediction > 0.5 else "Not Offensive"
        body = '{"text": "%s", "label": "%s", "confidence": "%.5f", "severity": "%s"}' % (text, label, prediction, "10")
        return body, 200
        
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument("text")
        parser.add_argument("correct")
        args = parser.parse_args()
        text = args["text"]
        correct = args["correct"]
        print(text, correct)
        with open('../data/corrected.csv','a') as f:
            f.write('\n,"%s",%s' % (text, correct))
        body = '{"text": "Updated Successfully"}'
        return body, 200
        
api.add_resource(Model, "/model")
app.run(debug=True, host='0.0.0.0')
CORS(app)
