<script setup>
import Image from "primevue/Image";
import { getFileUri, sendMessage, checkMessages } from "@/api/backend_request";
import bottomToolbar from "./bottomToolbar.vue";

defineProps({
  thread_id: String,
});
</script>

<script>
export default {
  data() {
    return {
      msg: "",
      buttonLoading: false,
      messages: [],
      messageList: {
        data: [],
        last_id: "",
        has_more: false,
      },
      cacheKey: +new Date(),
    };
  },
  methods: {
    getPic(file_id, file_type) {
      setTimeout(() => {
        getFileUri(file_id, file_type).then((res) => {
          this.cacheKey = +new Date();
        });
      }, 2 * 1000);
    },
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 10000,
      });
    },
    onSend() {
      this.buttonLoading = true;
      sendMessage(this.thread_id, this.msg)
        .then((res) => {
          this.msg = "";
          this.buttonLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.msg = "";
          this.buttonLoading = false;
        });
    },
  },
  mounted() {
    // this.getPic();
  },
  created() {
    this.interval = setInterval(() => {
      //   this.cacheKey = +new Date();
      checkMessages(this.thread_id).then((res) => {
        this.messages = res.data.data.data;
      });
    }, 10 * 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>


<template>
  <div id="page-container">
    <div id="content-wrap">
      <ScrollPanel>
        <div v-for="message in messages" :key="message.id">
          <div class="card">
            <Fieldset>
              <template #legend>
                <div
                  v-if="message.role !== 'user'"
                  class="flex items-center pl-2"
                >
                  <Avatar
                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    shape="circle"
                  />
                  <span class="font-bold p-2">Minds Data Analyst</span>
                </div>
                <div v-else class="flex items-center pl-2">
                  <i class="pi pi-user" style="font-size: 2rem"></i>
                  <span class="font-bold p-2"> You</span>
                </div>
              </template>
              <div
                v-for="(content, i) in message.content"
                :key="message.id + '_' + i"
              >
                <p v-if="content.type === 'text'" class="m-0">
                  {{ content.text.value }}
                </p>
                <Image
                  v-else-if="content.type === 'image_file'"
                  :src="
                    '/v1/files/' +
                    content.image_file.file_id +
                    '.png' +
                    '?rnd=' +
                    cacheKey
                  "
                  alt="Image"
                  width="250"
                  preview
                  @error="getPic(content.image_file.file_id, content.type)"
                />
              </div>
            </Fieldset>
          </div>
        </div>
      </ScrollPanel>
    </div>
    <div id="footer" class="footer">
      <div>
        <Toolbar>
          <template #start>
            <div class="flex justify-center">
              <Toast />
              <FileUpload
                mode="basic"
                name="file"
                :url="'/v1/upload?thread_id=' + thread_id"
                @upload="onUpload"
                :auto="true"
                chooseLabel="Upload"
              />
            </div>
          </template>
          <template #center>
            <div>
              <Textarea
                placeholder="Chat here ~"
                rows="2"
                cols="100"
                minlength="30"
                maxlength="100"
                autoResize
                fluid
                v-model="msg"
                :loading="buttonLoading"
              />
            </div>
          </template>
          <template #end>
            <Button label="Send" @click="onSend"></Button
          ></template>
        </Toolbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
#page-container {
  position: relative;
  min-height: 100%;
}

#content-wrap {
  padding-bottom: 4rem; /* Footer height */
}

#footer {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 4rem; /* Footer height */
}
</style>
