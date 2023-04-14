import eel
from random import randint
import gpt_api_call as gpt_api
eel.init("web")

# Exposing the random_python function to javascript
@eel.expose
def show_message(userinput):
	gpt_raw_result = gpt_api.GPT_API_CALL(userinput)
	return gpt_raw_result

# Start the index.html file
eel.start("interface.html",size = (1080,900))
