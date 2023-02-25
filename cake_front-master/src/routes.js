import Login from "views/Login.js";
import Registration from "views/Registration.js";
import QualityMetrics from "views/QualityMetrics.js";
import CakeList from "views/CakeList.js";
import CakeDetail from "views/CakeDetail.js";
import AddCake from "views/AddCake.js";
import AddCountry from "views/AddCountry.js";
import AddManufacturer from "views/AddManufacturer.js";

import Icons from "views/Icons.js";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Вход",
    icon: "nc-icon nc-circle-09",
    component: Login,
    layout: "/admin",
    show: false,
  },
  {
    path: "/registration",
    name: "Регистрация",
    icon: "nc-icon nc-circle-09",
    component: Registration,
    layout: "/admin",
    show: false,
  },
  {
    path: "/quality-metrics",
    name: "Критерии качества",
    icon: "nc-icon nc-zoom-split",
    component: QualityMetrics,
    layout: "/admin",
    show: true,
  },
  {
    path: "/cakes",
    name: "Торты",
    icon: "nc-icon nc-bullet-list-67",
    component: CakeList,
    layout: "/admin",
    show: true,
  },
  {
    path: "/add_cake",
    name: "Добавить торт",
    icon: "nc-icon nc-simple-add",
    component: AddCake,
    layout: "/admin",
    show: true,
  },
  {
    path: "/add_country",
    name: "Добавить страну",
    icon: "nc-icon nc-simple-add",
    component: AddCountry,
    layout: "/admin",
    show: true,
  },
  {
    path: "/add_manufacturer",
    name: "Доб. производителя",
    icon: "nc-icon nc-simple-add",
    component: AddManufacturer,
    layout: "/admin",
    show: true,
  },
  {
    path: "/cake/:id",
    name: "Торт",
    icon: "nc-icon nc-circle-09",
    component: CakeDetail,
    layout: "/admin",
    show: false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
    show: false,
  },
];

export default dashboardRoutes;
