import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import FrontPage from "../views/FrontPageView.vue";
import LoginView from "@/views/LoginView";
import ItemCreationPage from "@/views/Items/ItemCreationPage";
import RegisterView from "@/views/RegisterView";
import NotFoundView from "@/views/NotFoundView";
import MyProfileView from "@/views/my/MyProfileView";
import MyItemsView from "@/views/my/MyItemsView";
import MyLeasesView from "@/views/my/MyLeasesView";
import MyReviewView from "@/views/my/MyReviewView";
import MySettingsView from "@/views/my/MySettingsView";
import itemEditPage from "@/views/Items/ItemEditPage";
import forgottenPwdView from "@/views/ForgottenPwdView";
import SupportFormView from "@/views/SupportFormView";
import itemsPage from "@/views/Items/ItemsPage";

const routerGuard = {
  beforeEnter: (to, from) => {
    console.log(from.name);
    if (!store.state.loggedIn && to.name !== "login") {
      return { name: "login" };
    }
  },
};

const routes = [
  {
    path: "/",
    name: "home",
    component: FrontPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/forgottenPwd",
    name: "forgottenPwd",
    component: forgottenPwdView,
  },
  {
    path: "/support",
    name: "support",
    component: SupportFormView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/profile/:id",
    name: "profile",
    props: true,
  },
  {
    ...routerGuard,
    path: "/my",
    component: MyProfileView,
    children: [
      {
        path: "items",
        name: "myItems",
        component: MyItemsView,
      },
      {
        path: "leases",
        name: "myLeases",
        component: MyLeasesView,
      },
      {
        path: "reviews",
        name: "myReviews",
        component: MyReviewView,
      },
      {
        path: "settings",
        name: "mySettings",
        component: MySettingsView,
      },
    ],
  },
  {
    ...routerGuard,
    path: "/create",
    name: "createItem",
    component: ItemCreationPage,
  },
  {
    ...routerGuard,
    path: "/edit",
    name: "editItem",
    component: itemEditPage,
  },
  {
    path: "/items",
    name: "items",
    component: itemsPage,
  },
  {
    path: "/items/:id",
    name: "item",
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
