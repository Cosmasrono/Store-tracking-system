<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Product from './components/Product.vue'
import Cart from './components/Cart.vue'
// import Admin from './views/Admin.vue';
  </script>

<template>
  <main>
    <nav
      class="flex justify-center items-center px-1 gap-7 py-2 pb-2 mx-auto text-2xl uppercase text-slate-100 bg-slate-900"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/About">About</RouterLink>
    </nav>
   <Product/>
   <Cart/>
   <!-- <Admin/> -->
     
    <RouterView />
  </main>
</template>

