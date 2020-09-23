<template>
  <div class="n-container n-home">
    <form class="n-form" @submit.prevent="onSubmit">
      <label>
        <p class="n-field-title">Name</p>
        <input type="text" name="name" v-model="name" placeholder="Ваше имя" />
        <span class="n-error" v-if="!$v.name.required"
          >Поле обязательно для заполнения</span
        >
        <span class="n-error" v-if="!$v.name.maxLength"
          >Меньше {{ $v.name.$params.maxLength.max }} букв</span
        >
      </label>
      <label>
        <p class="n-field-title">Password</p>
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
      </label>
      <button type="submit" :disabled="$v.$invalid">Войти</button>
      <button type="button" @click="resetForm">Отмена</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  name: "Home",
  data: () => ({
    name: "kozma",
    password: "123456"
  }),
  validations: {
    name: {
      required,
      maxLength: maxLength(50 || this.getSettings.max_username_length)
    },
    password: {
      required,
      minLength: minLength(6)
    }
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
      this.password = "";
    }
  },
  async mounted() {
    this.settings = await this.$store.dispatch("fetchSettings");
  }
};
</script>
