from flask import Flask, request, jsonify, render_template
import google.generativeai as genai

API_KEY = 'AIzaSyDjp2KgyMh7UktuEJtm8TIbFqwb2cd9dNA'  # Your API Key
genai.configure(api_key=API_KEY)

app = Flask(__name__)
model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/diagnose', methods=['POST'])
def diagnose():
    try:
        # Parse the incoming JSON data
        data = request.json
        symptoms = data.get('symptoms')
        severity = data.get('severity')

        if not symptoms or not severity:
            return jsonify({'error': 'Missing symptoms or severity information'}), 400

        # Construct the input for the model
        ai_input = f"Diagnose symptoms: {symptoms} with severity: {severity} and suggest treatment in without formating the document jsut raw text and new lines "

        # Call the model to generate a response
        response = model.generate_content(ai_input)
        #print(response)
        # Ensure that the model response is in a proper format
        return jsonify({'diagnosis': response.text}), 200

    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
