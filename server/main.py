
from flask import Flask, request, jsonify


app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify(

        {'users':
             ['Alice',
              'Bob',
              'Charlie']
        }
    )


if __name__ == '__main__':
    app.run(debug=True, port=8080)