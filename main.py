from flask import Flask, render_template, url_for, request, jsonify
import gpt_api_call as gpt_api

app = Flask(__name__, static_folder='static')

gpt_history = []


@app.route('/')
def load_index():
    return render_template('interface.html')
 
 
@app.route('/process', methods=['POST'])
def process():
    message = request.form.get('message')
    
    content,completion = gpt_api.GPT_API_CALL(gpt_history,message)
    print(content)
    gpt_response = {
    'message': content,
    'status': 200
	}
    return jsonify(response=gpt_response)



if __name__ == '__main__':
    app.run(debug = True)
    #  app.run(host='replace this message with ip', port=5000) 
