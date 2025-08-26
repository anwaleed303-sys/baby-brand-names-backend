// Cultural and religious name data for backend processing
const CULTURAL_NAME_DATA = {
  islamic: {
    commonPrefixes: ["Abd", "Al", "Ibn", "Abu", "Umm"],
    commonSuffixes: ["ullah", "din", "rahman", "rahim", "allah"],
    meaningCategories: {
      attributes: ["Beautiful", "Wise", "Strong", "Noble", "Pure", "Blessed"],
      nature: ["Light", "Moon", "Star", "Dawn", "Garden", "Rose"],
      virtues: ["Faith", "Hope", "Peace", "Justice", "Patience", "Gratitude"],
      divine: [
        "Servant of Allah",
        "Gift of God",
        "God is great",
        "Blessed by Allah",
      ],
    },
    popularNames: {
      boys: [
        "Muhammad",
        "Ahmed",
        "Ali",
        "Omar",
        "Hassan",
        "Yusuf",
        "Ibrahim",
        "Khalil",
        "Abdullah",
        "Rahman",
        "Amin",
        "Tariq",
        "Malik",
        "Saad",
        "Zaid",
        "Bilal",
      ],
      girls: [
        "Aisha",
        "Fatima",
        "Khadija",
        "Maryam",
        "Zeinab",
        "Amina",
        "Layla",
        "Nour",
        "Zahra",
        "Safiya",
        "Halima",
        "Ruqayyah",
        "Asma",
        "Hafsa",
        "Umm",
        "Sakinah",
      ],
    },
    origins: ["Arabic", "Persian", "Turkish", "Urdu", "Malay", "Kurdish"],
  },

  hindu: {
    commonPrefixes: ["Maha", "Sri", "Adi", "Param", "Deva", "Bhagya"],
    commonSuffixes: ["ananda", "priya", "devi", "krishna", "raj", "vardhan"],
    meaningCategories: {
      divine: [
        "Lord Vishnu",
        "Goddess Lakshmi",
        "Lord Shiva",
        "Divine blessing",
      ],
      nature: ["Lotus", "Moon", "Sun", "Earth", "Water", "Fire"],
      virtues: ["Truth", "Knowledge", "Compassion", "Devotion", "Purity"],
      prosperity: ["Wealth", "Success", "Victory", "Fortune", "Abundance"],
    },
    popularNames: {
      boys: [
        "Arjun",
        "Krishna",
        "Rama",
        "Vikram",
        "Aditya",
        "Rohit",
        "Akash",
        "Pradeep",
        "Rajesh",
        "Suresh",
        "Mahesh",
        "Ganesh",
        "Ramesh",
        "Dinesh",
        "Naresh",
        "Yogesh",
      ],
      girls: [
        "Priya",
        "Kavya",
        "Ananya",
        "Sita",
        "Radha",
        "Shreya",
        "Pooja",
        "Meera",
        "Lakshmi",
        "Saraswati",
        "Parvati",
        "Durga",
        "Ganga",
        "Yamuna",
        "Gita",
        "Sushma",
      ],
    },
    origins: ["Sanskrit", "Hindi", "Tamil", "Telugu", "Bengali", "Gujarati"],
  },

  buddhist: {
    commonPrefixes: ["Bodhi", "Dharma", "Karma", "Sangha", "Buddha"],
    commonSuffixes: ["mitra", "ratna", "shanti", "bodhi", "dharma"],
    meaningCategories: {
      enlightenment: ["Awakening", "Enlightenment", "Wisdom", "Understanding"],
      peace: ["Tranquility", "Serenity", "Calm", "Peaceful", "Harmony"],
      compassion: ["Loving-kindness", "Compassion", "Mercy", "Kindness"],
      nature: ["Lotus", "Mountain", "River", "Tree", "Cloud"],
    },
    popularNames: {
      boys: ["Siddhartha", "Tenzin", "Lobsang", "Karma", "Thich", "Bodhi"],
      girls: ["Tara", "Dolma", "Pema", "Yangchen", "Choden", "Lhamo"],
    },
    origins: ["Sanskrit", "Tibetan", "Thai", "Burmese", "Japanese", "Chinese"],
  },

  christian: {
    commonPrefixes: ["Saint", "Blessed", "Holy"],
    commonSuffixes: ["el", "iah", "ael", "beth", "anna"],
    meaningCategories: {
      biblical: [
        "God is gracious",
        "Gift of God",
        "Beloved of God",
        "God has heard",
      ],
      virtues: ["Faith", "Hope", "Charity", "Grace", "Joy", "Peace"],
      angels: ["Michael", "Gabriel", "Rafael", "Uriel"],
      saints: ["Joseph", "Mary", "John", "Peter", "Paul", "Luke"],
    },
    popularNames: {
      boys: [
        "Michael",
        "John",
        "David",
        "James",
        "Matthew",
        "Daniel",
        "Andrew",
        "Peter",
        "Joshua",
        "Christopher",
        "Anthony",
        "Mark",
        "Steven",
        "Paul",
        "Kenneth",
        "Joseph",
      ],
      girls: [
        "Mary",
        "Sarah",
        "Rebecca",
        "Ruth",
        "Elizabeth",
        "Anna",
        "Grace",
        "Faith",
        "Hope",
        "Joy",
        "Charity",
        "Victoria",
        "Catherine",
        "Margaret",
        "Helen",
        "Rose",
      ],
    },
    origins: ["Hebrew", "Greek", "Latin", "Aramaic", "Armenian"],
  },

  jewish: {
    commonPrefixes: ["Bar", "Bat", "Ben"],
    commonSuffixes: ["el", "iah", "ael", "ah"],
    meaningCategories: {
      biblical: ["God remembers", "God has judged", "God is my strength"],
      heritage: ["From Judah", "Hebrew", "Of Jerusalem", "Israelite"],
      blessings: ["Blessed", "Chosen", "Favored", "Sacred"],
      nature: ["Rose", "Lily", "Cedar", "Olive"],
    },
    popularNames: {
      boys: [
        "David",
        "Benjamin",
        "Samuel",
        "Jacob",
        "Isaac",
        "Abraham",
        "Moses",
        "Aaron",
        "Noah",
        "Elijah",
        "Joshua",
        "Caleb",
        "Nathan",
        "Ethan",
        "Levi",
        "Asher",
      ],
      girls: [
        "Sarah",
        "Rebecca",
        "Rachel",
        "Leah",
        "Miriam",
        "Esther",
        "Ruth",
        "Naomi",
        "Hannah",
        "Abigail",
        "Deborah",
        "Judith",
        "Tamar",
        "Dinah",
        "Zippora",
        "Rivka",
      ],
    },
    origins: ["Hebrew", "Yiddish", "Aramaic", "Ladino"],
  },

  sikh: {
    commonPrefixes: ["Guru", "Sant", "Bhai"],
    commonSuffixes: ["singh", "kaur", "preet", "deep", "jot"],
    meaningCategories: {
      divine: ["One God", "Divine light", "God's grace", "Blessed by Guru"],
      light: ["Light", "Lamp", "Bright", "Radiant", "Illumination"],
      love: ["Love", "Beloved", "Dear", "Precious", "Cherished"],
      strength: ["Lion", "Princess", "Brave", "Warrior", "Defender"],
    },
    popularNames: {
      boys: ["Gurpreet", "Harpreet", "Manpreet", "Jaspreet", "Simran", "Arjan"],
      girls: [
        "Simran",
        "Gurleen",
        "Harleen",
        "Jaspreet",
        "Manpreet",
        "Navneet",
      ],
    },
    origins: ["Punjabi", "Gurmukhi", "Sanskrit"],
  },
};

