import { shallowMount } from "@vue/test-utils";
import Chat from "@/components/Chat.vue";
import Message from "@/components/Message.vue";

describe("Chat.vue", () => {

    it("renders without crashes", () => {
        const wrapper = shallowMount(Chat);
        expect(wrapper.contains("div")).toBe(true);
    });

    it("renders message with inputed value", () => {
        const wrapper = shallowMount(Chat);
        expect(wrapper.contains("div")).toBe(true);
    });

    it("renders new two messages server and me after send click", async (done) => {
        const wrapper = shallowMount(Chat, {
            data() {
                return {
                    messages: [],
                    messageTextValue: "Hello world!",
                };
            },
        });

        await new Promise((res, rej) => {
            wrapper.vm.ws.onopen = () => {
                res();
            };
        });
        await wrapper.find("button").trigger("click");
        const sourceOnMessage = wrapper.vm.ws.onmessage
        wrapper.vm.ws.onmessage = () => {
            sourceOnMessage()
            wrapper.vm.$nextTick(() => {
                expect(wrapper.findAllComponents(Message).length === 2).toBe(true);
                done();
            });
        };
    });
});
