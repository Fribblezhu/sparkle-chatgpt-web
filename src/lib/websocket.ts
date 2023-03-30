export class ChatGPT {

    url: string
    onmessage: Function
    websocket: WebSocket
    connected: Boolean = false


    constructor(url: string, onmessage: Function) {
        this.url = url
        this.onmessage = onmessage
        this.websocket = null as unknown as WebSocket
    }

    sendQuestion(message: any) {
        if(!this.connected) {
            return
        }
        this.websocket?.send(JSON.stringify(message))
    }


    start() {
        this.websocket = new WebSocket(this.url)
        this.websocket.onopen = this.onWebSocketOpen.bind(this)
        this.websocket.onclose = this.onWebSocketClose.bind(this)
        this.websocket.onmessage = this.onWebSocketMessage.bind(this)
        this.websocket.onerror = this.onWebSocketError.bind(this)
    }

    reconnect() {
        this.close()
        this.start()
    }

    onWebSocketOpen() {
        this.connected = true
        console.log('chat gpt websocket open')
    }

    onWebSocketClose() {
        this.connected = false
        window.setTimeout(() => {
            this.start()
        }, 1000)

        console.log('chat gpt websocket close')
    }

    onWebSocketError() {
        console.log('chat gpt websocket error')
    }

    onWebSocketMessage(event: MessageEvent) {
        this.onmessage(event.data)
    }

    close() {
        if(this.websocket && this.websocket.readyState === 1) {
            this.websocket.close()
        }
        this.connected = false
    }
}
