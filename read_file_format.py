import PyPDF2
import gpt_api_call as gpt_api

reader = PyPDF2.PdfReader('test.pdf')

print("number of page in the pdf : ", len(reader.pages))

# print the text of the first page
content = "what is this paper about ? : \n"
for i in range(0,len(reader.pages)-2):
    content += reader.pages[i].extract_text()

print(gpt_api.GPT_API_CALL(content))

