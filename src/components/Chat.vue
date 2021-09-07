<template>
    <div class="chat">
        <div class="chat__messages">
            <message
                v-for="msg in messages"
                :key="msg.text + Math.random() * 1000"
                :sender="msg.sender"
                :text="msg.text"
                class="chat__message"
            />
        </div>
        <div class="controls">
            <div class="controls__input">
                <input v-model="messageTextValue" type="text" />
            </div>
            <div class="controls__button">
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/Message";
import { wsMixin } from "@/mixins";
import { SENDER_ME, SENDER_SERVER } from "@/constants";

export default {
    name: "Chat",
    components: { Message },
    mixins: [wsMixin],
    data() {
        return {
            messages: [],
            messageTextValue: "",
        };
    },
    created() {
        this.setOnMessageCallback(this.onMessage.bind(this));
    },
    methods: {
        sendMessage() {
            this.messages.push({
                id: new Date().getTime(),
                sender: SENDER_ME,
                text: this.messageTextValue,
            });
            this.sendWSMessage(this.messageTextValue);
        },
        onMessage() {
            this.messages.push({
                id: new Date().getTime(),
                sender: SENDER_SERVER,
                text: this.messageTextValue,
            });
        },
    },
};
</script>

<style lang="scss">
.chat {
    display: flex;
    flex-flow: column nowrap;
    &__messages {
        display: flex;
        flex-flow: column nowrap;
        border: 1px solid #eee;
        padding: 10px 20px;
        border-radius: 10px;
        height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    &__message {
        &:first-child ~ * {
            margin-top: 15px;
        }
    }
}
.controls {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 10px 0;
    &__input {
        flex: 1 1 50%;
        input {
            padding: 10px 20px;
            width: 100%;
        }
    }
    &__button {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        flex: 1 1 50%;
        button {
            width: 100px;
        }
    }
    @media screen and (max-width: 768px) {
        display: flex;
        flex-flow: column nowrap;
        &__input {
            flex: 1 1 100%;
            input {
                padding: 10px 20px;
                width: 100%;
            }
        }
        &__button {
            flex: 1 1 100%;
            margin-top: 10px;
            button {
                padding: 10px 0;
                width: 100%;
            }
        }
    }
}
</style>