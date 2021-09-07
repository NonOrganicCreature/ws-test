<template>
    <div class="message">
        <div class="message__sender">{{ sender }}:</div>
        <div class="message__text">&nbsp;{{ text }}</div>
    </div>
</template>
<script>
export default {
    name: "Message",
    components: {},
    props: {
        sender: String,
        text: String,
    },
};
</script>

<style lang="scss">
.message {
    display: flex;
    flex-flow: row nowrap;
    &__sender {
        font-weight: 700;
    }
}
</style>