// Industry-specific brand naming patterns
const INDUSTRY_PATTERNS = {
  technology: {
    prefixes: [
      "Tech",
      "Cyber",
      "Digital",
      "Smart",
      "Cloud",
      "Data",
      "AI",
      "Quantum",
    ],
    suffixes: [
      "Tech",
      "Labs",
      "Solutions",
      "Systems",
      "Works",
      "Hub",
      "Core",
      "X",
    ],
    keywords: [
      "Innovation",
      "Future",
      "Smart",
      "Connected",
      "Advanced",
      "Secure",
    ],
    trendingTerms: ["AI", "Cloud", "Quantum", "Blockchain", "IoT", "VR", "AR"],
  },

  healthcare: {
    prefixes: [
      "Health",
      "Med",
      "Care",
      "Vital",
      "Life",
      "Wellness",
      "Bio",
      "Pharma",
    ],
    suffixes: [
      "Care",
      "Health",
      "Med",
      "Life",
      "Wellness",
      "Plus",
      "Pro",
      "360",
    ],
    keywords: [
      "Healing",
      "Wellness",
      "Care",
      "Life",
      "Health",
      "Medical",
      "Vital",
    ],
    trendingTerms: ["Telehealth", "Digital Health", "Precision", "Genomics"],
  },

  finance: {
    prefixes: [
      "Capital",
      "Wealth",
      "Asset",
      "Financial",
      "Money",
      "Cash",
      "Credit",
    ],
    suffixes: ["Finance", "Capital", "Wealth", "Pay", "Bank", "Fund", "Invest"],
    keywords: [
      "Trust",
      "Security",
      "Growth",
      "Prosperity",
      "Stability",
      "Wealth",
    ],
    trendingTerms: ["Fintech", "Crypto", "Digital Banking", "Robo-advisor"],
  },

  education: {
    prefixes: ["Edu", "Learn", "Study", "Academic", "Scholar", "Brain", "Mind"],
    suffixes: ["Learn", "Edu", "Academy", "School", "University", "Institute"],
    keywords: ["Knowledge", "Learning", "Growth", "Wisdom", "Skills", "Future"],
    trendingTerms: [
      "EdTech",
      "Online Learning",
      "AI Tutoring",
      "Microlearning",
    ],
  },

  food: {
    prefixes: ["Fresh", "Tasty", "Delicious", "Gourmet", "Farm", "Organic"],
    suffixes: ["Kitchen", "Bistro", "Café", "Grill", "Fresh", "Foods"],
    keywords: [
      "Fresh",
      "Delicious",
      "Quality",
      "Organic",
      "Gourmet",
      "Healthy",
    ],
    trendingTerms: ["Plant-based", "Sustainable", "Farm-to-table", "Artisanal"],
  },
};

