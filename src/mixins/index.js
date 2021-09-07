export const wsMixin = {
    created() {
        this.ws = new WebSocket(process.env.VUE_APP_WS_SERVER)
        this.ws.onopen = this.onOpen.bind(this)
        this.ws.onerror = this.onError.bind(this)
    },
    data() {
        return {
            ws: null
        }
    },
    methods: {
        onError(error) {
            console.log('WS error: ' + error)
        },
        onOpen() {
            console.log('WS connection opened.')
        },
        sendWSMessage(message) {
            this.ws.send(message)
        },
        closeWSConnection() {
            this.ws.close()
        },
        setOnMessageCallback(callback) {
            this.ws.onmessage = callback 
        }
    },
    destroyed() {
        this.ws.close()
    }
}