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
          id=""
          min-height="100"
          ref="textarea"
          rows="1"
          v-model="message"
        ></textarea>
        <button type="button" @click="onSendClick">Добавить</button>
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
    message: ""
  }),
  computed: {
    ...mapGetters(["getHistory", "getError"])
  },
  methods: {
    onSendClick() {
      let data = {
        name: "me",
        sender: {
          username: "Я"
        },
        text: this.message,
        right: true,
        room: this.history[0].room,
        created: new Date().toLocaleTimeString()
      };

      this.history.push(data);
      this.$store.dispatch("updateHistory", data);

      this.scrollDown();
      this.message = "";
    },
    scrollDown() {
      setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      });
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchHistory", this.$route.query.name);

    this.history = this.getHistory;
    this.personName = this.history[0].sender.username;
    this.scrollDown();
  }
};
</script>
