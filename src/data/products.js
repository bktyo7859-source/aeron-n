// AERON Product Catalog & Brand Data

export const BRAND_INFO = {
  name: "AERON",
  tagline: "BUILT TO MOVE.",
  secondaryTaglines: [
    "ENGINEERED FOR MOTION.",
    "EVERY DETAIL MATTERS.",
    "MOVE DIFFERENT.",
    "DESIGNED FOR THE FUTURE."
  ],
  description: "AERON designs hyper-engineered performance footwear that merges biomechanical innovation with minimalist design."
};

export const COLORWAYS = [
  { id: "black", name: "Stealth Black", hex: "#121212", accent: "#333333", bgGradient: "from-zinc-900 via-neutral-900 to-black" },
  { id: "white", name: "Pure Platinum", hex: "#F5F5F7", accent: "#E5E5E5", bgGradient: "from-slate-100 via-neutral-100 to-white" },
  { id: "red", name: "Crimson Motion", hex: "#E63946", accent: "#D62828", bgGradient: "from-red-950 via-neutral-900 to-black" },
  { id: "blue", name: "Cyber Cobalt", hex: "#0077B6", accent: "#03045E", bgGradient: "from-cyan-950 via-slate-900 to-black" },
  { id: "green", name: "Vortex Jade", hex: "#2A9D8F", accent: "#107063", bgGradient: "from-emerald-950 via-zinc-900 to-black" },
  { id: "silver", name: "Titanium Chrome", hex: "#8D99AE", accent: "#2B2D42", bgGradient: "from-slate-800 via-neutral-900 to-black" }
];

