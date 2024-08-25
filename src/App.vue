<script setup>
import conversation from "./components/conversation.vue";
import {getConversations, newConversation} from "@/api/backend_request";
import "primeicons/primeicons.css";
</script>

<script>
export default {
  components: {
    conversation,
  },

  data() {
    return {
      items: [
        {
          label: "New Conversation",
          icon: "pi pi-plus",
          command: () => {
            console.log("New Conversation");
          },
        },
      ],
      threads: [],
      selectedThreadID: {},
    };
  },
  methods: {
    createNewConversation() {
      console.log("New Conversation");
      newConversation().then((res) => {
        this.selectedThreadID.code = res.data.data.id
         console.log("???", res.data.data)

        this.threads ? this.threads.push({
          name: "Thread " + this.threads.length + 1,
          id: res.data.data.id,
        }) : this.threads = [{
          name: "Thread " + this.threads.length + 1,
          id: res.data.data.id,
        }];
      });
    },
  },
  mounted() {
    getConversations().then((res) => {
      this.threads = res.data.data
    });
  },
}
</script>

<template>
  <ThemeSwitcher />
  <!-- <div>TODO: left panel</div> -->
  <div class="flex justify-left">
    <Button label="New Conversation" @click="createNewConversation" size="large"></Button>
  </div>
  <div class="flex justify-left">
    <Select v-model="selectedThreadID" :options="threads" optionLabel="name" placeholder="Select a Conversation" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
</div>
  <conversation :thread_id="selectedThreadID.code" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>