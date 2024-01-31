<template>
  <div>
    <h2>Admin Page</h2>
    <div v-if="cartItems && cartItems.length > 0">
      <h3>Cart Items</h3>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          {{ item.name }} - ${{ item.cost }} - Quantity: {{ item.quantity }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No items in cart.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  }
};
</script>