// Brand style characteristics
const BRAND_STYLE_PATTERNS = {
  professional: {
    characteristics: ["Clear", "Trustworthy", "Established", "Reliable"],
    namePatterns: [
      "Conservative spelling",
      "Industry terms",
      "Geographic references",
    ],
    examples: ["Goldman Sachs", "McKinsey", "Deloitte"],
  },

  creative: {
    characteristics: ["Imaginative", "Unique", "Artistic", "Expressive"],
    namePatterns: ["Made-up words", "Creative spellings", "Metaphorical names"],
    examples: ["Spotify", "Etsy", "Airbnb"],
  },

  playful: {
    characteristics: ["Fun", "Approachable", "Energetic", "Youthful"],
    namePatterns: ["Casual language", "Puns", "Fun spellings"],
    examples: ["Google", "Yahoo", "Snapchat"],
  },

  luxury: {
    characteristics: ["Elegant", "Sophisticated", "Premium", "Exclusive"],
    namePatterns: ["Foreign words", "Founder names", "Heritage references"],
    examples: ["Hermès", "Rolex", "Tesla"],
  },

  minimal: {
    characteristics: ["Simple", "Clean", "Direct", "Uncluttered"],
    namePatterns: ["Short words", "Simple spelling", "Clear meaning"],
    examples: ["Apple", "Nike", "Uber"],
  },
};

// Common name meanings by category
const MEANING_CATEGORIES = {
  divine: {
    islamic: ["Allah", "Rahman", "Rahim", "Khaliq", "Malik"],
    hindu: ["Brahma", "Vishnu", "Shiva", "Devi", "Ganesha"],
    buddhist: ["Buddha", "Dharma", "Sangha", "Nirvana"],
    christian: ["God", "Jesus", "Holy Spirit", "Trinity"],
    jewish: ["Yahweh", "Elohim", "Adonai"],
    sikh: ["Waheguru", "Satnam", "Onkar"],
  },

  virtues: [
    "Honesty",
    "Courage",
    "Wisdom",
    "Compassion",
    "Patience",
    "Justice",
    "Mercy",
    "Kindness",
    "Humility",
    "Generosity",
  ],

  nature: [
    "Sun",
    "Moon",
    "Stars",
    "Ocean",
    "Mountain",
    "River",
    "Tree",
    "Flower",
    "Bird",
    "Lion",
    "Eagle",
    "Deer",
  ],

  emotions: [
    "Joy",
    "Peace",
    "Love",
    "Hope",
    "Faith",
    "Bliss",
    "Serenity",
    "Contentment",
    "Happiness",
    "Delight",
  ],
};

// Regional variations and pronunciations
const REGIONAL_VARIATIONS = {
  arabic: {
    regions: ["Gulf", "Levant", "Egypt", "Maghreb", "Sudan"],
    pronunciationGuides: {
      ح: "strong H sound",
      خ: "like German 'ach'",
      ع: "deep guttural sound",
      غ: "rolled R + G",
      ق: "deep K sound",
    },
  },

  persian: {
    regions: ["Iran", "Afghanistan", "Tajikistan"],
    characteristics:
      "Softer sounds than Arabic, influenced by Indo-European roots",
  },

  urdu: {
    regions: ["Pakistan", "India"],
    characteristics: "Arabic-Persian script with Sanskrit vocabulary influence",
  },

  sanskrit: {
    influence: "Hindu, Buddhist, and some Sikh names",
    characteristics: "Complex phonetics, spiritual meanings",
  },
};

