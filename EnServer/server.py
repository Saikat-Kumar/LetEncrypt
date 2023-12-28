from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
import rsa
from Crypto.Cipher import AES    
from Crypto.Hash import SHA256
from Crypto.Util.Padding import pad, unpad
import base64
password = ("anything")    
hash_obj = SHA256.new(password.encode('utf-8'))    
hkey = hash_obj.digest()
def encrypt(info):
    msg = info
    BLOCK_SIZE = 16
    PAD = "{"
    padding = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * PAD
    cipher = AES.new(hkey, AES.MODE_ECB)
    result = cipher.encrypt(pad(msg.encode('utf-8'), BLOCK_SIZE))
    return result
def decrypt(info):
    msg = info
    PAD = "{"
    decipher = AES.new(hkey, AES.MODE_ECB)
    pt = decipher.decrypt(msg).decode('utf-8')
    #pt=unpad(pt, 32)
    pad_index = pt.find(PAD)
    result = pt[: pad_index]
    return result  
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/encryptDecrypt": {"origins": "http://localhost:port"}})

@app.route('/encryptDecrypt', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def encryptDecrypt():
    data=request.json['data']
    type_ed=request.json['type']
    if(type_ed=="encrypt"):
      cipher_text = encrypt(data)
      encoded = base64.b64encode(cipher_text)
      encoded=encoded.decode()
      return jsonify({"key":str(encoded)})
    else:
       data = base64.b64decode(data)
       cipher_text = decrypt(data)
       
       return jsonify({"key":str(cipher_text)})
    
    
    

if __name__ == '__main__':
   app.run()