<template>
  <div class="n-container n-chat">
    <h3 v-if="getError">{{ getError }}</h3>
    <div v-else>
      <div class="n-preview">
        <h3>Здесь только {{ personName }} и вы</h3>
        <ul class="n-messages" ref="list">
          <li
            v-for="mes in history"
            :key="mes.created"
            :class="['n-message', { right: mes.right }]"
          >
            <span class="n-message__text">
              {{ mes.text }}
            </span>
            <span class="n-message__user">
              {{ mes.sender.username }}: {{ mes.room }}
            </span>
          </li>
        </ul>
      </div>
      <div class="n-chat-actions">
        <textarea
          name=""
          ref="textarea"
          placeholder="Сообщение"
          v-model="message"
        ></textarea>
        <button type="button" @click="onSendMessageClick" :disabled="!message">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "chatRoom",
  data: () => ({
    history: [],
    personName: "",
    scrollHeight: null,
    dataTimeout: null,
    message: ""
  }),
  computed: {
    ...mapGetters(["getHistory", "getError"])
  },
  methods: {
    onSendMessageClick() {
      let data = {
        name: "me",
        sender: {
          username: "Я"
        },
        text: this.message,
        right: true,
        room: this.$route.query.name,
        created: new Date().toLocaleTimeString()
      };

      this.$store.dispatch("updateHistory", data);

      this.scrollDown();
      this.message = "";
      this.addCount++;
      this.history = this.getHistory;
    },
    scrollDown() {
      return setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      });
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchHistory", this.$route.query.name);

      this.dataTimeout = setTimeout(() => {
        this.history = this.getHistory;
      });
    } catch (error) {
      this.history = [];
    }

    if (this.history.length) {
      this.personName = this.history[0].sender.username;
    } else {
      this.personName = this.$route.query.name;
    }

    this.scrollDown();
  },
  destroyed() {
    this.dataTimeout = null;
    this.scrollDown = null;
  }
};
</script>
