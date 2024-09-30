import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Peoples",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },

  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Open a discussion",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 50,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 30,
    GOLD: 50,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 20,
    GOLD: 30,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 20,
    GOLD: 30,
  },
  TOTAL_VIEWS: {
    BRONZE: 100,
    SILVER: 200,
    GOLD: 500,
  },
};
