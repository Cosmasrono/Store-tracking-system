<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="signup-form">
    <form @submit.prevent="submitForm" class="form">
      <h2>Sign Up</h2>
       <div class="form-group">
        <label for="email">Email:</label>
        <input v-model.trim="formData.email" type="email" id="email" required />
      </div>
     
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model.trim="formData.password"
          type="password"
          id="password"
          required
        />
      </div>
      <!-- <div class="form-group">
          <label for="age">Age:</label>
          <input v-model.number="formData.age" type="number" id="age" required>
        </div> -->
      <button type="submit" class="btn-submit">Sign up</button>
      <p>you have account <RouterLink to="/">login</RouterLink></p>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter from vue-router

export default defineComponent({
  components: {},
  setup() {
    const formData = ref({
    
      email: "",
     
      password: "",
    });

    const router = useRouter(); // Use useRouter to access the router instance

    const submitForm = () => {
      if (validateForm()) {
        // Save form data to localStorage
        localStorage.setItem("user", JSON.stringify(formData.value));
        // Redirect to login page using router.push
        router.push("/ProductView");
      }
    };

    const validateForm = () => {
      // Basic form validation
      return Object.values(formData.value).every(
        (value) => value !== "" && value !== null
      );
    };

    return {
      formData,
      submitForm,
    };
  },
});
</script>

<style scoped>
#signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 400px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.form h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
