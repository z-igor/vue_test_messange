<template>
  <div class="n-container n-home">
    <form class="n-form" @submit.prevent="onSubmit">
      <label>
        <p class="n-field-title">Имя</p>
        <input type="text" name="name" v-model="name" placeholder="Ваше имя" />
        <span class="n-error" v-if="!$v.name.required"
          >Поле обязательно для заполнения</span
        >
        <span class="n-error" v-else-if="!$v.name.maxLength"
          >Вы превысили {{ getSettings.max_username_length }} символов</span
        >
      </label>
      <!-- <label>
        <p class="n-field-title">Пароль</p>
        <input
          type="text"
          name="password"
          v-model="password"
          placeholder="Ваш пароль"
        />
        <span class="n-error" v-if="!$v.password.required"
          >Поле обязательно для заполнения</span
        >
        <span class="n-error" v-if="!$v.password.minLength"
          >Больше {{ $v.password.$params.minLength.max }} букв</span
        >
      </label> -->
      <button type="submit" :disabled="$v.$invalid">Войти в комнату</button>
      <button type="button" @click="resetForm">Очистить поле</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Home",
  data: () => ({
    name: "kozmaa",
    settings: 20,
    lengthTimeout: null
    //, password: "123456"
  }),
  validations: {
    name: {
      required,
      async maxLength(val) {
        const max = await this.getSettings.max_username_length;
        const length = val.length;

        if (val === "") {
          return val;
        }

        return length <= max;
      }
    }
    //, password: {
    //   required,
    //   minLength: minLength(6)
    // }
  },
  computed: {
    ...mapGetters(["getSettings"])
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      } else {
        this.$router.push(`/rooms/person?name=${this.name}`);
      }
    },
    resetForm() {
      this.name = "";
      // this.password = "";
    }
  },
  mounted() {
    this.$store.dispatch("fetchSettings");
  },
  destroyed() {
    this.lengthTimeout = null;
  }
};
</script>
