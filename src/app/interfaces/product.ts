export interface ResponseData {
  products: Product[];
  pagination: Pagination;
}

export interface Pagination {
  current: number;
  prev: number | null;
  next: number | null;
  max?: number
}

export interface Product {
  Image: string;
  Image1: string;
  Content: string;
  Keywords: string;
  Name: string;
  Category: string;
  Colors: string;
  Price: string;
  Promo_apply: string;
  Reviews: ReviewsClass;
  Description_title: string;
  Description_content: string;
  Details: string;
  Care: CareClass;
  Color_detail: ColorDetail[];
}

export interface CareClass {
  title: string;
  content: Content[];
}

export enum Content {
  DoNotBleach = "Do not bleach",
  DoNotDryClean = "Do not dry clean",
  DoNotIron = "Do not iron",
  DoNotTumbleDry = "Do not tumble dry",
  DoNotWash = "Do not wash",
  MachineWashCold = "Machine wash cold",
  MachineWashColdDelicateCycle = "Machine wash cold delicate cycle",
  MachineWashWarm = "Machine wash warm",
  TouchUpWithCoolIron = "Touch up with cool iron",
  TouchUpWithWarmIron = "Touch up with warm iron",
  TumbleDryLowHeat = "Tumble dry low heat",
}

export enum Category {
  ChildrenOriginals = "Children Originals",
  InfantToddlerOriginals = "Infant & Toddler Originals",
  KidsOriginals = "Kids Originals",
  MenSOriginals = "Men's Originals",
  Originals = "Originals",
  WomenSOriginals = "Women's Originals",
  YouthOriginals = "Youth Originals",
  YouthTraining = "Youth Training",
}

export interface ColorDetail {
  color: string;
  image_url: string;
}

export interface ReviewsClass {
  votes: number;
  rating: number;
}
