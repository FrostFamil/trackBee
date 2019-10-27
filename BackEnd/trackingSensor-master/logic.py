import ast
import random
import requests
import json
import sys
from time import sleep
from Crypto.Cipher import AES
from Crypto import Random
from pkcs7 import PKCS7Encoder
from base64 import b64encode



x = ast.literal_eval(sys.argv[1])
y = ast.literal_eval(sys.argv[2])
animal_type = sys.argv[3]
sensorID = "A4DD5"
password = 'trackbeeAdmin'

def generate_rand():
    rand = random.uniform(0.001, 0.009) * (1 if random.random() < 0.5 else -1)
    return rand

def encrypt_val(clear_text):
    master_key = '1234567890123456' 
    encoder = PKCS7Encoder()
    raw = encoder.encode(clear_text)
    iv = Random.new().read( 16 )
    cipher = AES.new( master_key, AES.MODE_CBC, iv, segment_size=128 )
    return b64encode( iv + cipher.encrypt( raw ) ).decode('ascii')

url = 'http://localhost:3000/'
passwordEncrypted = encrypt_val(password)

for i in range(20):
    y = y + generate_rand()
    x = x + generate_rand()
    print(y, x)
    data = {
        'latitude': format(y, '.3f'),
        'longitude': format(x, '.3f'),
        'type': animal_type,
        'sensorID': sensorID,
        'password': passwordEncrypted
    }
    headers = {'Content-type': 'application/json'}
    r = requests.post(url, data = json.dumps(data), headers = headers)
    waiting_time = 0
    if animal_type == 'Bee':
        waiting_time = 2
    elif animal_type == 'Deer':
        waiting_time = 1.5
    elif animal_type == 'Bird':
        waiting_time = 1
    sleep(waiting_time)
