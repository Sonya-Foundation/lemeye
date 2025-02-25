import type { Event } from "@/types"

export const SYRIA_BORDER_COORDINATES: [number, number][] = [
  [36.834015, 36.81897],
  [36.898987, 36.64497],
  [36.551285, 36.1597],
  [36.448059, 35.998535],
  [36.405487, 35.935867],
  [36.190643, 35.8218],
  [36.065674, 35.950264],
  [35.932465, 35.928677],
  [35.927658, 35.927658],
  [35.839767, 35.916825],
  [35.93829, 35.923481],
  [36.032465, 35.928677],
  [36.127658, 35.927658],
  [36.239767, 35.916825],
]

export const EXAMPLE_EVENTS: Event[] = [
  {
    id: "001",
    title: "Military Aircraft Movement",
    location: "Istanbul Airspace",
    date: "2025-02-25T12:00:00Z",
    type: "military",
    description: "Military aircraft conducting reconnaissance mission from Ankara to Istanbul",
    status: "active",
    severity: "high",
    coordinates: [41.0082, 28.9784],
    movement: {
      type: "aircraft",
      path: [
        [39.9334, 32.8597], // Ankara
        [40.4, 31.0],
        [40.8, 29.5],
        [41.0082, 28.9784], // Istanbul
      ],
      speed: "900 km/h",
      direction: "northwest",
    },
    affectedZone: {
      type: "circle",
      coordinates: [[41.0082, 28.9784]],
      radius: 25000,
      color: "rgba(255, 0, 0, 0.2)",
    },
    sources: [
      {
        id: "m1",
        type: "official",
        name: "Air Force Command",
        url: "https://example.com/airforce",
        icon: "✈️",
        reliability: "high",
        lastUpdate: "2025-02-25T12:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T12:00:00Z",
        content: "Aircraft departed from Ankara",
        source: "Air Force Command",
      },
      {
        timestamp: "2025-02-25T12:30:00Z",
        content: "Aircraft approaching Istanbul airspace",
        source: "Air Force Command",
      },
    ],
    nearestCities: [
      {
        name: "Istanbul",
        distance: 0,
        direction: "current",
      },
      {
        name: "Izmit",
        distance: 95,
        direction: "southeast",
      },
    ],
    weather: {
      temperature: 18,
      windSpeed: 15,
      windDirection: "northeast",
      condition: "clear",
    },
    tags: ["military", "aircraft", "reconnaissance"],
    verified: true,
  },
  {
    id: "002",
    title: "Virus Outbreak",
    location: "Ankara, Turkey",
    date: "2025-02-24T08:00:00Z",
    type: "virus",
    description: "Rapid spread of new virus strain in Ankara metropolitan area",
    status: "critical",
    severity: "critical",
    coordinates: [39.9334, 32.8597],
    movement: {
      type: "virus",
      spread: [
        {
          time: "2025-02-24T08:00:00Z",
          affected_area: "10%",
        },
        {
          time: "2025-02-24T14:00:00Z",
          affected_area: "30%",
        },
        {
          time: "2025-02-25T08:00:00Z",
          affected_area: "50%",
        },
      ],
    },
    affectedZone: {
      type: "heatmap",
      coordinates: [
        [39.9334, 32.8597],
        [39.95, 32.87],
        [39.92, 32.84],
      ],
      color: "rgba(255, 0, 0, 0.5)",
      intensity: 0.8,
    },
    sources: [
      {
        id: "v1",
        type: "official",
        name: "Ministry of Health",
        url: "https://example.com/health",
        icon: "🏥",
        reliability: "high",
        lastUpdate: "2025-02-25T08:00:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-24T08:00:00Z",
        content: "Initial virus cases detected",
        source: "Ministry of Health",
      },
      {
        timestamp: "2025-02-25T08:00:00Z",
        content: "Virus spread reaches 50% of metropolitan area",
        source: "Ministry of Health",
      },
    ],
    casualties: {
      dead: 0,
      injured: 245,
      missing: 0,
    },
    nearestCities: [
      {
        name: "Ankara",
        distance: 0,
        direction: "current",
      },
      {
        name: "Eskişehir",
        distance: 233,
        direction: "west",
      },
    ],
    tags: ["health", "virus", "outbreak"],
    verified: true,
  },
  {
    id: "003",
    title: "Protest in Istanbul",
    location: "Istanbul, Turkey",
    date: "2025-02-24T18:00:00Z",
    type: "protest",
    description: "Massive protests erupt in Istanbul against government policies",
    status: "active",
    severity: "medium",
    coordinates: [41.0082, 28.9784],
    movement: {
      type: "crowd",
      path: [
        [41.0, 28.97],
        [41.01, 28.98],
        [41.02, 28.99],
      ],
      direction: "north",
    },
    affectedZone: {
      type: "polygon",
      coordinates: [
        [41.0, 28.97],
        [41.02, 28.99],
        [41.04, 29.01],
        [41.05, 29.0],
      ],
      color: "rgba(0, 0, 255, 0.2)",
    },
    sources: [
      {
        id: "p1",
        type: "news",
        name: "TRT World",
        url: "https://example.com/news/protest",
        icon: "📰",
        reliability: "medium",
        lastUpdate: "2025-02-24T18:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-24T18:00:00Z",
        content: "Protests start in central Istanbul",
        source: "TRT World",
      },
      {
        timestamp: "2025-02-24T19:00:00Z",
        content: "Protesters are marching towards Taksim Square",
        source: "TRT World",
      },
    ],
    nearestCities: [
      {
        name: "Istanbul",
        distance: 0,
        direction: "current",
      },
      {
        name: "Bursa",
        distance: 155,
        direction: "south",
      },
    ],
    weather: {
      temperature: 22,
      windSpeed: 8,
      windDirection: "west",
      condition: "partly cloudy",
    },
    tags: ["protest", "civil unrest", "politics"],
    verified: true,
  },
  {
    id: "004",
    title: "War Conflict in Syria",
    location: "Aleppo, Syria",
    date: "2025-02-23T14:00:00Z",
    type: "war",
    description: "Heavy fighting between military factions in the city of Aleppo",
    status: "active",
    severity: "high",
    coordinates: [36.2017, 37.1343],
    movement: {
      type: "military",
      path: [
        [36.2017, 37.1343], // Aleppo
        [36.25, 37.2],
        [36.3, 37.25],
      ],
      speed: "50 km/h",
      direction: "north",
    },
    affectedZone: {
      type: "circle",
      coordinates: [[36.2017, 37.1343]],
      radius: 5000,
      color: "rgba(255, 0, 0, 0.5)",
    },
    sources: [
      {
        id: "w1",
        type: "official",
        name: "Syrian Ministry of Defense",
        url: "https://example.com/syrianwar",
        icon: "⚔️",
        reliability: "high",
        lastUpdate: "2025-02-23T14:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-23T14:00:00Z",
        content: "Clashes erupted in Aleppo between military factions",
        source: "Syrian Ministry of Defense",
      },
      {
        timestamp: "2025-02-23T14:30:00Z",
        content: "Casualties reported from both sides",
        source: "Syrian Ministry of Defense",
      },
    ],
    nearestCities: [
      {
        name: "Aleppo",
        distance: 0,
        direction: "current",
      },
      {
        name: "Homs",
        distance: 145,
        direction: "south",
      },
    ],
    casualties: {
      dead: 150,
      injured: 400,
      missing: 75,
    },
    tags: ["war", "conflict", "military"],
    verified: true,
  },
  {
    id: "005",
    title: "Humanitarian Crisis in Aleppo",
    location: "Aleppo, Syria",
    date: "2025-02-22T10:00:00Z",
    type: "humanitarian",
    description: "Ongoing humanitarian crisis in Aleppo due to the ongoing war",
    status: "critical",
    severity: "high",
    coordinates: [36.2017, 37.1343],
    affectedZone: {
      type: "heatmap",
      coordinates: [
        [36.2, 37.13],
        [36.25, 37.15],
        [36.3, 37.2],
      ],
      color: "rgba(255, 255, 0, 0.5)",
      intensity: 0.9,
    },
    sources: [
      {
        id: "h1",
        type: "official",
        name: "Red Cross",
        url: "https://example.com/redcross",
        icon: "🤝",
        reliability: "high",
        lastUpdate: "2025-02-22T10:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-22T10:00:00Z",
        content: "Humanitarian aid is being delivered to affected regions",
        source: "Red Cross",
      },
    ],
    nearestCities: [
      {
        name: "Aleppo",
        distance: 0,
        direction: "current",
      },
      {
        name: "Idlib",
        distance: 60,
        direction: "west",
      },
    ],
    casualties: {
      dead: 0,
      injured: 200,
      missing: 100,
    },
    tags: ["humanitarian", "crisis", "aid"],
    verified: true,
  },

  {
    id: "008",
    title: "Coastal Flooding",
    location: "Istanbul Bosphorus, Turkey",
    date: "2025-02-25T06:00:00Z",
    type: "natural_disaster",
    description: "Rising water levels along the Bosphorus causing coastal flooding",
    status: "active",
    severity: "medium",
    coordinates: [41.0451, 29.0340],
    affectedZone: {
      type: "polygon",
      coordinates: [
        [41.0451, 29.0340],
        [41.0551, 29.0440],
        [41.0651, 29.0340],
        [41.0551, 29.0240],
      ],
      color: "rgba(0, 0, 255, 0.3)",
    },
    sources: [
      {
        id: "f1",
        type: "official",
        name: "Turkish Meteorological Service",
        url: "https://example.com/weatheralert",
        icon: "🌊",
        reliability: "high",
        lastUpdate: "2025-02-25T07:00:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T06:00:00Z",
        content: "Water levels begin rising along Bosphorus coast",
        source: "Turkish Meteorological Service",
      },
      {
        timestamp: "2025-02-25T07:00:00Z",
        content: "Low-lying areas experiencing minor flooding",
        source: "Turkish Meteorological Service",
      },
    ],
    casualties: {
      dead: 0,
      injured: 0,
      missing: 0,
    },
    nearestCities: [
      {
        name: "Istanbul",
        distance: 0,
        direction: "current",
      },
    ],
    weather: {
      temperature: 16,
      windSpeed: 25,
      windDirection: "northeast",
      condition: "rain",
    },
    tags: ["flooding", "natural disaster", "weather"],
    verified: true,
  },
  {
    id: "009",
    title: "Cultural Festival",
    location: "Sultanahmet Square, Istanbul, Turkey",
    date: "2025-02-25T15:00:00Z",
    type: "cultural",
    description: "Annual cultural festival celebrating Turkish arts and heritage",
    status: "active",
    severity: "low",
    coordinates: [41.0054, 28.9768],
    affectedZone: {
      type: "circle",
      coordinates: [[41.0054, 28.9768]],
      radius: 500,
      color: "rgba(255, 192, 203, 0.2)",
    },
    sources: [
      {
        id: "c1",
        type: "official",
        name: "Ministry of Culture and Tourism",
        url: "https://example.com/festival",
        icon: "🎭",
        reliability: "high",
        lastUpdate: "2025-02-25T15:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T15:00:00Z",
        content: "Festival opens with traditional music and dance performances",
        source: "Ministry of Culture and Tourism",
      },
    ],
    nearestCities: [
      {
        name: "Istanbul",
        distance: 0,
        direction: "current",
      },
    ],
    weather: {
      temperature: 20,
      windSpeed: 8,
      windDirection: "west",
      condition: "clear",
    },
    tags: ["cultural", "festival", "tourism"],
    verified: true,
  },
  {
    id: "010",
    title: "Traffic Congestion",
    location: "Istanbul E-5 Highway, Turkey",
    date: "2025-02-25T17:00:00Z",
    type: "transportation",
    description: "Major traffic congestion on E-5 highway due to multiple vehicle accident",
    status: "active",
    severity: "medium",
    coordinates: [41.0215, 29.0146],
    movement: {
      type: "traffic",
      path: [
        [41.0215, 29.0146],
        [41.0231, 29.0185],
        [41.0247, 29.0224],
      ],
      direction: "east",
    },
    affectedZone: {
      type: "line",
      coordinates: [
        [41.0215, 29.0146],
        [41.0247, 29.0224],
      ],
      color: "rgba(255, 0, 0, 0.5)",
      width: 200,
    },
    sources: [
      {
        id: "t1",
        type: "official",
        name: "Istanbul Traffic Control Center",
        url: "https://example.com/trafficcontrol",
        icon: "🚗",
        reliability: "high",
        lastUpdate: "2025-02-25T17:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T17:00:00Z",
        content: "Multiple vehicle accident reported on E-5 highway",
        source: "Istanbul Traffic Control Center",
      },
      {
        timestamp: "2025-02-25T17:30:00Z",
        content: "Traffic backed up for 3km, emergency services on scene",
        source: "Istanbul Traffic Control Center",
      },
    ],
    casualties: {
      dead: 0,
      injured: 3,
      missing: 0,
    },
    nearestCities: [
      {
        name: "Istanbul",
        distance: 0,
        direction: "current",
      },
    ],
    weather: {
      temperature: 18,
      windSpeed: 10,
      windDirection: "northwest",
      condition: "partly cloudy",
    },
    tags: ["traffic", "accident", "transportation"],
    verified: true,
  },
  
  // Ankara Events
  {
    id: "011",
    title: "Diplomatic Meeting",
    location: "Ankara, Turkey",
    date: "2025-02-25T11:00:00Z",
    type: "diplomatic",
    description: "High-level diplomatic meeting between Turkish and EU officials",
    status: "active",
    severity: "low",
    coordinates: [39.9233, 32.8597],
    affectedZone: {
      type: "circle",
      coordinates: [[39.9233, 32.8597]],
      radius: 1000,
      color: "rgba(75, 0, 130, 0.2)",
    },
    sources: [
      {
        id: "d1",
        type: "official",
        name: "Ministry of Foreign Affairs",
        url: "https://example.com/diplomacy",
        icon: "🤝",
        reliability: "high",
        lastUpdate: "2025-02-25T11:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T11:00:00Z",
        content: "EU delegation arrives for diplomatic talks",
        source: "Ministry of Foreign Affairs",
      },
    ],
    nearestCities: [
      {
        name: "Ankara",
        distance: 0,
        direction: "current",
      },
    ],
    weather: {
      temperature: 15,
      windSpeed: 12,
      windDirection: "southeast",
      condition: "clear",
    },
    tags: ["diplomatic", "EU", "international relations"],
    verified: true,
  },
  {
    id: "012",
    title: "Student Demonstrations",
    location: "Ankara University, Turkey",
    date: "2025-02-25T13:00:00Z",
    type: "protest",
    description: "University students protesting education policy changes",
    status: "active",
    severity: "low",
    coordinates: [39.9425, 32.8223],
    movement: {
      type: "crowd",
      path: [
        [39.9425, 32.8223],
        [39.9430, 32.8230],
        [39.9435, 32.8240],
      ],
      direction: "northeast",
    },
    affectedZone: {
      type: "circle",
      coordinates: [[39.9425, 32.8223]],
      radius: 300,
      color: "rgba(255, 165, 0, 0.3)",
    },
    sources: [
      {
        id: "s1",
        type: "news",
        name: "Anadolu Agency",
        url: "https://example.com/studentprotests",
        icon: "📰",
        reliability: "medium",
        lastUpdate: "2025-02-25T13:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T13:00:00Z",
        content: "Students gather on campus to protest education policy changes",
        source: "Anadolu Agency",
      },
      {
        timestamp: "2025-02-25T13:30:00Z",
        content: "Demonstration remains peaceful with approximately 500 participants",
        source: "Anadolu Agency",
      },
    ],
    nearestCities: [
      {
        name: "Ankara",
        distance: 0,
        direction: "current",
      },
    ],
    weather: {
      temperature: 16,
      windSpeed: 8,
      windDirection: "south",
      condition: "sunny",
    },
    tags: ["protest", "education", "students"],
    verified: true,
  },
  
  // Izmir Events
  {
    id: "013",
    title: "Port Strike",
    location: "Izmir, Turkey",
    date: "2025-02-25T08:00:00Z",
    type: "strike",
    description: "Dock workers strike at Izmir port affecting shipping operations",
    status: "active",
    severity: "medium",
    coordinates: [38.4237, 27.1428],
    affectedZone: {
      type: "polygon",
      coordinates: [
        [38.4237, 27.1428],
        [38.4257, 27.1448],
        [38.4277, 27.1428],
        [38.4257, 27.1408],
      ],
      color: "rgba(255, 69, 0, 0.3)",
    },
    sources: [
      {
        id: "st1",
        type: "news",
        name: "Maritime News Agency",
        url: "https://example.com/portstrike",
        icon: "⚓",
        reliability: "medium",
        lastUpdate: "2025-02-25T10:00:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T08:00:00Z",
        content: "Dock workers begin strike at Izmir port",
        source: "Maritime News Agency",
      },
      {
        timestamp: "2025-02-25T10:00:00Z",
        content: "Shipping operations severely impacted, negotiations underway",
        source: "Maritime News Agency",
      },
    ],
    nearestCities: [
      {
        name: "Izmir",
        distance: 0,
        direction: "current",
      },
    ],
    weather: {
      temperature: 20,
      windSpeed: 15,
      windDirection: "west",
      condition: "clear",
    },
    tags: ["strike", "port", "shipping"],
    verified: true,
  },
  {
    id: "014",
    title: "Marine Pollution Incident",
    location: "Izmir Bay, Turkey",
    date: "2025-02-25T07:30:00Z",
    type: "environmental",
    description: "Oil spill detected in Izmir Bay affecting coastal areas",
    status: "active",
    severity: "medium",
    coordinates: [38.4454, 27.0851],
    affectedZone: {
      type: "heatmap",
      coordinates: [
        [38.4454, 27.0851],
        [38.4514, 27.0891],
        [38.4474, 27.0951],
      ],
      color: "rgba(128, 0, 128, 0.4)",
      intensity: 0.7,
    },
    sources: [
      {
        id: "en1",
        type: "official",
        name: "Ministry of Environment",
        url: "https://example.com/oilspill",
        icon: "🌊",
        reliability: "high",
        lastUpdate: "2025-02-25T09:30:00Z",
      },
    ],
    updates: [
      {
        timestamp: "2025-02-25T07:30:00Z",
        content: "Oil spill detected in northern part of Izmir Bay",
        source: "Ministry of Environment",
      },
      {
        timestamp: "2025-02-25T09:30:00Z",
        content: "Cleanup operations initiated, source of spill being investigated",
        source: "Ministry of Environment",
      },
    ],
    nearestCities: [
      {
        name: "Izmir",
        distance: 0,
        direction: "current",
      },
];

