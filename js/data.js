/*
 * Portfolio content — edit this file to update the site.
 *
 * Links: set `repo` / `demo` to a real URL to show the matching button.
 * Leave them as null and the button is simply not rendered.
 * Images: set `image` to a path such as "assets/projects/taskflow.webp"
 * to replace the schematic cover with a real screenshot. `screenshots`
 * takes a list of { src, alt } shown in the details panel.
 * Video: set `video: { src: "assets/video/name.mp4", poster: "assets/video/name.jpg" }`
 * to add a "Watch demo" button and a player in the details panel.
 */
window.PORTFOLIO = {
  profile: {
    name: "Meesam Abbas",
    role: "Frontend / MERN Stack Developer",
    email: "mesam.jafery@gmail.com",
    location: "Lahore, Pakistan",
    github: "https://github.com/mesamjafery-hue",
    linkedin: "https://www.linkedin.com/in/syed-meesam-abbas-a200b33a5/",
    site: "https://mesamjafery-hue.github.io/portfolio-site/",
    // Path to the downloadable CV. Replace the file with your own PDF any time.
    cv: "assets/Meesam-Abbas-CV.pdf",
  },

  // Shown as the "Core stack" logo row under the hero.
  coreStack: ["React", "Next.js", "JavaScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "Redux"],

  projects: [
    {
      id: "taskflow",
      title: "Taskflow",
      subtitle: "Task management application",
      kind: "Full-stack app",
      featured: true,
      cover: "board",
      summary:
        "A task management platform that helps teams organise work, assign responsibilities and track project progress in one place.",
      problem:
        "Small teams often track work across chat threads and spreadsheets, so ownership, priorities and deadlines get lost.",
      solution:
        "A single workspace where every task has an owner, a status, a priority and a due date, with a dashboard that shows where the project stands.",
      features: [
        "Authentication and user management",
        "Create, edit and delete tasks",
        "Task status and priority management",
        "Dashboard with task statistics",
        "Calendar view and due-date tracking",
        "Team management with role-based permissions",
        "Responsive interface for desktop and mobile",
      ],
      tech: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      contribution:
        "Designed and built the application end to end: the React interface, the Express REST API and the MongoDB data model.",
      implementation: [
        "Role-based permissions that decide who can view, edit or reassign a task",
        "Dashboard statistics derived from live task data so counts stay in step with changes",
        "Due-date handling shared between the list, calendar and dashboard views",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
    {
      id: "nodaly",
      title: "Nodaly",
      subtitle: "Practice-management dashboard for therapists",
      kind: "Full-stack app",
      featured: true,
      cover: "flow",
      coverLabel: "Nodaly: dashboard",
      flow: ["React UI", "Express API", "Stripe", "MongoDB"],
      summary:
        "A workspace for therapists and clinical supervisors: client records, intake requests, session notes, treatment plans, standardised assessments, risk tracking and supervision hours, with Stripe subscriptions and admin approval of new accounts.",
      problem:
        "Therapists, especially trainees and interns, keep clients, session notes, treatment plans, assessment scores and supervision hours in separate tools, which makes supervision and compliance hard to manage.",
      solution:
        "One React dashboard backed by a layered Express API over MongoDB, where every clinical record is scoped to the signed-in therapist and access is gated by role, HIPAA agreement and account approval.",
      features: [
        "Client records with status, risk level and discharge workflow",
        "PHQ-9 and GAD-7 assessments with safety flagging",
        "Stripe subscription plans with webhook-driven billing",
        "Public intake form and client request approval",
        "Session notes, and treatment plans with renewals",
        "Supervision hours with supervisor verification and notes",
        "Wellness tools library that can be assigned to clients",
        "JWT auth with refresh tokens; therapist, supervisor and admin roles",
        "Admin approval of new accounts and HIPAA agreement before clinical data unlocks",
      ],
      tech: ["React", "React Router", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MongoDB", "Mongoose", "Joi", "JWT", "Stripe"],
      contribution:
        "Built the React dashboard and the Express REST API behind it: data models, request validation, authentication and roles, and the Stripe billing integration.",
      implementation: [
        "Layered backend: router → controller → implementation → queries → model, with a shared CRUD base class and per-resource hooks",
        "Middleware chain that checks the access token, HIPAA agreement and admin approval before any clinical route",
        "Idempotent Stripe webhook handling that records each processed event",
        "Joi validation that returns readable, field-level error messages to the UI",
        "Rate limiting on sensitive routes",
      ],
      repo: null,
      demo: null,
      video: {
        src: "assets/video/nodaly-demo.mp4",
        poster: "assets/video/nodaly-demo-poster.jpg",
        caption: "4-minute walkthrough: adding a client, risk updates, a full client profile, a scored PHQ-9, accepting an intake request, discharge, treatment plans, SOAP notes, exercise assignment and supervision hours. Client names are fictional demo data.",
      },
      image: "assets/projects/nodaly-dashboard.webp",
      screenshots: [],
    },
    {
      id: "medcare",
      title: "AL MedCare",
      subtitle: "Seamless medicine and consultation system (final year project)",
      kind: "Final year project",
      period: "Feb 2025 – Dec 2025",
      featured: false,
      cover: "care",
      summary:
        "An academic healthcare platform for appointment scheduling, doctor consultations and patient record access, with separate patient and doctor modules, AI-assisted prescription verification, medicine ordering and delivery tracking.",
      problem:
        "Getting from a consultation to medicine at the door usually means several separate services, with no check that a prescription has been read correctly, and booking appointments is often slow.",
      solution:
        "One platform that links appointment booking, the consultation, a prescription check, the medicine order and its delivery status, with dedicated patient and doctor modules.",
      features: [
        "Appointment scheduling and booking workflows",
        "Separate patient and doctor modules",
        "Patient record access",
        "Doctor consultations",
        "AI-assisted prescription verification",
        "Medicine ordering and delivery tracking",
        "Responsive, accessible interfaces",
      ],
      tech: ["HTML", "CSS", "JavaScript", "React Native"],
      contribution:
        "Developed as the final year project for the BS Software Engineering degree at UMT: patient and doctor modules, booking workflows and responsive, accessible interfaces.",
      implementation: [
        "Connecting the stages (book, consult, verify, order, deliver) into one user journey",
        "Structured record organisation so patients and doctors see the right information",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
    {
      id: "adminpro",
      title: "AdminPro",
      subtitle: "Product management dashboard",
      kind: "Frontend app",
      period: "Mar 2026 – Apr 2026",
      featured: false,
      cover: "crud",
      summary:
        "A single-page administrative dashboard for managing product inventories and catalogue records, with full CRUD, advanced search and filtering.",
      problem:
        "Teams managing a product catalogue need a quick way to add, update and find products without digging through spreadsheets.",
      solution:
        "A responsive single-page dashboard with create, read, update and delete operations and fast search and filters over the catalogue.",
      features: [
        "Complete CRUD for products",
        "Advanced search and filtering",
        "Inventory and catalogue records",
        "Responsive interface design",
      ],
      tech: ["React", "JavaScript", "Bootstrap", "HTML", "CSS"],
      contribution: "Built the dashboard: CRUD flows, search and filtering, and the responsive interface.",
      implementation: [
        "Search and filters that work together over the same product list",
        "Streamlined front-end architecture for a fast single-page experience",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
    {
      id: "sveston",
      title: "Sveston Watches",
      subtitle: "E-commerce frontend store",
      kind: "Frontend app",
      period: "Jan 2026 – Feb 2026",
      featured: false,
      cover: "store",
      summary:
        "A responsive e-commerce storefront for a watch brand with product listings, category navigation, shopping cart, wishlist and checkout interface.",
      problem:
        "Shoppers need to browse a catalogue comfortably on any device and move from browsing to checkout without friction.",
      solution:
        "A mobile-friendly storefront with clear category navigation, a cart and wishlist, and checkout interface components focused on usability and accessibility.",
      features: [
        "Product listings and category navigation",
        "Shopping cart functionality",
        "Wishlist management",
        "Checkout interface components",
        "Mobile-friendly, accessible layouts",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      contribution: "Built the storefront front end: listings, navigation, cart, wishlist and checkout screens.",
      implementation: [
        "Cart and wishlist state kept in step across pages",
        "Mobile-first layouts using the Bootstrap grid",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
    {
      id: "trustsphere",
      title: "TrustSphere",
      subtitle: "Charity operations dashboard",
      kind: "Frontend app",
      featured: false,
      cover: "modules",
      summary:
        "A responsive React application for running a charity: donations, beneficiaries, events and volunteers, with search and settings.",
      problem:
        "Charity teams juggle donations, beneficiaries, events and volunteers in separate lists that are hard to search.",
      solution:
        "A single dashboard with a page per area, shared state through the Context API and data kept in the browser with local storage.",
      features: [
        "Dashboard overview",
        "Donations management",
        "Beneficiaries, events and volunteers",
        "Search across records",
        "Settings",
        "Context-based state management",
        "Local storage persistence",
      ],
      tech: ["React", "React Router", "Context API", "Tailwind CSS", "Bootstrap"],
      contribution:
        "Built the React application, routing, shared state and the persistence layer.",
      implementation: [
        "Context API providers shared by every module instead of prop drilling",
        "Local storage persistence so data survives a page reload without a backend",
        "Client-side routing between modules with React Router",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
    {
      id: "airport-booking",
      title: "Airport Booking Portal",
      subtitle: "Flights, bookings and users",
      kind: "Backend + database",
      featured: false,
      cover: "flights",
      summary:
        "A booking application for managing flights, users, bookings, messages and activity, built on a Node.js API with MongoDB.",
      problem:
        "Flight, passenger and booking records need to stay consistent as bookings are created and changed.",
      solution:
        "An Express API over MongoDB collections for users, flights, bookings and messages, with an activity record of what changed.",
      features: [
        "User management",
        "Flight management",
        "Booking functionality",
        "Messages and activity management",
        "MongoDB database integration",
      ],
      tech: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
      contribution: "Built the API, data models and booking logic.",
      implementation: [
        "Modelling relationships between users, flights and bookings in MongoDB",
        "Recording activity alongside booking changes",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
    {
      id: "devflow-crm",
      title: "DevFlow CRM",
      subtitle: "Relational database design for a CRM",
      kind: "Database design",
      featured: false,
      cover: "schema",
      summary:
        "A PostgreSQL schema for a CRM that runs a software business, from first lead to invoice and support ticket.",
      problem:
        "A services business needs one source of truth for leads, deals, clients, projects, billing and support.",
      solution:
        "A normalised relational schema with eleven modules linked by foreign keys, plus audit logs that record who changed what.",
      features: [
        "Users and roles",
        "Companies, leads, deals and clients",
        "Projects, tasks and requirements",
        "Invoices and support tickets",
        "Audit logs",
      ],
      tech: ["PostgreSQL", "SQL"],
      contribution: "Designed the schema, relationships and SQL for all modules.",
      implementation: [
        "Following a lead through deal, client, project and invoice with foreign keys",
        "An audit log table that records changes across modules",
      ],
      repo: null,
      demo: null,
      image: null,
      screenshots: [],
    },
  ],

  smallBuilds: [
    {
      title: "QR Code Generator",
      summary: "Turns any text or URL into a QR code you can download.",
      tech: ["JavaScript"],
      repo: null,
      demo: null,
    },
    {
      title: "Redux Counter",
      summary: "A small app for practising global state with Redux Toolkit slices and actions.",
      tech: ["React", "Redux Toolkit"],
      repo: null,
      demo: null,
    },
    {
      title: "TV Show Explorer",
      summary: "Search shows and see their details using the public TVMaze API.",
      tech: ["JavaScript", "REST API"],
      repo: null,
      demo: null,
    },
  ],

  skills: [
    {
      group: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript (ES6)", "React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "Bootstrap", "Responsive design"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "Authentication", "API integration", "Stripe"],
    },
    {
      group: "Database",
      items: ["MongoDB", "PostgreSQL", "SQL"],
    },
    {
      group: "Tools",
      items: ["Git", "GitHub", "GitLab", "VS Code", "Postman", "npm", "MS Office"],
    },
    {
      group: "Professional",
      items: ["Agile & Scrum", "State management", "Cross-browser compatibility", "Debugging & troubleshooting", "Software quality assurance", "Problem solving", "Team collaboration"],
    },
  ],
};
