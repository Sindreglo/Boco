<template>
  <router-link class="link" :to="{ name: 'item', params: { id: item.id } }">
    <div id="main">
      <img
        v-if="imgSource === null"
        alt="Vue logo"
        src="@/assets/default.png"
      />
      <img v-else id="image" alt="Vue logo" :src="imgSource" />
      <div id="texts">
        <div id="About11">
          <div id="About1">
            <h3 v-if="item.name.length < 8">{{ item.name }}</h3>
            <h3 v-else>{{ item.name.substring(0, 16) + ".." }}</h3>
            <p>Category: {{ categoryString }}</p>
            <p v-if="item.address.length < 8">Address:{{ item.address }}</p>
            <p v-else>Address:{{ item.address.substring(0, 16) + ".." }}</p>
            <p>Price: {{ displayPrice }} / {{ item.priceType }}</p>
          </div>
          <div id="About2">
            <div id="items">
              <p id="ratingText">Rating:</p>
              <RatingComponent :rating="item.rating" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import RatingComponent from "@/components/RateReview/RatingComponent";
import priceService from "@/services/priceService";

export default {
  props: ["item"],
  components: { RatingComponent },
  data() {
    return {
      imgSource: null,
    };
  },
  computed: {
    displayPrice() {
      return priceService.formattedPrice(priceService.displayPrice(this.item));
    },

    categoryString() {
      return this.item.categoryTypes.map((c) => c.name).join(", ");
    },
  },
  created() {
    let image = this.item.image;
    setTimeout(() => {
      this.imgSource = "data:image/jpeg;base64, " + image;
    }, 100);
  },
};
</script>

<style scoped>
.link {
  color: #2c3e50;
  text-decoration: none;
}

img {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  width: 335px;
  height: 188px;
}

p {
  font-size: 17px;
}

#main {
  display: flex;
  border-radius: 10px;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 870px;
  color: var(--text-color);
  background: var(--background-color-header-nav-footer);
  margin: 20px;
}

#main:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

#About11 {
  display: flex;
}

#About1 {
  margin-left: 30px;
  text-align: left;
  width: 250px;
}

#About2 {
  margin-top: 30px;
  margin-left: 10px;
  width: 150px;
}

#items {
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

#ratingText {
  text-align: center;
  margin-right: 30px;
}

#texts {
  width: 500px;
}

button {
  border: 1px solid #39495c;
  font-size: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  padding: 5px;
  background: white;
  margin: 20px;
}
</style>
