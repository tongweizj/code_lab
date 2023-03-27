from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/message', methods=['POST'])
def process_message():
    message = request.json.get('message')
    response = {'status': 'success', 'message': f'You sent the message "{message}"'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
