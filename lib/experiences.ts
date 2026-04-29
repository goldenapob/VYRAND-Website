export interface Experience {
  id: "air" | "alpine" | "gravity" | "vertical" | "terrain";
  name: string;
  sport: string;
  tagline: string;
  description: string;
  isFlagship: boolean;
  isAndorraID: boolean;
  pricePerPerson: number;
  duration: string;
  groupSize: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  image: string;
  heroLine: string;
  whatToExpect: string[];
  details: {
    ageMin: number;
    difficulty: string;
    requirements: string;
  };
  color: string;
  accentColor: string;
}

export const experiences: Experience[] = [
  {
    id: "air",
    name: "Air",
    sport: "Wingsuit Flying",
    tagline: "Defy gravity at 200 km/h without leaving the ground.",
    heroLine: "Fly at 200 km/h. No parachute needed.",
    description:
      "The most intense simulator in Andorra. Strap in, tuck your arms, and feel what it means to fly through mountain canyons at full speed. No experience needed — pure adrenaline guaranteed.",
    isFlagship: true,
    isAndorraID: false,
    pricePerPerson: 70,
    duration: "30 min",
    groupSize: "2–6 people",
    intensity: 5,
    image: "/images/experiences/air.jpeg",
    whatToExpect: [
      "Full-body immersion in a wingsuit simulator rig",
      "200 km/h wind simulation with canyon fly-through visuals",
      "Brief orientation (5 min) — no prior experience needed",
      "Multiple passes at increasing speed and difficulty",
      "Debrief and sharable data: max speed, distance, G-force peaks",
    ],
    details: {
      ageMin: 14,
      difficulty: "Extreme",
      requirements: "No prior experience needed. Min height 1.50m.",
    },
    color: "#25a267",
    accentColor: "#1a0e08",
  },
  {
    id: "alpine",
    name: "Alpine",
    sport: "Ski & Ski Jump",
    tagline: "Feel the slope without the snow. Andorra in your veins.",
    heroLine: "Feel the descent. Skip the mountain.",
    description:
      "Born from the mountains that define Andorra, Alpine puts you on a ski jump without the cold. Perfect for ski lovers and first-timers who want to know what it really feels like to fly off a ramp.",
    isFlagship: false,
    isAndorraID: true,
    pricePerPerson: 70,
    duration: "30 min",
    groupSize: "2–6 people",
    intensity: 4,
    image: "/images/experiences/alpine.jpeg",
    whatToExpect: [
      "Ski jump simulator with full slope run-up and ramp",
      "Immersive Andorran mountain landscape visuals",
      "Adjustable difficulty from beginner slope to Olympic jump",
      "Wind, vibration, and motion feedback matched to terrain",
      "Perfect for ski lovers and complete beginners alike",
    ],
    details: {
      ageMin: 12,
      difficulty: "High",
      requirements: "No skiing experience required. Min height 1.45m.",
    },
    color: "#4a90d9",
    accentColor: "#0a1a2e",
  },
  {
    id: "gravity",
    name: "Gravity",
    sport: "Mountain Bike",
    tagline: "Full throttle. Zero brakes. Pure descent.",
    heroLine: "Grip the handlebars. Survive the trail.",
    description:
      "Grip the handlebars and hold on. Gravity puts you on a downhill MTB trail at race speed — technical, fast, and brutally satisfying.",
    isFlagship: false,
    isAndorraID: false,
    pricePerPerson: 70,
    duration: "25 min",
    groupSize: "2–6 people",
    intensity: 4,
    image: "/images/experiences/gravity.jpeg",
    whatToExpect: [
      "Full MTB rig simulator with handlebars, saddle, and pedals",
      "Downhill race trail visuals at full race speed",
      "Reactive motion platform simulating rocks, roots, drops",
      "Multiple trail options from flow trails to gnarly chutes",
      "Post-run stats: top speed, air time, line analysis",
    ],
    details: {
      ageMin: 14,
      difficulty: "High",
      requirements: "No MTB experience required. Min height 1.50m.",
    },
    color: "#22c55e",
    accentColor: "#0a1a0e",
  },
  {
    id: "vertical",
    name: "Vertical",
    sport: "Rock Climbing",
    tagline: "Every move counts. The summit is earned.",
    heroLine: "Find your holds. Don't look down.",
    description:
      "Vertical tests your focus, strength, and nerve. Whether you're a climber or a complete beginner, the wall doesn't care — and that's the point.",
    isFlagship: false,
    isAndorraID: false,
    pricePerPerson: 70,
    duration: "25 min",
    groupSize: "2–6 people",
    intensity: 3,
    image: "/images/experiences/vertical.jpeg",
    whatToExpect: [
      "Augmented reality climbing wall with responsive holds",
      "Routes from beginner to expert difficulty",
      "Height simulation — feel the exposure without the risk",
      "Real grip strength and movement required",
      "Group competition mode: race your crew to the top",
    ],
    details: {
      ageMin: 12,
      difficulty: "Medium",
      requirements: "No climbing experience required. Min height 1.40m.",
    },
    color: "#a855f7",
    accentColor: "#1a0a2e",
  },
  {
    id: "terrain",
    name: "Terrain",
    sport: "Off-road Buggy",
    tagline: "Mud, speed, and zero mercy from the track.",
    heroLine: "Floor it. Let the track decide.",
    description:
      "Strap into the buggy and tear through rough terrain at speed. Terrain is raw, dirty, and completely addictive — ideal for groups who want to push their limits together.",
    isFlagship: false,
    isAndorraID: false,
    pricePerPerson: 70,
    duration: "25 min",
    groupSize: "2–6 people",
    intensity: 3,
    image: "/images/experiences/terrain.jpeg",
    whatToExpect: [
      "Full off-road buggy cockpit with wheel, pedals, gear",
      "Multiple terrain types: mud, rock, sand, forest",
      "Motion platform with full 6-axis feedback",
      "Head-to-head group racing mode",
      "Driver stats: cornering G, top speed, track record",
    ],
    details: {
      ageMin: 14,
      difficulty: "Medium",
      requirements: "No driving license needed. Min height 1.50m.",
    },
    color: "#f59e0b",
    accentColor: "#1a1200",
  },
];

export function getExperience(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}

export function getOtherExperiences(id: string): Experience[] {
  return experiences.filter((e) => e.id !== id);
}

export const intensityLabels: Record<number, string> = {
  1: "Chill",
  2: "Moderate",
  3: "Intense",
  4: "Extreme",
  5: "Maximum",
};