export const PRODUCTS = [
  {
    id: "aeron-x1",
    name: "AERON X1",
    subtitle: "THE NEXT STEP FORWARD",
    category: "Running & Performance",
    gender: "Men",
    price: 18999,
    originalPrice: 21999,
    rating: 4.9,
    reviewCount: 142,
    badge: "Flagship",
    isFeatured: true,
    isNewRelease: true,
    description: "The AERON X1 is our flagship propulsion running shoe, engineered with carbon-infused FlightStrut™ geometry and responsive AeroCell™ foam. Experience 24% higher energy return with zero added weight.",
    specs: {
      weight: "185g (Size 42)",
      drop: "8mm",
      cushioning: "Maximal Propulsion",
      upper: "AeroKnit 3D Monofilament",
      midsole: "AeroCell™ Dual-Density Nitrogen Foam",
      outsole: "Gripper-Vortex Rubber"
    },
    techFeatures: [
      { title: "LIGHTWEIGHT", desc: "AeroKnit mesh provides structured support at under 185 grams." },
      { title: "RESPONSIVE", desc: "Dual nitrogen-infused AeroCell foam returns energy with every stride." },
      { title: "BREATHABLE", desc: "Laser-cut ventilation channels manage airflow across heat zones." },
      { title: "HIGH TRACTION", desc: "Vortex tread pattern delivers multi-directional grip on dry or wet pavement." }
    ],
    colors: COLORWAYS,
    defaultColor: "black",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: {
      black: {
        side: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
        back: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        top: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        sole: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        closeUp: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80"
      },
      white: {
        side: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        back: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        top: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
        sole: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        closeUp: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80"
      },
      red: {
        side: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
        back: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        top: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        sole: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        closeUp: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-x2",
    name: "AERON X2",
    subtitle: "UNMATCHED AERODYNAMICS",
    category: "Marathon & Speed",
    gender: "Men",
    price: 19999,
    rating: 4.8,
    reviewCount: 98,
    badge: "New",
    isFeatured: true,
    isNewRelease: true,
    description: "Designed for competitive runners seeking maximum energy efficiency. The X2 features a full-length carbon fiber propulsion plate suspended within dual AeroCell™ foam pods.",
    colors: COLORWAYS,
    defaultColor: "white",
    sizes: [40, 41, 42, 43, 44],
    images: {
      white: {
        side: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-street",
    name: "AERON Street",
    subtitle: "URBAN ARCHITECTURE FOR FEET",
    category: "Lifestyle",
    gender: "Unisex",
    price: 14999,
    originalPrice: 16999,
    rating: 4.7,
    reviewCount: 210,
    badge: "Best Seller",
    isFeatured: true,
    isNewRelease: false,
    description: "Architectural lines meet everyday luxury. Crafted with recycled technical suede and memory-padded foam lining for all-day comfort in the metropolis.",
    colors: COLORWAYS,
    defaultColor: "black",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    images: {
      black: {
        side: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-velocity",
    name: "AERON Velocity",
    subtitle: "LIGHTSPEED REBOUND",
    category: "Running",
    gender: "Women",
    price: 16999,
    rating: 4.9,
    reviewCount: 86,
    badge: "Trending",
    isFeatured: true,
    isNewRelease: true,
    description: "Ultra-lightweight sprint trainer engineered for quick cadence and rapid turnover. Features high-resilience heel pod dampeners.",
    colors: COLORWAYS,
    defaultColor: "silver",
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      silver: {
        side: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-core",
    name: "AERON Core",
    subtitle: "ESSENTIAL MINIMALISM",
    category: "Training",
    gender: "Men",
    price: 13999,
    rating: 4.6,
    reviewCount: 115,
    badge: "Essential",
    isFeatured: false,
    isNewRelease: true,
    description: "Stripped of unnecessary elements to deliver pure functional training stability. Wide toe box and low heel drop for grounded lifting.",
    colors: COLORWAYS,
    defaultColor: "black",
    sizes: [39, 40, 41, 42, 43, 44],
    images: {
      black: {
        side: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-flux",
    name: "AERON Flux",
    subtitle: "DYNAMIC ADAPTATION",
    category: "Cross-Training",
    gender: "Women",
    price: 17499,
    rating: 4.8,
    reviewCount: 64,
    badge: "New",
    isFeatured: false,
    isNewRelease: true,
    description: "Adapts to multi-plane movement instantly. TPU lateral outriggers anchor lateral jumps while AeroKnit upper expands naturally with your foot.",
    colors: COLORWAYS,
    defaultColor: "blue",
    sizes: [36, 37, 38, 39, 40],
    images: {
      blue: {
        side: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-edge",
    name: "AERON Edge",
    subtitle: "CUT THROUGH RESISTANCE",
    category: "Court & Basketball",
    gender: "Men",
    price: 20999,
    rating: 4.9,
    reviewCount: 77,
    badge: "Pro Series",
    isFeatured: true,
    isNewRelease: true,
    description: "High-top tactical lockdown with targeted ankle collar support. Micro-traction herringbone outsole engineered for hardwood floor precision.",
    colors: COLORWAYS,
    defaultColor: "red",
    sizes: [40, 41, 42, 43, 44, 45],
    images: {
      red: {
        side: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-motion",
    name: "AERON Motion",
    subtitle: "FLUIDITY DEFINED",
    category: "Lifestyle",
    gender: "Unisex",
    price: 15999,
    rating: 4.7,
    reviewCount: 150,
    badge: "Popular",
    isFeatured: false,
    isNewRelease: true,
    description: "Designed for seamless transition between high-velocity days and relaxed evenings. Slip-on AeroLock construction with heel strap pull.",
    colors: COLORWAYS,
    defaultColor: "green",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    images: {
      green: {
        side: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-runner",
    name: "AERON Runner",
    subtitle: "EVERYDAY MILEAGE",
    category: "Running",
    gender: "Men",
    price: 12999,
    rating: 4.5,
    reviewCount: 320,
    badge: "Value",
    isFeatured: false,
    isNewRelease: false,
    description: "The workhorse daily trainer built for high mileage durability. Reinforced heel counter and long-lasting AeroTread rubber base.",
    colors: COLORWAYS,
    defaultColor: "white",
    sizes: [39, 40, 41, 42, 43, 44],
    images: {
      white: {
        side: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-court",
    name: "AERON Court",
    subtitle: "LATERAL CONTROL",
    category: "Tennis & Indoor",
    gender: "Unisex",
    price: 16499,
    rating: 4.8,
    reviewCount: 44,
    badge: "Specialist",
    isFeatured: false,
    isNewRelease: true,
    description: "Heavy-duty TPU heel cup prevents rollover during violent direction shifts. Abrasion-resistant drag guard over toe box.",
    colors: COLORWAYS,
    defaultColor: "silver",
    sizes: [38, 39, 40, 41, 42, 43],
    images: {
      silver: {
        side: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-pro",
    name: "AERON Pro",
    subtitle: "ELITE COMPETITION",
    category: "Track & Field",
    gender: "Men",
    price: 22999,
    rating: 5.0,
    reviewCount: 29,
    badge: "Elite",
    isFeatured: true,
    isNewRelease: true,
    description: "Our uncompromising pinnacle racing shoe. Custom spike compatibility options and zero-friction inner lining.",
    colors: COLORWAYS,
    defaultColor: "black",
    sizes: [40, 41, 42, 43, 44],
    images: {
      black: {
        side: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
      }
    }
  },
  {
    id: "aeron-air",
    name: "AERON Air",
    subtitle: "FEATHERWEIGHT BREATHABILITY",
    category: "Lifestyle & Recovery",
    gender: "Women",
    price: 13499,
    rating: 4.6,
    reviewCount: 91,
    badge: "Lightest",
    isFeatured: false,
    isNewRelease: true,
    description: "Weighing only 160 grams, the Aeron Air provides cloud-like post-workout recovery support with open-mesh ventilation.",
    colors: COLORWAYS,
    defaultColor: "white",
    sizes: [35, 36, 37, 38, 39, 40],
    images: {
      white: {
        side: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        front: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
      }
    }
  }
];

export const CATEGORIES = [
  { id: "men", title: "MEN", subtitle: "Engineered for explosive strength & speed", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80" },
  { id: "women", title: "WOMEN", subtitle: "Hyper-responsive geometry designed for flow", image: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=1200&q=80" },
  { id: "kids", title: "KIDS", subtitle: "Durable propulsion for future movers", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80" },
  { id: "new-releases", title: "NEW RELEASES", subtitle: "The latest breakthroughs from AERON Lab", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
  { id: "sale", title: "SALE", subtitle: "Exclusive performance drops & archived models", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80" }
];

export const LIFESTYLE_CONTENT = [
  { title: "RUNNING", subtitle: "Break through your ceiling.", image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1000&q=80" },
  { title: "BASKETBALL", subtitle: "Defy gravity on every jump.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80" },
  { title: "GYM & TRAINING", subtitle: "Anchor your strength.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80" },
  { title: "STREETWEAR", subtitle: "Move different in the city.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" }
];
