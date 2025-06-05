from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Load the trained model and tokenizer
model = GPT2LMHeadModel.from_pretrained(r'C:\Users\Suyash Tambe\Desktop\Chatbot\trained_gpt2')
tokenizer = GPT2Tokenizer.from_pretrained(r'C:\Users\Suyash Tambe\Desktop\Chatbot\trained_gpt2')
tokenizer.pad_token = tokenizer.eos_token  # Set pad token

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    
    # Encode and generate response
    inputs = tokenizer.encode(user_input, return_tensors='pt')
    outputs = model.generate(
        inputs, 
        max_length=100, 
        num_return_sequences=1, 
        no_repeat_ngram_size=2,
        temperature=0.7,
        top_k=50,
        top_p=0.95
    )
    
    # Decode and print the response for debugging
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    print(f"User Input: {user_input}\nGenerated Response: {response}")
    
    return jsonify({'response': response})



if __name__ == '__main__':
    app.run(debug=True)
