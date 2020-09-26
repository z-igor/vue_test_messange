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
            :class="['n-message', { 'n-right': mes.right }]"
          >
            <span class="n-message__text">
              {{ mes.text }}
            </span>
            <span class="n-message__user">
              {{ mes.sender.username }}: <i>{{ mes.room }}</i>
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
    timers: {
      scrollDownTimeout: null
    },
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

      this.message = "";
      this.history = this.getHistory;
      this.timers.scrollDownTimeout = setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      }, 1);
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchHistory", this.$route.query.name);

    this.history = this.getHistory;

    if (this.history.length && typeof this.history[0] === "object") {
      this.personName = this.history[0].sender.username;
    } else {
      this.personName = this.$route.query.name;
    }

    this.timers.scrollDownTimeout = setTimeout(() => {
      this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
    }, 1);
  },
  destroyed() {
    clearTimeout(this.timers.scrollDownTimeout);
    this.timers.scrollDownTimeout = null;
  }
};
</script>
