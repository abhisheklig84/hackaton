import NestedDrawer from "@/components/NestedDrawer";
import { MenuItem } from "@/types/NestedDrawer";
import { useState } from "react";

export const sampleMenu: MenuItem[] = [
  {
    id: "products",
    label: "Products",
    desc: "Explore our product range",
    children: [
      {
        id: "phones",
        label: "Phones",
        desc: "Smartphones and mobiles",
        children: [
          {
            id: "iphone",
            label: "iPhone",
            desc: "Apple iPhones",
            href: "/products/iphone",
          },
          {
            id: "android",
            label: "Android",
            desc: "Android smartphones",
            href: "/products/android",
          },
          {
            id: "windows-phone",
            label: "Windows Phone",
            desc: "Windows-based phones",
            href: "/products/windows-phone",
          },
        ],
      },
      {
        id: "laptops",
        label: "Laptops",
        desc: "All kinds of laptops",
        children: [
          {
            id: "macbook",
            label: "MacBook",
            desc: "Apple MacBooks",
            href: "/products/macbook",
          },
          {
            id: "dell",
            label: "Dell",
            desc: "Dell laptops",
            href: "/products/dell",
          },
          { id: "hp", label: "HP", desc: "HP laptops", href: "/products/hp" },
        ],
      },
      {
        id: "accessories",
        label: "Accessories",
        desc: "Phone and laptop accessories",
        children: [
          {
            id: "chargers",
            label: "Chargers",
            desc: "All types of chargers",
            href: "/products/chargers",
          },
          {
            id: "headphones",
            label: "Headphones",
            desc: "Headsets and earphones",
            href: "/products/headphones",
          },
          {
            id: "cables",
            label: "Cables",
            desc: "USB and charging cables",
            href: "/products/cables",
          },
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    desc: "Our service offerings",
    children: [
      {
        id: "repair",
        label: "Repair",
        desc: "Device repair options",
        children: Array.from({ length: 5 }, (_, i) => ({
          id: `repair-${i + 1}`,
          label: `Repair Option ${i + 1}`,
          desc: `Description for Repair Option ${i + 1}`,
          href: `/services/repair/${i + 1}`,
        })),
      },
      {
        id: "warranty",
        label: "Warranty",
        desc: "Warranty options",
        children: Array.from({ length: 5 }, (_, i) => ({
          id: `warranty-${i + 1}`,
          label: `Warranty Option ${i + 1}`,
          desc: `Description for Warranty Option ${i + 1}`,
          href: `/services/warranty/${i + 1}`,
        })),
      },
    ],
  },
  {
    id: "about",
    label: "About Us",
    desc: "Learn more about us",
    children: Array.from({ length: 5 }, (_, i) => ({
      id: `about-${i + 1}`,
      label: `About Section ${i + 1}`,
      desc: `Description for About Section ${i + 1}`,
      href: `/about/${i + 1}`,
    })),
  },
  {
    id: "contact",
    label: "Contact",
    desc: "Get in touch",
    children: Array.from({ length: 5 }, (_, i) => ({
      id: `contact-${i + 1}`,
      label: `Contact Option ${i + 1}`,
      desc: `Description for Contact Option ${i + 1}`,
      href: `/contact/${i + 1}`,
    })),
  },
  {
    id: "blog",
    label: "Blog",
    desc: "Read our latest posts",
    children: Array.from({ length: 5 }, (_, i) => ({
      id: `blog-${i + 1}`,
      label: `Blog Post ${i + 1}`,
      desc: `Description for Blog Post ${i + 1}`,
      href: `/blog/${i + 1}`,
    })),
  },
  {
    id: "more",
    label: "More",
    desc: "Other options",
    children: Array.from({ length: 5 }, (_, i) => ({
      id: `more-${i + 1}`,
      label: `More Option ${i + 1}`,
      desc: `Description for More Option ${i + 1}`,
      href: `/more/${i + 1}`,
    })),
  },
];

export default function Home() {
  const [open, setOpen] = useState(true);
  return (
    <div className="page">
      <button className="pageBtn" onClick={() => setOpen(true)}>
        Open Menu
      </button>
      <NestedDrawer
        open={open}
        onClose={() => setOpen(false)}
        menu={sampleMenu}
      />
    </div>
  );
}
