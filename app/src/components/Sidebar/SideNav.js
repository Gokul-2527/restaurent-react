import { faTachometerAlt, faShoppingCart, faUtensils, faThList, faLeaf, faCalendarAlt, faInfoCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const SideNav = [
  {
    label: "Dashboard",
    value: "dashboard",
    routePath: "/admin/admin-dashboard/dashboard",
    icon: faTachometerAlt, // Font Awesome icon object
  },
  {
    label: "Orders",
    value: "orders",
    routePath: "/admin/admin-dashboard/orders",
    icon: faShoppingCart,
  },
  {
    label: "Menu",
    value: "menu",
    routePath: "/admin/admin-dashboard/menu",
    icon: faUtensils,
  },
  {
    label: "Food Category",
    value: "food_category",
    routePath: "/admin/admin-dashboard/food-category",
    icon: faThList,
  },
  {
    label: "Ingredients",
    value: "ingredients",
    routePath: "/admin/admin-dashboard/ingredients",
    icon: faLeaf,
  },
  {
    label: "Events",
    value: "events",
    routePath: "/admin/admin-dashboard/events",
    icon: faCalendarAlt,
  },
  {
    label: "Details",
    value: "details",
    routePath: "/admin/admin-dashboard/details",
    icon: faInfoCircle,
  },
  {
    label: "Logout",
    value: "logout",
    routePath: "/admin/admin-dashboard/logout",
    icon: faSignOutAlt,
  },
];
