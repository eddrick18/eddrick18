export const projects = [
  {
    title: "QueueWise",
    category: "FULL-STACK / APPOINTMENTS / QUEUE MANAGEMENT",
    period: "2026",
    summary:
      "A full-stack appointment and queue-management system with dedicated portals for customers, staff, and administrators.",
    contributions: [
      "Built role-based authentication using Laravel Sanctum.",
      "Implemented queue management with automatically refreshed status, plus appointment booking, rescheduling, cancellation, and check-in.",
      "Added service and staff administration, queue history, and automated backend feature tests.",
    ],
    stack: ["React", "TypeScript", "Laravel", "PHP", "SQLite", "REST API"],
    links: [
      {
        label: "View source on GitHub",
        url: "https://github.com/eddrick18/queuewise",
      },
    ],
  },
  {
    title: "Smart Stethoscope System",
    category: "AI / MACHINE LEARNING / FRONTEND / HARDWARE",
    period: "2025–2026",
    summary:
      "An academic smart stethoscope prototype with separate CNN models for heart-sound and lung-sound classification.",
    contributions: [
      "Served as the ML engineer training separate heart and lung sound classifiers.",
      "Trained a LeNet-style heart CNN for normal-versus-murmur classification and a four-class lung CNN.",
      "Prepared Mel-spectrogram features, evaluated model predictions, and converted the selected models to TensorFlow Lite.",
    ],
    stack: [
      "Python",
      "TensorFlow",
      "TensorFlow Lite",
      "CNN",
      "Mel-spectrograms",
      "Audio Classification",
    ],
    links: [],
  },
  {
    title: "PAPI Mobile Finance App",
    category: "REACT NATIVE / EXPO / MOBILE DEVELOPMENT",
    period: "2025",
    summary:
      "A mobile finance-management application for farmers to record expenses, manage finances, and access automated financial insights.",
    contributions: [
      "Built mobile application interfaces using React Native and Expo.",
      "Collaborated in a five-person Computer Engineering development team.",
      "Contributed to AI-assisted expense handling, feature testing, and debugging.",
    ],
    stack: ["React Native", "Expo", "JavaScript", "REST APIs", "Mobile UI"],
    links: [
      {
        label: "View Figma design",
        url: "https://www.figma.com/proto/yNaRG8peef6WfAUzEql5h6/PH-Finance-App?node-id=1-708&t=EfogTujJWrehvmKb-1",
      },
    ],
  },
  {
    title: "Weather Application",
    category: "WEB / REST API / RESPONSIVE UI",
    period: "2025",
    summary:
      "A responsive weather application that retrieves current conditions and forecast information from an external API.",
    contributions: [
      "Integrated real-time weather data through a REST API.",
      "Designed a simple, responsive interface for desktop and mobile devices.",
    ],
    stack: ["React", "JavaScript", "REST API", "CSS"],
    links: [],
  },
  {
    title: "Episode Logger",
    category: "CHROME EXTENSION / LOCAL STORAGE",
    period: "2025",
    summary:
      "A browser extension that records watched videos and restores saved playback progress between sessions.",
    contributions: [
      "Implemented local storage for persistent playback data.",
      "Created a lightweight interface for tracking watched content.",
    ],
    stack: ["JavaScript", "Chrome Extensions API", "HTML", "CSS"],
    links: [],
  },
  {
    title: "HealthTap",
    category: "UI/UX / HEALTHCARE / FIGMA",
    period: "2025",
    summary:
      "A user-interface concept for an online medical appointment application, designed to make appointment booking clearer and more accessible.",
    contributions: [
      "Designed the interface and user flow in Figma.",
      "Focused on appointment discovery, booking, and usability.",
    ],
    stack: ["Figma", "UI/UX", "Wireframing", "Prototyping"],
    links: [
      {
        label: "View Figma design",
        url: "https://www.figma.com/design/glmbJdbHpGpiywvWcWKx1j/HealthTap?node-id=0-1&t=xkXgIvIo27PuTaJI-1",
      },
    ],
  },
];
