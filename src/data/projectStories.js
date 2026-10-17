export const projectStories = {
  QueueWise: {
    device: "laptop",
    category: "FULL-STACK APPLICATION",
    roleLabel: "Full-stack development",
    previewLabel: "APPLICATION SCREENS · LOCAL DEMO",
    role: "Built the React and TypeScript frontend and Laravel backend, including authentication, appointment workflows, queue management, and feature tests.",
    problem:
      "Customers need a way to book appointments and track their place in a service queue, while staff need tools to manage arrivals and service status.",
    challenge:
      "Keeping appointment and queue state consistent across roles. The implementation validates booking slots on the server and refreshes queue status while guarding against overlapping requests and stale updates.",
    outcome:
      "A working application with customer, staff, and administrator portals for bookings, check-in, queue status, service administration, and history. Screenshots were captured locally using a separate demo database.",
    highlights: [
      "Role-based customer, staff, and admin workflows",
      "Appointment booking and refreshed queue status",
      "Laravel Sanctum authentication and backend feature tests",
    ],
    mediaNote:
      "Actual application screenshots captured locally with demo data. This is not a public hosted demo.",
    screens: [
      {
        file: "queuewise-dashboard.webp",
        label: "Dashboard",
        alt: "QueueWise customer dashboard showing a demo customer's active queue status",
        caption:
          "Customer dashboard — the current queue number, service, and waiting status.",
      },
      {
        file: "queuewise-booking.webp",
        label: "Appointments",
        alt: "QueueWise appointment booking interface with service, date, and available time selection",
        caption:
          "Appointment booking — service selection and available time slots.",
      },
      {
        file: "queuewise-staff.webp",
        label: "Queue management",
        alt: "QueueWise staff interface showing service queue management with demo data",
        caption:
          "Staff queue management — the operational view for handling customers.",
      },
    ],
  },
  "Smart Stethoscope System": {
    device: "laptop",
    category: "ACADEMIC RESEARCH · AI & HARDWARE",
    roleLabel: "ML engineer · Heart & lung CNN training",
    previewLabel: "RESEARCH PROTOTYPE · INTERFACE SCREENS",
    role: "ML engineer responsible for training two separate audio classifiers: a LeNet-style CNN for normal-versus-murmur heart sounds and a four-class CNN for normal, crackles, wheezes, or both in lung recordings.",
    problem:
      "Raw heart and lung recordings do not indicate which sounds may be abnormal. Reviewing each recording requires manual listening and interpretation. The project addressed this gap by exploring automated abnormal-sound detection.",
    challenge:
      "Preparing different input pipelines for heart and lung audio, then training, validating, and evaluating each CNN separately. The heart model uses 16 kHz audio; the lung model uses 8 kHz audio and 10-second training segments. Both use Mel-spectrogram features.",
    outcome:
      "Two trained classifiers converted to separate TensorFlow Lite files for the academic prototype: heart_model.tflite and lung_model.tflite. Their outputs are research predictions, not clinically validated diagnoses.",
    highlights: [
      "LeNet-style heart CNN and a separate four-class lung CNN",
      "Mel-spectrogram preparation, balanced training, and model evaluation",
      "Separate TensorFlow Lite models for embedded inference",
    ],
    mediaNote:
      "Shared project interface screenshots sourced from John Dignadice's project portfolio. The contribution descriptions here describe my own role. Screens display prototype outputs, not verified clinical findings.",
    screens: [
      {
        file: "stethoscope-dashboard.png",
        label: "Dashboard",
        alt: "Smart Stethoscope prototype dashboard with heart analysis, lung analysis, and session history",
        caption:
          "Research prototype dashboard — entry points for analysis and session history.",
      },
      {
        file: "stethoscope-heart.png",
        label: "Heart analysis",
        alt: "Smart Stethoscope research prototype heart analysis interface",
        caption:
          "Heart analysis interface — prototype audio analysis workflow.",
      },
      {
        file: "stethoscope-lung.png",
        label: "Lung analysis",
        alt: "Smart Stethoscope research prototype lung analysis interface",
        caption: "Lung analysis interface — prototype audio analysis workflow.",
      },
      {
        file: "stethoscope-history.png",
        label: "Session history",
        alt: "Smart Stethoscope prototype recording session history",
        caption: "Session history — previously recorded prototype sessions.",
      },
      {
        file: "stethoscope-details.png",
        label: "Recording details",
        alt: "Smart Stethoscope prototype recording details and result information",
        caption: "Recording details — a closer view of a prototype session.",
      },
    ],
  },
  "PAPI Mobile Finance App": {
    video: "papi-demo.mp4",
    device: "phone",
    category: "MOBILE APPLICATION · REACT NATIVE",
    roleLabel: "Mobile frontend · Five-person development team",
    previewLabel: "PAPI / PINANSYALAPP · iOS CAPTURE",
    role: "Built React Native and Expo interfaces as part of a five-person Computer Engineering team, contributing to AI-assisted expense handling, feature testing, and debugging.",
    problem:
      "A mobile finance project for farmers to record everyday expenses and access budgeting and automated financial insights.",
    challenge:
      "Presenting text, screenshot, voice, and video expense capture alongside budgeting in a mobile interface. My work focused on the application interfaces, feature implementation, testing, and debugging with the team.",
    outcome:
      "A mobile application interface covering expense capture, AI interaction, budgeting, and registration. The supplied captures show different development iterations rather than a single release.",
    highlights: [
      "React Native and Expo mobile interfaces",
      "Expense capture and AI-assisted interactions",
      "Budgeting workflows, feature testing, and teamwork",
    ],
    mediaNote:
      "Original iPhone captures supplied by Eddrick. The silent demonstration is trimmed to expense entry and budgeting; registration and profile details are excluded. These screens document different development iterations; the app is labeled PinansyalApp in the interface.",
    screens: [
      {
        file: "papi-expense.jpg",
        label: "Expense & AI",
        alt: "PinansyalApp mobile home screen with screenshot, voice, video expense capture, and Ask AI input",
        caption:
          "Expense capture and AI entry — an iPhone capture from the project.",
      },
      {
        file: "papi-budget.jpg",
        label: "Budgeting",
        alt: "PinansyalApp automatic budgeting screen with food, bills, rent, and other categories",
        caption:
          "Automatic budgeting — an earlier project iteration with example allocations.",
      },
      {
        file: "papi-register.jpg",
        label: "Registration",
        alt: "PinansyalApp registration screen with empty name, birthplace, date of birth, and gender fields",
        caption:
          "Registration — empty form fields from a development iteration.",
      },
    ],
  },
  HealthTap: {
    challengeLabel: "Design challenge",
    outcomeLabel: "Design outcome",
    device: "phone",
    category: "UI/UX DESIGN · HEALTHCARE",
    roleLabel: "Interface design · User flows & prototyping",
    previewLabel: "HEALTHTAP · FIGMA DESIGN CONCEPT",
    role: "Designed the interface and user flow in Figma, focusing on appointment discovery, booking, and usability.",
    problem:
      "Finding a doctor and arranging an appointment can involve several separate steps. HealthTap explores a mobile interface that brings doctor discovery and appointment scheduling together.",
    challenge:
      "Organizing doctor discovery and the booking entry point into a clear mobile flow. The exported screens present specialty filters, availability, doctor information, and a booking action.",
    outcome:
      "A Figma UI/UX concept covering doctor discovery, appointment management, and sign-in. These are design previews, not screenshots of a deployed healthcare application.",
    highlights: [
      "Doctor discovery with specialties and availability",
      "Doctor profile and appointment-booking entry point",
      "Mobile interface and user-flow design in Figma",
    ],
    mediaNote:
      "Original design frames exported from the linked HealthTap Figma file. This is a UI/UX concept; displayed doctors and appointment information are design content, not live service availability.",
    screens: [
      {
        file: "healthtap-availability.png",
        label: "Doctor discovery",
        alt: "HealthTap Figma concept showing doctor availability, specialty filters, and booking actions",
        caption:
          "Doctor discovery — the original availability screen exported from Figma.",
      },
      {
        file: "healthtap-appointment.png",
        label: "Appointment flow",
        alt: "HealthTap Figma appointment concept showing a doctor profile and the Book action",
        caption:
          "Appointment management — doctor information and the booking entry point.",
      },
      {
        file: "healthtap-signin.png",
        label: "Sign-in",
        alt: "HealthTap Figma sign-in concept with the HealthTap identity and sign-in options",
        caption: "Sign-in — the original entry screen from the design concept.",
      },
    ],
  },
};
