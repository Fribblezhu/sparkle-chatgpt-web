# This is a sample Python script.

# Press ⇧F10 to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
import openai
import websockets
import asyncio
import websockets_routes
import json
import uuid
import os

router = websockets_routes.Router()
# openai.api_key = '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'
openai.api_key = os.environ.get('OEPNAPI_KEY')
# secret = 'coolaw_admin'
secret = os.environ.get('CHAT_SECRET')

print(openai.api_key)
print(secret)


@router.route("/websocket-chat/{user}")
async def handler(websocket, path):
    async for message in websocket:
        chat = json.loads(message)
        id = str(uuid.uuid4())
        if 'secret' not in chat or chat['secret'] != secret:
            data = {'type': 'error', 'content': 'chat.error_secret', 'conversationId': chat['conversationId'],
                    'id': id, 'prompt': chat['prompt'], 'finished_reason': 'error_secret'}
            await websocket.send(json.dumps(data, ensure_ascii=False))
        else:
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                messages=[
                    {'role': 'user', 'content': chat['prompt']}
                ],
                temperature=0,
                stream=True,  # this time, we set stream=True
                user=chat['user']
            )
            for chunk in response:
                data = chunk['choices'][0]['delta']
                data['type'] = 'answer'
                data['conversationId'] = chat['conversationId']
                data['id'] = chat['id']
                data['prompt'] = chat['prompt']
                data['finished_reason'] = chunk['choices'][0]['finish_reason']
                await websocket.send(json.dumps(data, ensure_ascii=False))


class ChatGPT(object):

    def __init__(self):
        self.server = websockets.serve(handler, '0.0.0.0', 8000)

    def start(self):
        asyncio.get_event_loop().run_until_complete(self.server)

        asyncio.get_event_loop().run_forever()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    chatGPT = ChatGPT()
    chatGPT.start()
