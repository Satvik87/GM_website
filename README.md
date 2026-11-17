# GRAY Mobility | Corporate Website Prototype

**Project:** GRAY Mobility Corporate Website  
**Version:** V15  
**Status:** Website Prototype  
**Repository:** GraySoftwares / GM_Website

---

## 1. Project Overview

A responsive, locally runnable corporate automotive website prototype developed using the GRAY Mobility website brief and supplied vehicle and chassis imagery.

The website presents GRAY Mobility's electric commercial mobility vision, vehicle applications, chassis platform, and technology architecture through a modern automotive-industry design.

## 2. Technology Stack

- HTML5 – Page structure and content
- CSS3 – Responsive styling, layouts, transitions and animations
- JavaScript – Navigation, vehicle selection and interactive elements
- Python HTTP Server – Local development and preview

## 3. Project Structure

```text
GM_Website/
│
├── assets/       # Company logo and vehicle/chassis imagery
├── index.html    # Main website structure
├── styles.css    # Responsive styling and visual design
├── script.js     # Interactive functionality
├── README.md     # Project documentation
└── .gitignore    # Git exclusion rules
```

## 4. Running the Website Locally

**Prerequisites:**
- Python installed on the system
- Visual Studio Code or any suitable code editor
- Modern web browser

**Instructions:**

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Open the integrated terminal.
4. Execute:

```bash
py -m http.server 5500
```

5. Open the following address in your browser:

http://localhost:5500

## 5. Design Direction

The website follows a realistic automotive-industry visual direction:

- Light neutral surfaces.
- Charcoal and navy typography.
- Restrained blue accents.
- Supplied vehicle and chassis imagery.
- Clean section layouts.
- Responsive desktop and mobile experiences.
- Subtle transitions and animations.
- Adaptive navigation contrast across light and dark sections.

The design uses an original GRAY Mobility layout, taking high-level inspiration from product-led automotive storytelling without using Rivian branding or assets.

## 6. Important Prototype Limitations

The following points must be considered before public launch:

- The contact email is a demonstration placeholder and must be replaced with an approved company enquiry address.
- The vehicle-to-chassis transformation is a layered image transition, not a mechanically accurate 3D assembly. A CAD/3D model is required for a more realistic implementation.
- Vehicle images are supplied concept imagery and must not be treated as homologated production vehicles or validated configurations.
- No approved battery, range, motor, payload, charging, dimensions, GVW, safety, homologation or performance specifications were supplied.
- Any published specifications must be company-approved and clearly identified as validated, prototype or target values, including relevant test conditions.
- Software, OTA, diagnostics, ADAS and fleet functions represent areas of technology architecture, not confirmed production features.
- Contact form/backend integration, CMS, analytics, legal and privacy pages, SEO and production QA require company-approved implementation.

## 7. Development History

### V5 – Initial Design Refinements
- Updated hero headline to "Built to Think. Driven by Outcomes."
- Integrated the supplied GRAY company logo into header and footer.
- Repositioned hero vehicle imagery.
- Refined chassis image sizing and shuttle image presentation.

### V6 – Logo and Contrast
- Rebuilt the transparent logo from supplied artwork.
- Improved header/footer logo visibility.
- Enhanced hero headline contrast.

### V7 – Chassis Image Update
- Replaced the skateboard chassis photograph with the newly supplied workshop chassis image.
- Improved image sizing and spacing.

### V8 – Vehicle Application Selector
- Centred four vehicle application selector tabs.
- Improved transformation frame layout.
- Refined image proportions and mobile responsiveness.
- Updated vehicle configurations and application names.
- Replaced the staff van image with a high-resolution supplied photograph.

### V11 – Platform and Hero Refinements
- Updated hero eyebrow to ELECTRIC COMMERCIAL MOBILITY.
- Added a matching decorative line.
- Replaced the platform chassis image with the supplied icy-studio image.
- Improved proportional image display and spacing.

### V13 – Navigation and Vehicle Images
- Simplified header vehicle selector labels to Staff and School.
- Updated School Van and Cargo Van imagery.
- Preserved existing styling, navigation and animations.

### V14 – Sticky Navigation
- Implemented fixed navigation during scrolling.
- Added a translucent background and subtle blur on scroll.
- Preserved initial header appearance.
- Improved mobile menu backdrop readability.

### V15 – Adaptive Navigation Contrast
- Implemented adaptive navigation contrast based on the underlying page section.
- White logo and navigation are retained on dark sections.
- Dark navy logo and navigation switch on light sections.
- Preserved the V14 layout, content and functionality.

---

## 8. Project Status

V15 is the latest website prototype and the current development baseline.

Further development, production integrations, approved company content and final deployment should be carried out following company review and approval.

**© GRAY Mobility | Internal Project**