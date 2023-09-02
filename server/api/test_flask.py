from flask import Flask, request, jsonify
import subprocess

def run_python_script(user_input):
  # Run the Python script
#   output = python_script(user_input)

  return "abc"

app = Flask(__name__)

@app.route("/")
def index():
  # Get the user input
  user_input = request.args.get("user_input")

  # Run the Python script
  output = run_python_script(user_input)

  return output

if __name__ == "__main__":
  app.run()

