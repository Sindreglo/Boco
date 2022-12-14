<template>
  <div class="container">
    <Sidebar />
    <div class="items-header" :style="{ 'margin-left': sidebarWidth }">
      <h1>{{ $route.query.category }}</h1>
      <h2>Results found: {{ numResults }}</h2>
    </div>

    <div class="sortBar">
      <div
        :style="arrowStyle"
        :title="arrowTitle"
        style="display: inline-block; cursor: pointer"
        @click="onSortArrow"
      >
        <font-awesome-icon icon="arrow-down" />
      </div>
      <select id="sort-dropdown" v-model="sort" @change="onSortUpdate">
        <option value="id">Created</option>
        <option value="price">Price</option>
        <option value="distance">Distance</option>
      </select>
    </div>
    <div id="items" :style="{ 'margin-left': sidebarWidth }">
      <LargeItem v-for="item in items" :key="item" :item="item" />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/SidebarComponent";
import { sidebarWidth } from "@/components/Sidebar/state";
import LargeItem from "@/components/Items/LargeItem.vue";
import apiService from "@/services/apiService";
export default {
  props: ["filter"],
  components: { LargeItem, Sidebar },
  data() {
    return {
      page: 0,
      lastUpdate: Date.now(),
      items: [],
      numResults: null,
      sort: null,
      ascending: true,
    };
  },

  computed: {
    arrowStyle() {
      return this.ascending ? "" : "transform: rotate(180deg)";
    },

    arrowTitle() {
      return this.ascending ? "Ascending" : "Descending";
    },

    sortOrder() {
      return this.ascending ? "ASC" : "DESC";
    },
  },

  methods: {
    fetchItems() {
      apiService
        .getItems(this.$route.query, this.page, 15)
        .then((response) => {
          this.items.push(...response.data.listingResponses);
          this.numResults = response.data.totalListings;
        })
        .catch((error) => console.log(error));
    },

    applyFilter() {
      let query = this.$route.query;

      apiService.getMyProfile().then((response) => {
        this.$router.push("/").then(() => {
          this.$router.replace({
            name: "items",
            query: {
              ...query,
              sort: this.sort + ":" + this.sortOrder,
              location: response.data.location,
            },
          });
        });
      });
    },

    onSortArrow() {
      this.ascending = !this.ascending;
      this.applyFilter();
    },

    onSortUpdate() {
      this.applyFilter();
    },

    handleScroll() {
      let bottom =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      if (bottom && Date.now() - this.lastUpdate > 1000) {
        this.page += 1;
        this.fetchItems();
        this.lastUpdate = Date.now();
      }
    },

    onBeforeEnter(el) {
      el.style.opacity = 0;
    },
  },

  created() {
    let sort = this.$route.query.sort;
    if (sort != null) {
      let sortArray = sort.split(":");
      this.sort = sortArray[0];
      this.ascending = sortArray[1] == "ASC";
    }

    this.fetchItems();
  },

  setup() {
    return { sidebarWidth };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
#items {
  transition: 0.3s ease;
}

#sort-dropdown {
  height: 2rem;
  padding: 5px;
  margin: 15px;
  text-align: center;
}

.items-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sortBar {
  position: absolute;
  top: 50px;
  right: 10px;
}
</style>
