export type Property = {
  id: string;
  name: string;
  tagline: string;
  city: string;
  address: string;
  addressDetail: string;
  directions: string;
  mapsEmbedUrl: string;
  mapsUrl: string;
  whatsappNumber: string;
  phoneDisplay: string;
  heroPhotoUrl: string;
};

export type Highlight = {
  id: string;
  label: string;
  icon: "wifi" | "shield" | "car" | "sparkles" | "utensils" | "clock";
};

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type RoomType = {
  id: string;
  name: string;
  price: number;
  photo: GalleryPhoto;
  size: string;
  bed: string;
  specs: string[];
  note?: string;
};

export type Facility = {
  id: string;
  name: string;
  description: string;
  icon:
    | "kitchen"
    | "sofa"
    | "washer"
    | "parking"
    | "wifi"
    | "security"
    | "cleaning"
    | "prayer";
  photo: GalleryPhoto;
};

export type Testimonial = {
  id: string;
  name: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  role: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
