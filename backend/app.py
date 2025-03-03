from flask import Flask, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

# Připojení k MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://news_db:27017/")
client = MongoClient(MONGO_URI)
db = client["webnews"]
collection = db["idnes"]

@app.route("/posts", methods=["GET"])
def get_posts():
    posts = list(collection.find({}, {"_id": 0}))  # Vrátí všechny příspěvky bez _id
    return jsonify(posts)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
