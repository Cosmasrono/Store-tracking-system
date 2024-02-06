<script setup>
import { RouterLink, RouterView } from "vue-router";
import PaymentView from "./views/PaymentView.vue";
import Payment from "./components/Payment.vue";
</script>

<template>
  <main>
    <nav
      class="flex justify-center items-center px-1 gap-7 py-2 pb-2 mx-auto text-2xl text-slate-100 bg-slate-900"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/Admin">admin</RouterLink>
      <RouterLink to="/ProductView">products</RouterLink>
      <RouterLink to="/CartView">Cart</RouterLink>
      <RouterLink to="/PaymentView">payment</RouterLink> 

     <RouterLink to="/CartView">Cart</RouterLink> 
    </nav>
 

    <RouterView />
  </main>
</template>