// Name popularity trends
const POPULARITY_TRENDS = {
  traditional: {
    characteristics: [
      "Time-tested",
      "Cultural significance",
      "Family heritage",
    ],
    examples: ["Muhammad", "Aisha", "David", "Mary"],
  },

  modern: {
    characteristics: [
      "Contemporary sound",
      "Easy pronunciation",
      "Global appeal",
    ],
    examples: ["Zara", "Ryan", "Maya", "Alex"],
  },

  unique: {
    characteristics: ["Rare usage", "Distinctive sound", "Special meaning"],
    examples: ["Azalea", "Orion", "Seraphina", "Phoenix"],
  },
};

// Gender-specific naming patterns
const GENDER_PATTERNS = {
  masculine: {
    commonEndings: ["ar", "an", "ud", "id", "al"],
    strongConsonants: ["k", "t", "d", "r", "m"],
    examples: ["Omar", "Khalid", "Tariq", "Saad"],
  },

  feminine: {
    commonEndings: ["a", "ah", "iya", "een", "iya"],
    softSounds: ["l", "n", "m", "y", "w"],
    examples: ["Aisha", "Layla", "Amina", "Nour"],
  },

  unisex: {
    characteristics: ["Neutral endings", "Virtue-based", "Nature-inspired"],
    examples: ["Noor", "Salam", "Aman", "Farah"],
  },
};

// Brand naming best practices
const BRAND_NAMING_RULES = {
  length: {
    short: {
      min: 3,
      max: 6,
      benefits: ["Easy to remember", "Good for logos", "Mobile-friendly"],
    },
    medium: {
      min: 7,
      max: 10,
      benefits: ["Descriptive potential", "Balanced memorability"],
    },
    long: {
      min: 11,
      max: 15,
      benefits: ["Descriptive", "Unique", "Keyword-rich"],
    },
  },

  phonetics: {
    goodSounds: ["Hard consonants", "Clear vowels", "Rhythmic patterns"],
    avoidSounds: [
      "Difficult clusters",
      "Ambiguous pronunciations",
      "Negative associations",
    ],
  },

  legal: {
    avoid: ["Existing trademarks", "Generic terms", "Geographical limitations"],
    consider: [
      "Domain availability",
      "Social media handles",
      "International markets",
    ],
  },
};

// Cultural naming etiquette
const CULTURAL_ETIQUETTE = {
  islamic: {
    preferred: [
      "Names of prophets",
      "99 names of Allah attributes",
      "Companions' names",
    ],
    avoided: ["Names with negative meanings", "Names of enemies of Islam"],
    traditions: [
      "Aqiqah ceremony",
      "Family elder consultation",
      "Religious significance",
    ],
  },

  hindu: {
    preferred: ["Deity names", "Virtue-based names", "Nature-inspired names"],
    considerations: [
      "Nakshatra influence",
      "Family traditions",
      "Astrological compatibility",
    ],
    traditions: [
      "Namakaran ceremony",
      "Pandit consultation",
      "Auspicious timing",
    ],
  },

  buddhist: {
    preferred: ["Virtue names", "Enlightenment concepts", "Peaceful meanings"],
    considerations: [
      "Spiritual significance",
      "Teacher's blessing",
      "Karmic implications",
    ],
    traditions: ["Monk blessing", "Temple ceremony", "Dharma names"],
  },
};

// Modern naming trends
const MODERN_TRENDS = {
  globalization: [
    "Cross-cultural name adoption",
    "Simplified spellings for international use",
    "Pronunciation-friendly variations",
  ],

  technology: [
    "App-friendly names",
    "Social media compatibility",
    "Domain availability priority",
    "SEO considerations",
  ],

  branding: [
    "Brandable vs descriptive",
    "Emotional connection",
    "Story potential",
    "Scalability",
  ],
};

module.exports = {
  CULTURAL_NAME_DATA,
  INDUSTRY_PATTERNS,
  BRAND_STYLE_PATTERNS,
  MEANING_CATEGORIES,
  REGIONAL_VARIATIONS,
  POPULARITY_TRENDS,
  GENDER_PATTERNS,
  BRAND_NAMING_RULES,
  CULTURAL_ETIQUETTE,
  MODERN_TRENDS,
};
