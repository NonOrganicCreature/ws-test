<template>
    <div id="app">
        <div class="container">
            <chat />
        </div>
    </div>
</template>

<script>
import Chat from "@/components/Chat";
export default {
    name: "App",
    components: { Chat },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
