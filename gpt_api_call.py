import openai
import os
import re


def FormatMarkdown(purestr):
    pattern = re.compile(r"```(.+?)```", re.DOTALL)
    code_blocks = []
    for match in pattern.finditer(purestr):
        start, end = match.span()
        code_blocks.append((purestr[:start], False))
        code_blocks.append((purestr[start:end], True))
        purestr = purestr[end:]
    code_blocks.append((purestr, False))
    result_blocks = [i for i in code_blocks if i[0]]
    return result_blocks




# Set up your OpenAI API key
def GPT_API_CALL(history,request_message):
    if request_message == "":
        return
    f = open("gpt_api.key", "r")
    openai.api_key = f.read()
    # Make an API call
    history.append({"role": "user", "content": request_message})
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", # this is "ChatGPT" $0.002 per 1k tokens
    messages=history
    )
    reply_content = completion.choices[0].message.content
    return FormatMarkdown(reply_content),completion
