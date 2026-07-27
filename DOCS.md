# 0Mix Website — Project Documentation

> Written for someone new to React. Every concept is explained in plain language alongside the code.

---

## Table of Contents

1. [What is this project built with?](#1-what-is-this-project-built-with)
2. [How to run the project](#2-how-to-run-the-project)
3. [Project folder structure](#3-project-folder-structure)
4. [How React works in this project](#4-how-react-works-in-this-project)
5. [Component-by-component guide](#5-component-by-component-guide)
6. [Data file — where all content lives](#6-data-file--where-all-content-lives)
7. [How to make common changes](#7-how-to-make-common-changes)
8. [Dark mode system](#8-dark-mode-system)
9. [Color & font system](#9-color--font-system)
10. [Change history](#10-change-history)

---

## 1. What is this project built with?

| Tool | What it does | Why we use it |
|------|-------------|---------------|
| **React** | Lets us split the page into reusable pieces called "components" | Makes the code organized and easy to change |
| **Vite** | The tool that runs your dev server and builds the final website | Very fast, works great with React |
| **Tailwind CSS** | Styling system — instead of writing separate CSS files, you write class names directly in HTML | Fast to style, consistent design |
| **Framer Motion** | Animation library for React | Smooth fade-in, slide-in effects |
| **Lucide React** | Icon library (arrow, star, menu icons etc.) | Clean, lightweight icons |

---

## 2. Deploying to BigRock (cPanel hosting)

### Step 1 — Build the production files
```bash
cd ~/Desktop/OMix_Food
npm run build
```
This creates a `dist/` folder. The build is already optimised — JS/CSS is minified, code-split into separate cached chunks, and the `.htaccess` file is included automatically.

### Step 2 — Upload to BigRock cPanel
1. Log in to your BigRock cPanel → **File Manager**
2. Navigate to **`public_html`** (this is what visitors see when they open your domain)
3. Upload **everything inside the `dist/` folder** (not the folder itself — its contents):
   - `index.html`
   - `.htaccess`
   - `favicon.png`
   - the entire `assets/` folder
4. If asked to overwrite, say **Yes**

> **Tip:** Use **FTP** (FileZilla) for faster uploads. Host: your domain, User/Pass: cPanel credentials, Port: 21.

### Step 3 — Verify
Open your domain in a browser. If you see a blank page, check that `.htaccess` was uploaded (it starts with a `.` so it can be hidden in File Manager — enable "Show Hidden Files").

### Every future update
```bash
npm run build    # rebuild
```
Then upload the new `dist/` contents to `public_html`, overwriting the old files.

---

### What makes the site fast (already applied)

| Optimisation | What it does |
|---|---|
| **Code splitting** | React, Framer Motion, and icons load as separate files. Returning visitors use cached copies — only changed code re-downloads. |
| **Gzip compression** | `.htaccess` tells Apache to compress JS/CSS/HTML before sending — typically 70% smaller over the wire. |
| **Browser caching** | JS/CSS files have 1-year cache headers (safe because Vite adds unique hashes to filenames). HTML always revalidates so new deploys are instant. |
| **Hero image preload** | `<link rel="preload">` + `fetchpriority="high"` tells the browser to fetch the hero image before anything else. |
| **DNS prefetch** | Browser opens a connection to `images.unsplash.com` early so images load faster. |
| **Font subset** | Only the font weights actually used are loaded from Google Fonts. |
| **Favicon compressed** | Logo reduced from 1.4 MB → 8.5 KB (same visual quality). |
| **Force HTTPS** | `.htaccess` redirects HTTP → HTTPS automatically. |

---

## 3. How to run the project (development)

Open a terminal and go to the project folder:

```bash
cd ~/Desktop/OMix_Food
```

### Start the development server
```bash
npm run dev
```
Then open **http://localhost:5173** in your browser.
Every time you save a file, the browser refreshes automatically.

### Stop the server
Press **Ctrl + C** inside the terminal.

### If the server is stuck / already running
```bash
kill $(lsof -t -i:5173)
```
Then start again with `npm run dev`.

### Build for production (before uploading to cPanel)
```bash
npm run build
```
This creates a `dist/` folder — upload its contents to your cPanel's `public_html`.

---

## 3. Project folder structure

```
OMix_Food/
│
├── index.html              ← The single HTML page React mounts into
├── package.json            ← Lists all dependencies (React, Tailwind etc.)
├── vite.config.js          ← Vite configuration
├── tailwind.config.js      ← Color palette, fonts, custom styles
├── postcss.config.js       ← Required for Tailwind to work
│
├── src/                    ← ALL your React code lives here
│   ├── main.jsx            ← Entry point — tells React to start inside index.html
│   ├── App.jsx             ← Root component — controls which sections show on the page
│   ├── index.css           ← Global styles + Tailwind imports
│   │
│   ├── hooks/
│   │   └── useTheme.js     ← Dark/light mode logic (localStorage + system preference)
│   │
│   ├── components/         ← Every section of the website as its own file
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductCard.jsx
│   │   ├── WhyOMix.jsx
│   │   ├── VideoSection.jsx
│   │   ├── Features.jsx
│   │   ├── Blog.jsx
│   │   ├── Testimonials.jsx
│   │   └── Footer.jsx
│   │
│   └── data/
│       └── products.js     ← All content: products, testimonials, USPs, process steps
│
├── img/                    ← Original images from the old HTML site
├── css/                    ← Old CSS files (not used anymore)
├── js/                     ← Old JS files (not used anymore)
└── dist/                   ← Auto-generated when you run `npm run build`
```

---

## 4. How React works in this project

### The concept of Components

Think of a component like a LEGO brick. Each section of the page is one brick. You can pick them up, rearrange them, or remove them without touching the others.

```
App.jsx
 ├── Navbar          ← top navigation bar
 ├── Hero            ← big banner section
 ├── ProductGrid     ← product cards section
 ├── WhyOMix         ← "Why Choose Us" section (bilingual, with stats bar)
 ├── VideoSection    ← The 0Mix Journey video (dark section)
 ├── Features        ← Natural Process / Natural Products / Biologically Safe cards
 ├── Blog            ← Our Blog section (3 article cards)
 ├── Testimonials    ← Customer reviews carousel
 └── Footer          ← bottom of the page
```

### App.jsx — the master controller

This file decides WHAT shows on the page and in WHAT ORDER.
If you want to remove a section — delete one line here.
If you want to reorder sections — move the lines around.

```jsx
// src/App.jsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
// ... etc

export default function App() {
  return (
    <>
      <Navbar />     {/* shows at top */}
      <main>
        <Hero />
        <ProductGrid />
        <WhyOMix />
        <VideoSection />
        <Features />
        <Blog />
        <Testimonials />
      </main>
      <Footer />     {/* shows at bottom */}
    </>
  )
}
```

### What is `export default`?

When a file has `export default function ComponentName()`, it means:
- This file creates a component
- Other files can import and use it

```jsx
// In Blog.jsx
export default function Blog() { ... }

// In App.jsx — you can now use it
import Blog from './components/Blog'
<Blog />
```

### What is `useState`?

`useState` lets a component remember something that can change.

Example in `Testimonials.jsx` — remembering which testimonial is active:
```jsx
const [active, setActive] = useState(0)
// active = current value (starts at 0)
// setActive = function to change it
```

When `setActive(2)` is called, React automatically re-renders the component showing testimonial #2.

---

## 5. Component-by-component guide

---

### `Logo.jsx`
**What it does:** Renders the 0Mix brand logo — an SVG wheat stalk inside a green circle, plus the wordmark "0Mix".

**Props (inputs):**
| Prop | Values | Default | Effect |
|------|--------|---------|--------|
| `size` | `'sm'`, `'md'`, `'lg'` | `'md'` | Controls how big the logo is |
| `dark` | `true`, `false` | `false` | Makes text white (for dark backgrounds) |

**Used in:** `Navbar.jsx`, `Footer.jsx`

**To change the logo colors** — edit these lines in `Logo.jsx`:
```jsx
<circle cx="20" cy="20" r="20" fill="#14532D" />   ← green background circle
<ellipse ... fill="#D97706" />                       ← amber grain color
```

---

### `Navbar.jsx`
**What it does:** Fixed navigation bar at the top of every page. Always has a solid background (never transparent). Turns slightly elevated when you scroll. Has a hamburger menu on mobile.

**Key behavior:**
- `scrolled` state: watches scroll position, adds shadow when past 10px
- `menuOpen` state: toggles the mobile drawer open/closed
- Clicking a nav link smoothly scrolls to that section on the page
- "Contact Us" button (green, with phone icon) on the right — scrolls to `#features`

**Nav links** — edit this array to add/remove/rename links:
```jsx
// Navbar.jsx — line 6
const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Products',    href: '#products' },
  { label: 'Why 0Mix',   href: '#why' },
  { label: 'Our Journey', href: '#about' },
  { label: 'Blog',        href: '#blog' },
]
```
The `href` must match the `id` of the section (e.g. `id="products"` in ProductGrid).

**Dark/light toggle** — the sun/moon pill button on the right side of the Navbar. Clicking it calls `toggleTheme()` which is passed down from `App.jsx`.

**No "Shop Now" button** — removed intentionally until backend is integrated.

---

### `Hero.jsx`
**What it does:** The large full-screen banner at the top of the site with headline, subtext, two CTA buttons, trust pills, social proof, and floating stat cards.

**Current headline:** "Delivering Purity & Health"
**Current subtext:** "From trusted farms to your healthy home. Experience the finest Natural products, carefully sourced and delivered fresh to your doorstep."

**Current buttons:**
- **Our Story** → scrolls to `#about` (VideoSection)
- **View Products** → scrolls to `#products` (ProductGrid)

**Trust pills** — the small tag labels below the buttons:
```jsx
// Hero.jsx
{['FSSAI Approved', 'No Preservatives', 'Farm Direct', '500+ Families'].map(...)}
```

**To change the hero image:**
```jsx
// Hero.jsx — the main image src
src="https://images.unsplash.com/photo-1574323347407..."
// Replace this URL with your own image URL or a local path like /img/hero.jpg
```

**Floating stat cards** — the "50+ Partner Farms" and "100% Purity" cards:
```jsx
<p className="font-display font-bold text-2xl ...">50+</p>   ← change number
<p ...>Partner Farms</p>                                       ← change label
```

> **Note:** The hero background in light mode uses a white-to-sand gradient (`bg-hero-light`). In dark mode this gradient is cleared with `dark:bg-none` and replaced with a solid dark background (`dark:bg-night`). This was a critical bug fix — without `dark:bg-none`, the gradient would still show in dark mode even though the background-color was dark.

---

### `ProductGrid.jsx`
**What it does:** Section header + grid of product cards. Reads the `products` array from `src/data/products.js` and renders one `ProductCard` for each item.

**To change the section title:**
```jsx
// ProductGrid.jsx
<h2 ...>
  Our wheat,{' '}
  <span className="text-forest italic">your choice of pack</span>
</h2>
```

**To change the info strip** (free delivery text etc.):
```jsx
{['Free delivery above ₹499', 'Freshly milled to order', 'Secure payment'].map(...)}
```

---

### `ProductCard.jsx`
**What it does:** Renders a single product — image, badge, name, description, star rating, **2kg / 5kg / 10kg size selector**, and price with discount.

**No "Add to Cart" button** — removed until backend is ready.

**Size selector behavior:**
- `sel` state (0, 1, or 2) tracks which size is picked
- Price and discount percentage update automatically when a different size is clicked

**Data comes from** `src/data/products.js` — see Section 6 to edit products.

---

### `WhyOMix.jsx`
**What it does:** "Why Choose Us" section with 4 image cards (bilingual English + Nepali content) and a dark green stats bar at the bottom.

**Cards:** Our Mission, Handpicked Harvests, Preserving Nature, Fresh Delivery.

Each card has:
- An Unsplash photo
- Numbered amber badge (01, 02, 03, 04)
- English title + description
- Amber divider line
- Italic Nepali translation text
- Colored tag pills

**To edit a card** — change the `cards` array at the top of `WhyOMix.jsx`:
```jsx
const cards = [
  {
    number: '01',
    title: 'Our Mission',
    nepali: 'हाम्रो प्रतिबद्धता सरल छ...',  ← Nepali text
    body: 'At our core, we are driven...',     ← English description
    tags: ['100% Fresh and Healthy', ...],
    image: 'https://images.unsplash.com/...',
    icon: '🌾',
  },
  // ...
]
```

**Stats bar** — edit these four numbers directly in `WhyOMix.jsx`:
```jsx
{ value: '500+', label: 'Happy Families' },
{ value: '50+',  label: 'Partner Farms' },
{ value: '24h',  label: 'Milled to Order' },
{ value: '100%', label: 'Chemical Free' },
```

---

### `VideoSection.jsx`
**What it does:** Dark section with a large video player (always dark, in both light and dark mode). Currently shows a wheat-field poster image with a play button overlay. Clicking play tries to play the `<video>` element.

**To add your actual video:**
```jsx
// VideoSection.jsx — find this line
<video ref={videoRef} src="" ...

// Replace src="" with your video path or URL:
<video ref={videoRef} src="/videos/omix-journey.mp4" ...
// OR
<video ref={videoRef} src="https://your-cdn.com/video.mp4" ...
```

**To change the poster image** (shown before video plays):
```jsx
poster="https://images.unsplash.com/photo-1500382017468..."
// Replace with your own thumbnail image URL or local path
```

---

### `Features.jsx`
**What it does:** Three feature cards explaining what makes 0Mix products special — Natural Process, Natural Products, and Biologically Safe. Each card has a photo, icon badge, accent bar, title, subtitle badge, description, and a "Verified" footer strip.

**To edit a feature card** — change the `features` array at the top of `Features.jsx`:
```jsx
const features = [
  {
    icon: '⚙️',
    image: 'https://images.unsplash.com/...',
    title: 'Natural Process',
    subtitle: 'Minimal Processing, Maximum Nutrition',
    body: 'Our products go through minimal processing...',
    accent: 'forest',   // 'forest' = green accent, 'amber' = gold accent
  },
  // ...
]
```

---

### `Blog.jsx`
**What it does:** Three blog post cards with image, category badge, title, excerpt, author, read time, and a "Read" link. Section heading: "Our Latest Blogs".

**To edit blog posts** — find the `posts` array inside `Blog.jsx`:
```jsx
const posts = [
  {
    id: 1,
    category: 'Health',                      // badge label (must match catStyle below)
    title: 'Why Stone-Milled Flour...',       // article title
    excerpt: 'Modern roller mills strip...',  // short description
    image: 'https://images.unsplash.com/...', // card image URL
    author: 'Team 0Mix',
    readTime: '4 min read',
    date: 'Jul 14, 2025',
  },
  // add more objects here for more posts
]
```

**To add a new blog category with its own color** — add a key to `catStyle`:
```jsx
const catStyle = {
  Health:         'text-forest dark:text-forest-muted bg-forest/8 ...',
  Farming:        'text-amber-dark dark:text-amber-light bg-amber/10 ...',
  'Kitchen Tips': 'text-amber dark:text-amber-light bg-amber/8 ...',
  // Add yours:
  Recipes:        'text-forest dark:text-forest-muted bg-forest/8 dark:bg-forest/15 border-forest/20',
}
```
Always include both light and `dark:` variants so the badge is readable in both modes.

---

### `Testimonials.jsx`
**What it does:** Auto-cycling customer review carousel. Shows a large quote card on the left and a clickable list of reviewers on the right. Auto-advances every 5.5 seconds.

**To edit testimonials** — go to `src/data/products.js` and edit the `testimonials` array:
```js
export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Kathmandu',
    rating: 5,                              // 1-5 stars
    quote: 'The chakki atta from 0Mix...',  // the review text
    avatar: 'https://...',                  // customer photo URL
  },
  // add more...
]
```

---

### `Footer.jsx`
**What it does:** Bottom section of the page. 4 columns: Brand info + socials, Navigation links, Support links, Contact details. Always dark (uses `bg-ink` in light mode, `dark:bg-night-card` in dark mode).

**To update contact info:**
```jsx
// Footer.jsx — find these lines
<li>Rangeli-6, Morang, Nepal</li>
<a href="tel:+977-0000000000">+977 XXX-XXXXXXX</a>
<a href="mailto:hello@0mix.com">hello@0mix.com</a>
```

**To update social media links:**
```jsx
// Footer.jsx — find the socials array
{ icon: <Facebook size={14} />, label: 'Facebook' },
// Add href="#" → replace with your real URL e.g. href="https://facebook.com/0mix"
```

---

## 6. Data file — where all content lives

**File:** `src/data/products.js`

All text content that repeats across the site is stored here — products, testimonials, USPs, and process steps. This way you only need to edit one file when content changes.

### Products

```js
export const products = [
  {
    id: 1,                           // unique number — don't repeat
    name: 'Whole Wheat Grains',      // product title
    subtitle: 'Unprocessed & Stone-Cleaned',
    description: 'Raw whole wheat grains...', // short description on card
    image: 'https://images.unsplash.com/...', // product image URL
    badge: 'Best Seller',            // badge on card (or null for no badge)
    sizes: [
      { label: '2 kg',  price: 140, originalPrice: 170 },
      { label: '5 kg',  price: 320, originalPrice: 400 },
      { label: '10 kg', price: 590, originalPrice: 750 },
    ],
    rating: 4.9,    // shown as stars
    reviews: 214,   // shown as (214)
  },
  // add more products by copying this block
]
```

**To add a new product:** Copy one object from `{` to `}`, paste after the last one (with a comma before it), change the values.

**To add a new size option** (e.g. 25 kg):
```js
sizes: [
  { label: '2 kg',  price: 140, originalPrice: 170 },
  { label: '5 kg',  price: 320, originalPrice: 400 },
  { label: '10 kg', price: 590, originalPrice: 750 },
  { label: '25 kg', price: 1300, originalPrice: 1600 }, // ← add here
],
```
The size buttons on the card will automatically update.

---

## 7. How to make common changes

### Change any text on the page
1. Find the component file that contains that section (see Section 5)
2. Edit the text between the JSX tags
3. Save — browser auto-refreshes

### Change a color
Colors are defined in `tailwind.config.js`:
```js
colors: {
  forest: { DEFAULT: '#14532D', dark: '#0F3D22', ... },  // deep bold green
  amber:  { DEFAULT: '#D97706', dark: '#B45309', ... },  // vivid amber/gold
  ink:    { DEFAULT: '#0C0B09', ... },                   // near-black text
  linen:  '#FFFFFF',                                     // page background (white)
  sand:   { DEFAULT: '#F5F0E8', dark: '#EDE7DB' },       // warm section alt
  snow:   '#F4F0E8',                                     // warm white (dark mode text)
  night:  { DEFAULT: '#0C0B09', card: '#181612', ... },  // dark mode backgrounds
}
```
Change the hex value and save. The change applies across the entire site.

### Add a new section
1. Create a new file in `src/components/`, e.g. `ContactForm.jsx`
2. Write your component (copy the structure from any existing one)
3. Import it in `App.jsx` and add `<ContactForm />` where you want it
4. Always add both light and `dark:` class variants so it works in dark mode

### Remove a section
In `App.jsx`, delete or comment out the component line:
```jsx
// <WhyOMix />   ← commented out = hidden
<VideoSection />
```

### Change a product image to a real photo
Put your image in the `img/` folder, then in `products.js`:
```js
image: '/img/your-photo.jpg',   // local file
// OR
image: 'https://your-cdn.com/photo.jpg',  // online URL
```

### Add your real video
In `VideoSection.jsx`, find:
```jsx
<video ref={videoRef} src="" ...
```
Change `src=""` to:
```jsx
src="/img/omix-video.mp4"         // if stored locally in img/ folder
// OR
src="https://your-cdn.com/v.mp4"  // if hosted online
```

---

## 8. Dark mode system

The site supports full dark/light mode with a toggle switch (sun/moon pill) in the top-right corner of the navbar.

### How it works (step by step)

1. **Tailwind is configured** with `darkMode: 'class'` in `tailwind.config.js`. This means dark mode activates when the `<html>` element has the class `dark` on it.

2. **`src/hooks/useTheme.js`** is a custom hook that:
   - On first load, checks if the user previously chose a theme (saved in `localStorage` under key `'omix-theme'`)
   - If no preference is saved, checks the system setting (if your phone/laptop is in dark mode, the site starts dark)
   - Adds or removes the `dark` class on `<html>` whenever the user toggles
   - Saves the preference to `localStorage` so it persists after page refresh

3. **`App.jsx`** calls `useTheme()` and passes `dark` and `toggle` down to `<Navbar />`

4. **`Navbar.jsx`** has the toggle switch UI (sun/moon pill button). Clicking it calls `toggle()`.

5. **Every component** uses Tailwind `dark:` prefix classes like:
   ```jsx
   <div className="bg-white dark:bg-night-card">
   <p className="text-ink dark:text-snow">
   ```
   These only activate when `dark` class is on `<html>`.

### Important — background-image vs background-color

Tailwind has two separate CSS properties:
- `bg-color` → sets `background-color`
- `bg-gradient` → sets `background-image`

If a section uses a gradient background (like `bg-hero-light` in Hero), you must **also** add `dark:bg-none` in dark mode. Without it, the gradient image stays visible even though the background-color switches — making the section look light in dark mode.

```jsx
// Correct — clears the gradient in dark mode:
className="bg-hero-light dark:bg-none dark:bg-night"

// Wrong — gradient stays visible in dark mode:
className="bg-hero-light dark:bg-night"
```

### Dark mode color palette

| Element | Light mode | Dark mode |
|---------|-----------|-----------|
| Page background | `linen` = `#FFFFFF` | `night` = `#0C0B09` |
| Section alt background | `sand` = `#F5F0E8` | `night-section` = `#131109` |
| Cards | `white` = `#FFFFFF` | `night-card` = `#181612` |
| Body text | `ink` = `#0C0B09` | `snow` = `#F4F0E8` |
| Muted text | `ink/45` | `snow/40` |
| Borders | `ink/6` to `ink/15` | `white/6` to `white/10` |
| Accent colors | unchanged | unchanged (amber and forest stay the same) |

### To add dark mode to a new component you create

Add `dark:` prefix to every class that should change in dark mode:
```jsx
// Light only (text will vanish in dark mode!):
<div className="bg-white text-ink border border-ink/8">

// Correct — works in both modes:
<div className="bg-white dark:bg-night-card text-ink dark:text-snow border border-ink/8 dark:border-white/8">
```

Rule of thumb:
- Every `bg-white` → add `dark:bg-night-card`
- Every `bg-linen` → add `dark:bg-night`
- Every `bg-sand` → add `dark:bg-night-section`
- Every `text-ink` → add `dark:text-snow`
- Every `border-ink/N` → add `dark:border-white/N`

---

## 9. Color & font system

### Colors used across the site

| Name | Hex | Used for |
|------|-----|----------|
| `forest` | `#14532D` | Primary buttons, heading accents, active size selector, stats bar |
| `amber` | `#D97706` | Star ratings, secondary accents, price badges, amber glow |
| `ink` | `#0C0B09` | Body text and headings in light mode (near-black) |
| `linen` | `#FFFFFF` | Page background in light mode |
| `mint` | `#eaf6ee` | Light green section background (WhyOMix, Testimonials) — light mode only |
| `sand` | `#F5F0E8` | Warm beige section background (Products, Features, Blog) — light mode only |
| `snow` | `#F4F0E8` | Body text and headings in dark mode (warm white) |
| `night` | `#0C0B09` | Page background in dark mode |
| `night-card` | `#181612` | Card surfaces in dark mode |
| `night-section` | `#131109` | Alternate section background in dark mode |

### Fonts

| Font | Style | Used for |
|------|-------|----------|
| **Fraunces** | Bold italic serif | ALL headings (`h1`, `h2`, `h3`), product names, quotes, logo wordmark |
| **Plus Jakarta Sans** | Clean geometric sans-serif | Body text, labels, buttons, nav links, badges |

Both fonts are loaded from Google Fonts in `index.html`. No extra setup needed.

**Why Fraunces?** It is a display serif with optical sizing and a natural italic — gives the site a premium, editorial look while staying highly legible in bold weights.

### How Tailwind class names work

Instead of writing CSS like:
```css
.button { background-color: #14532D; color: white; border-radius: 8px; }
```

With Tailwind you write class names directly:
```jsx
<button className="bg-forest text-white rounded-lg">Click</button>
```

Common patterns you'll see in this project:
- `text-forest` = deep green text
- `text-amber` = gold/amber text
- `bg-linen` = white page background
- `py-20 lg:py-28` = padding top/bottom (larger on big screens)
- `px-5` = padding left and right
- `md:grid-cols-3` = 3 columns on medium screens and above
- `dark:bg-night-card` = dark card background in dark mode
- `dark:text-snow` = warm white text in dark mode
- `hover:text-amber` = text turns amber on hover
- `transition-colors duration-300` = smooth color transition

---

## 10. Change history

| Date | Change |
|------|--------|
| **Initial build** | Converted entire site from plain HTML/CSS/JS to React + Vite + Tailwind. Created 12 components. |
| **Visual redesign v1** | Applied Earthy & Premium color palette (forest green, warm gold). Switched fonts. Reduced section padding for less bulk. |
| **Feedback round 1** | New SVG wheat Logo component. Removed cart system entirely (frontend-only, no backend). Products restructured to 2kg / 5kg / 10kg weight packs with size selector on card. |
| **Feedback round 2** | Removed: TrustBar (badges strip), HowItWorks (Farm to Table timeline), Newsletter (10% off form). Products title centered and enlarged. Added Blog section after VideoSection. |
| **Feedback round 3** | Removed all "Shop Now" and "Add to Cart" buttons. Hero CTAs changed to "Our Story" + "View Products". Mobile sticky bottom bar removed. Nav links updated to include Blog and Our Journey. |
| **Feedback round 4** | Added full dark/light mode toggle. New file `src/hooks/useTheme.js`. Toggle pill button (Sun/Moon) in top-right Navbar. Preference saved to localStorage and respects system dark mode. Dark `dark:` classes added to every component. |
| **Design overhaul** | Complete font and color system redesign. Fonts changed to **Fraunces** (headings) + **Plus Jakarta Sans** (body). Color palette updated: forest `#14532D`, amber `#D97706`, ink `#0C0B09`, linen `#FFFFFF`, snow `#F4F0E8`, night `#0C0B09`. Navbar made always-visible (no longer transparent). "Contact Us" button added. |
| **Content update** | New hero heading: "Delivering Purity & Health". WhyOMix section rewritten with 4 image cards (bilingual English + Nepali). New Features section added (Natural Process, Natural Products, Biologically Safe). All section headings use `clamp()` fluid sizing. |
| **Light green accents** | Added `mint` color (`#eaf6ee`) to palette. Hero gradient updated to fade white→mint instead of white→sand. WhyOMix and Testimonials sections switched from plain white to mint background. Extra green blob accent added to Hero. Blog section title changed to "Our Latest Blogs". |
| **Footer redesign** | Full redesign with deep forest-green gradient background (`#062212` → `#14532D`). Added top CTA strip ("Pure Wheat, Right at Your Door" + View Products button). Column headers styled in amber with decorative amber line. Nav/Support links have animated amber underline slide-in on hover. Contact items wrapped in icon tiles that turn amber on hover. Social icons turn amber on hover. Large faded wheat watermark in background. Decorative glow blobs. Dark mode uses deep dark-green tones. |
| **Hero redesign** | Full premium upgrade. Background: subtle green dot-grid SVG watermark + 4 blob accents (amber top, forest bottom, mint centre, small forest top-left). Label decorated with gradient lines + dots. "Purity" word gets a curved amber SVG underline. Our Story button upgraded to gradient+glow+shimmer. Trust pills now frosted glass with icons. Social proof moved into a frosted glass card with divider. Image wrapped in 3 decorative gradient rings. Inset image has forest gradient overlay. New floating FSSAI Certified badge (top-left, animated). Partner Farms card has gradient icon background. Purity Guarantee card upgraded to gradient bg with glow shadow and amber "Chemical Free" label. Scroll hint shows "Explore" text on hover. |
| **Navbar redesign** | Added 2.5px gradient top accent bar (forest→amber→forest) on both desktop header and mobile drawer. Contact Us button upgraded: gradient bg, strong green glow shadow (`0_0_18px_rgba(20,83,45,0.45)`), shimmer sweep animation on hover, pulsing amber dot indicator, border highlight. Nav links now highlight with soft green background on hover and gradient (forest→amber) underline slide-in. Vertical divider added between links and right-side buttons. Hamburger button turns forest green on hover. Mobile drawer gets leaf decoration tagline and forest green active link highlight. |
| **Wave dividers — full site** | Added SVG wave curves at every section boundary for smooth visual flow: Hero→ProductGrid (mint wave into sand), ProductGrid→WhyOMix (sand wave into mint), WhyOMix→VideoSection (mint wave into dark green), VideoSection→Features (dark forest+amber double wave into sand — most dramatic), Features→Blog (sand wave into linen/white), Blog→Testimonials (linen wave into mint), Testimonials→Footer (mint wave into deep green). All waves use double-layer SVG paths for depth. |
| **Production performance** | Added `public/.htaccess` for BigRock/cPanel Apache: gzip compression, 1-year cache headers for hashed assets, HTTPS redirect, security headers. Updated `vite.config.js`: manual chunk splitting (react, framer-motion, lucide-react as separate cached files). Updated `index.html`: added preload for hero image, preconnect for Unsplash CDN, OG meta tags, apple-touch-icon, trimmed font weights. Favicon compressed from 1.4 MB → 8.5 KB. Total gzipped page weight: ~111 KB. |
| **Blog section divider** | Blog background changed from `bg-sand` to `bg-linen dark:bg-night` (white) so it is visually distinct from the Features section above it. Added sand→white wave at top. Added ornamental divider inside the section: full-width gradient lines meeting a centered pill badge ("🌾 Fresh from Our Fields ✍️" in forest green). Testimonials wave fill updated to match new Blog background (`fill-linen dark:fill-night`). |
| **Dark mode comprehensive fix** | Fixed Hero section — `bg-hero-light` is a background-image gradient that was staying visible in dark mode even after `dark:bg-night` was set. Fixed by adding `dark:bg-none` to clear the gradient. Fixed Blog category badges (`bg-white/90` → added `dark:bg-night-card/90`). Fixed ProductCard "Pure & Natural" badge (added `dark:bg-night-card/80`). Added `dark:` text color variants to Blog category styles for better legibility. |

---

*Last updated: July 2025*
