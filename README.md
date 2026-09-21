# Gourmet Haven - Fine Dining Restaurant Website

A premium, fully responsive, multi-page website template designed for fine-dining restaurants. Built from the ground up using HTML5, CSS3, and Vanilla JavaScript, this project features a sophisticated UI, a persistent dark/light theme, dynamic data filtering, and a modular architecture without relying on heavy external frontend frameworks.

## Features

* **Persistent Dark/Light Mode:** User theme preferences are toggled seamlessly and saved via `localStorage` for continuity across all pages.
* **Dynamic Menu Interface:** Features a live search bar, category filtering tabs, and custom pagination logic to handle extensive menu data arrays.
* **Interactive Image Gallery:** A responsive CSS Grid layout complete with category filter buttons and a custom lightbox modal for viewing high-resolution images.
* **Form Validation:** The Contact page includes robust client-side validation for email formatting and required fields, complete with error handling and success notifications.
* **Fluid Typography & Layout:** Built using modern CSS techniques including `clamp()`, CSS Variables (Custom Properties), Flexbox, and Grid to ensure pixel-perfect rendering across all device sizes.
* **Mobile-First Navigation:** Features a sticky header that transitions into a slide-out hamburger menu drawer on mobile devices.
* **Floating CTA:** Persistent WhatsApp integration for quick customer contact.

## Tech Stack

* **HTML5:** Semantic markup structure.
* **CSS3:** Custom styling, CSS variables for theming, Grid/Flexbox for layout.
* **Vanilla JavaScript (ES6+):** DOM manipulation, event handling, data filtering, and local storage management. No external JS libraries or frameworks were used.
* **Font Awesome:** Vector icons via CDN.
* **Google Fonts:** Utilizing the 'Inter' typeface.

## File Structure

```text
gourmet-haven/
│
├── index.html           # Landing page with hero, featured dishes, and map integration
├── menu.html            # Dynamic menu with live search and pagination
├── gallery.html         # Image gallery with filters and lightbox
├── about.html           # Brand story and culinary philosophy
├── contact.html         # Contact form with validation and location details
│
├── css/
│   ├── style.css        # Global styles, variables, typography, header/footer
│   ├── menu.css         # Specific styles for menu grids and search controls
│   ├── gallery.css      # Specific styles for image masonry and lightbox modal
│   └── contact.css      # Specific styles for form validation and two-column layout
│
├── js/
│   ├── main.js          # Global logic: Theme toggle, mobile nav, sticky header
│   ├── menu.js          # Menu logic: Data array, filtering, search, pagination
│   ├── gallery.js       # Gallery logic: Category filters, lightbox modal states
│   └── contact.js       # Contact logic: Form validation, success messaging
│
└── img/                 # Directory for local image assets (e.g., hero backgrounds)
