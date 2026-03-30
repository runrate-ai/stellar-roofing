# Project Handoff: Stellar Roofing

This document summarizes the changes made to the Stellar Roofing project and provides instructions for the next steps.

## Modified & Created Files
- `components/Navbar.jsx` (Modified)
- `components/Footer.jsx` (Modified)
- `components/GHLForm.jsx` (Modified)
- `components/AnimationProvider.jsx` (Created)
- `components/ReviewWidget.jsx` (Created)
- `app/globals.css` (Modified)
- `app/layout.js` (Modified)
- `app/page.js` (Modified)
- `app/about/page.js` (Modified)

## Implementation Details

### 1. Navbar Transition (Transparent to Solid)
- **Mechanism**: Used a `useEffect` hook in `components/Navbar.jsx` to monitor `window.scrollY`.
- **State**: A `scrolled` state is toggled when the user scrolls past 20px.
- **Styling**: 
  - The header uses `fixed` positioning with a high z-index (`z-[100]`) to stay above all content.
  - Transition classes (`transition-all duration-500 ease-in-out`) handle the switch between `bg-transparent` and `bg-primary/95 backdrop-blur-md shadow-lg`.
  - The logo is treated with `brightness-0 invert` to ensure it remains visible as a white asset on both the transparent hero and the dark primary background.

### 2. GHL (GoHighLevel) Form
- **Logic**: Built a robust wrapper in `components/GHLForm.jsx` that supports different form types (quote, contact).
- **UX**: 
  - Added a `loading` state that displays a CSS spinner and a "Loading secure form..." message until the iframe is ready.
  - Implemented a "Form Coming Soon" fallback: if no valid `formId` is provided in `config.js`, it shows a clean call-to-action button and phone number rather than a broken embed.
- **Embed**: Uses the standard `https://link.msgsndr.com/widget/form/` URL structure.

### 3. Google Business Profile Map
- **Source**: Integrated the official embed code for "Stellar Roofing & Restorations" Nashville, TN.
- **Location**: Placed inside `components/Footer.jsx` as a responsive `iframe` with a `rounded-xl` border to match the site's modern aesthetic.

### 4. Scroll Animations
- **Provider**: Created `components/AnimationProvider.jsx` which uses `IntersectionObserver` to detect when elements with the `.reveal` class enter the viewport.
- **Styles**: Defined the `@layer utilities` in `app/globals.css` for `.reveal` and `.animate-in` (fade-up effect).

## What Isn't Working / Pending
- **GHL IDs**: The `lib/config.js` file still contains placeholder strings (`REPLACE_WITH_GHL_FORM_ID`). Actual GoHighLevel Form and Review Widget IDs must be added to enable live data.
- **Mobile Menu**: While functional, the mobile menu could benefit from more refined transition animations when opening/closing.
- **Review Widget**: The `ReviewWidget.jsx` is implemented but will remain hidden until a valid `reviewWidgetId` is provided in the config.
- **Form Submission**: Since the IDs are placeholders, form submissions currently can't be tested.

## Build Status
- `npm run build` was executed and passed successfully. All routes are staticly generated and lint-free.
