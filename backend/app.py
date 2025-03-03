from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

# Připojení k MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://news_db:27017/")
client = MongoClient(MONGO_URI)
db = client["webnews"]
collection = db["idnes"]

# Endpoint pro získání příspěvků
@app.route("/posts", methods=["GET"])
def get_posts():
    posts = list(collection.find({}, {"_id": 0}))  # Vrátí všechny příspěvky bez _id
    return jsonify(posts)

# Endpoint pro přidání příspěvku
@app.route("/posts", methods=["POST"])
def add_post():
    data = request.json
    if "title" in data and "content" in data:
        collection.insert_one({"title": data["title"], "content": data["content"]})
        return jsonify({"message": "Příspěvek přidán"}), 201
    return jsonify({"error": "Chybí title nebo content"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
