from flask import Flask, jsonify, request
import json
import requests
from flask_cors import CORS, cross_origin

GPT4_API_URL = "https://api.openai.com/v1/completions"
OPENAI_API_KEY = "your_openai_api_key_here"

app = Flask(__name__)
cors = CORS(app)
chat_history = {}
app.config['CORS_HEADERS'] = 'Content-Type'
def authenticate(username, password):
    return username == 'admin@admin' and password == 'admin'

def load_chat_history(username):
    try:
        with open("chat_history/chat_history_{}.json".format(username), "r") as file:
            chat_history = json.load(file)
    except FileNotFoundError:
        chat_history = {}
    return chat_history

def save_chat_history(chat_history, username):
    with open("chat_history/chat_history_{}.json".format(username), "w") as file:
        json.dump(chat_history, file)

def query_gpt4(prompt):
    headers = {
        "Content_Type": "application/json",
        "Authorization": "Bearer {}".format(OPENAI_API_KEY)
    }

    data = {
        "model": "text-davinci-003",
        "max_tokens": 100,
        "prompt": prompt
    }

    response = requests.post(GPT4_API_URL, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to query GPT-4"}


# <------------------------------- Routes --------------------------------------->

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    # on login, load chat history
    username = request.json['username']
    password = request.json['password']
    if authenticate(username, password):
        return jsonify({"status": "success", "username": username, "chat_history": load_chat_history(username)})
    else:
        return jsonify({"status": "failed", "message": "Invalid credentials"})
    
@app.route('/logout', methods=['POST'])
@cross_origin()
def logout():
    # on logout, save chat history
    username = request.json['username']
    save_chat_history(chat_history, username)
    return jsonify({"status": "success"})

@app.route('/query_gpt', methods=['POST'])
@cross_origin()
def query_gpt():
    data = request.get_json()
    prompt = data['prompt']
    if prompt:
        chat_history.append({"user": prompt})
        response = query_gpt4(prompt)
        if response.get("choices"):
            chat_history.append({"bot": response["choices"][0]["text"]})
            return jsonify({"status": "success", "response": response["choices"][0]["text"]})
        else:
            return jsonify({"status": "failed", "message": "Failed to query GPT-4"})
    else:
        return jsonify({"status": "failed", "message": "Prompt not provided"})


if __name__ == '__main__':
    app.run(debug=True)










# <------------------------------------- GPT playground code ------------------------------------->

# import openai, os, requests

# openai.api_type = "azure"
# openai.api_version = "2024-02-15-preview"

# # Azure OpenAI setup
# openai.api_base = "https://ai-drinextactionbothub509556323367.openai.azure.com/" # Add your endpoint here
# openai.api_key = os.getenv("OPENAI_API_KEY") # Add your OpenAI API key here
# deployment_id = "gpt-35-turbo-16k" # Add your deployment ID here

# # Azure AI Search setup
# search_endpoint = "https://undefined.search.windows.net"; # Add your Azure AI Search endpoint here
# search_key = os.getenv("SEARCH_KEY"); # Add your Azure AI Search admin key here
# search_index_name = "undefined"; # Add your Azure AI Search index name here

# def setup_byod(deployment_id: str) -> None:
#     """Sets up the OpenAI Python SDK to use your own data for the chat endpoint.

#     :param deployment_id: The deployment ID for the model to use with your own data.

#     To remove this configuration, simply set openai.requestssession to None.
#     """

#     class BringYourOwnDataAdapter(requests.adapters.HTTPAdapter):

#         def send(self, request, **kwargs):
#             request.url = f"{openai.api_base}/openai/deployments/{deployment_id}/extensions/chat/completions?api-version={openai.api_version}"
#             return super().send(request, **kwargs)

#     session = requests.Session()

#     # Mount a custom adapter which will use the extensions endpoint for any call using the given `deployment_id`
#     session.mount(
#         prefix=f"{openai.api_base}/openai/deployments/{deployment_id}",
#         adapter=BringYourOwnDataAdapter()
#     )

#     openai.requestssession = session

# setup_byod(deployment_id)


# message_text = [{"role": "user", "content": "What are the differences between Azure Machine Learning and Azure AI services?"}]

# completion = openai.ChatCompletion.create(
#     messages=message_text,
#     deployment_id=deployment_id,
#     data_sources=[  # camelCase is intentional, as this is the format the API expects
#       {
#   "type": "azure_search",
#   "parameters": {
#     "filter": null,
#     "endpoint": "'$search_endpoint'",
#     "index_name": "sad-lamp-k3cjsc8qg5",
#     "project_resource_id": "/subscriptions/28597056-e19a-4038-b652-f83f0751f64d/resourceGroups/rg-drinextaction/providers/Microsoft.MachineLearningServices/workspaces/guptasameer112-3103",
#     "semantic_configuration": "azureml-default",
#     "authentication": {
#       "type": "system_assigned_managed_identity",
#       "key": null
#     },
#     "embedding_dependency": null,
#     "query_type": "vectorSimpleHybrid",
#     "in_scope": true,
#     "role_information": "You are an AI assistant that helps people find information.",
#     "strictness": 3,
#     "top_n_documents": 5,
#     "key": "'$search_key'",
#     "indexName": "'$search_index'"
#   }
# }
#     ],
#     temperature=0.7,
#     top_p=0.95,
#     max_tokens=800,
#     stop=null,
#     stream=true

# )
# print(completion)