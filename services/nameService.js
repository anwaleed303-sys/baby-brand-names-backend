// const { callOpenRouterAPI } = require("./openRouterService");
// const { CULTURAL_NAME_DATA } = require("../data/culturalData");
// const { validateNameRequest } = require("../utils/validation");

// class NameService {
//   async generateBabyNames(formData) {
//     try {
//       console.log("Generating baby names with data:", formData);

//       // Validate request
//       validateNameRequest(formData, "baby");

//       // Create prompt for LLM
//       const prompt = this.createBabyNamePrompt(formData);

//       // Call OpenRouter API
//       const response = await callOpenRouterAPI(prompt, "baby");

//       // Parse and format response
//       const names = this.parseBabyNameResponse(response, formData);

//       console.log(`Generated ${names.length} baby names`);
//       return names;
//     } catch (error) {
//       console.error("Baby name generation error:", error);
//       throw new Error(`Failed to generate baby names: ${error.message}`);
//     }
//   }

//   async generateBrandNames(formData) {
//     try {
//       console.log("Generating brand names with data:", formData);

//       // Validate request
//       validateNameRequest(formData, "brand");

//       // Create prompt for LLM
//       const prompt = this.createBrandNamePrompt(formData);

//       // Call OpenRouter API
//       const response = await callOpenRouterAPI(prompt, "brand");

//       // Parse and format response
//       const names = this.parseBrandNameResponse(response, formData);

//       console.log(`Generated ${names.length} brand names`);
//       return names;
//     } catch (error) {
//       console.error("Brand name generation error:", error);
//       throw new Error(`Failed to generate brand names: ${error.message}`);
//     }
//   }

//   createBabyNamePrompt(formData) {
//     const {
//       gender = "unisex",
//       religion = "modern",
//       origin,
//       keywords = [],
//       meaning,
//       startsWith,
//       endsWith,
//       length = "medium",
//     } = formData;

//     let prompt = `Generate 20 unique, meaningful baby names with the following criteria:

// **Requirements:**
// - Gender: ${gender}
// - Cultural/Religious Background: ${religion}
// ${origin ? `- Specific Origin: ${origin}` : ""}
// ${keywords.length ? `- Preferred Meanings: ${keywords.join(", ")}` : ""}
// ${meaning ? `- Specific Meaning: ${meaning}` : ""}
// ${startsWith ? `- Must start with: ${startsWith}` : ""}
// ${endsWith ? `- Must end with: ${endsWith}` : ""}
// - Name Length: ${length}

// **Cultural Context:**
// ${this.getCulturalContext(religion)}

// **Output Format (JSON array):**
// [
//   {
//     "name": "Aisha",
//     "meaning": "Living, prosperous",
//     "origin": "Arabic",
//     "pronunciation": "AH-ee-shah",
//     "category": "Traditional",
//     "popularity": "Popular",
//     "description": "A beautiful name meaning 'alive' or 'living one', traditionally associated with vitality and prosperity.",
//     "culturalSignificance": "Aisha was the name of Prophet Muhammad's wife, known for her intelligence and scholarship.",
//     "historicalFigures": ["Aisha bint Abu Bakr"],
//     "variations": ["Ayesha", "Aishah", "Aisa"]
//   }
// ]

// **Important Guidelines:**
// 1. Each name must be authentic and culturally appropriate
// 2. Provide accurate meanings and origins
// 3. Include proper pronunciation guides
// 4. Ensure cultural sensitivity and respect
// 5. Generate exactly 20 unique names
// 6. Return only the JSON array, no additional text`;

//     return prompt;
//   }

//   createBrandNamePrompt(formData) {
//     const {
//       industry = "technology",
//       style = "modern",
//       keywords = [],
//       description,
//       targetAudience,
//       length = "medium",
//       avoidNumbers = true,
//     } = formData;

//     let prompt = `Generate 20 unique, modern brand names with the following criteria:

// **Requirements:**
// - Industry: ${industry}
// - Brand Style: ${style}
// ${keywords.length ? `- Keywords/Concepts: ${keywords.join(", ")}` : ""}
// ${description ? `- Business Description: ${description}` : ""}
// ${targetAudience ? `- Target Audience: ${targetAudience}` : ""}
// - Name Length: ${length}
// ${avoidNumbers ? "- Avoid numbers in names" : ""}

// **Industry Context:**
// ${this.getIndustryContext(industry)}

// **Output Format (JSON array):**
// [
//   {
//     "name": "Nexura",
//     "meaning": "Next-generation solutions",
//     "category": "Technology",
//     "description": "A modern, tech-forward name combining 'next' and 'aura' to suggest innovative solutions.",
//     "domainAvailable": true,
//     "variations": ["Nexur", "Nexura.io", "Nexuris"],
//     "targetAudience": "Tech-savvy professionals",
//     "brandPersonality": ["Innovative", "Trustworthy", "Modern"],
//     "memorability": "High",
//     "pronunciation": "NEX-you-rah"
//   }
// ]

// **Important Guidelines:**
// 1. Names should be brandable and memorable
// 2. Avoid trademark conflicts with major brands
// 3. Consider global pronunciation and cultural sensitivity
// 4. Generate names that work well as domains
// 5. Include variations and alternative spellings
// 6. Ensure names align with the specified style and industry
// 7. Generate exactly 20 unique names
// 8. Return only the JSON array, no additional text`;

//     return prompt;
//   }

//   getCulturalContext(religion) {
//     const contexts = {
//       islamic:
//         "Islamic names often reference Allah's 99 names, prophets, companions, or virtues mentioned in the Quran. They should be meaningful and carry positive connotations.",
//       hindu:
//         "Hindu names often derive from Sanskrit and reference deities, virtues, nature, or astrological elements. They should reflect spiritual or positive qualities.",
//       buddhist:
//         "Buddhist names reflect enlightenment, peace, compassion, and spiritual virtues. They often have Sanskrit or regional origins.",
//       christian:
//         "Christian names often come from the Bible, saints, or Christian virtues. They should have spiritual significance or positive meanings.",
//       jewish:
//         "Jewish names often have Hebrew origins, biblical connections, or relate to Jewish heritage and traditions.",
//       sikh: "Sikh names often reference divine light, love, or spiritual concepts. Boys traditionally have 'Singh' and girls 'Kaur' as surnames.",
//       modern:
//         "Modern names can be from any culture but should be contemporary, easy to pronounce, and suitable for global use.",
//     };

//     return contexts[religion] || contexts.modern;
//   }

//   getIndustryContext(industry) {
//     const contexts = {
//       technology:
//         "Tech brands should convey innovation, reliability, and forward-thinking. Consider names that suggest connectivity, intelligence, or digital solutions.",
//       healthcare:
//         "Healthcare brands should inspire trust, care, and professionalism. Names should suggest healing, wellness, or medical expertise.",
//       finance:
//         "Financial brands should convey security, growth, and reliability. Consider names that suggest prosperity, stability, or financial wisdom.",
//       education:
//         "Educational brands should suggest knowledge, growth, and enlightenment. Names should inspire learning and intellectual development.",
//       food: "Food brands should be appetizing, memorable, and evoke positive emotions. Consider names that suggest taste, quality, or culinary excellence.",
//       fashion:
//         "Fashion brands should be stylish, memorable, and evoke desired emotions. Consider names that suggest elegance, style, or personal expression.",
//       travel:
//         "Travel brands should evoke wanderlust, adventure, and discovery. Names should suggest exploration, comfort, or memorable experiences.",
//       consulting:
//         "Consulting brands should convey expertise, trust, and results. Names should suggest guidance, strategy, or professional excellence.",
//     };

//     return (
//       contexts[industry] ||
//       "Create names that are professional, memorable, and appropriate for the business context."
//     );
//   }

//   parseBabyNameResponse(response, formData) {
//     try {
//       // Clean the response - remove any markdown formatting or extra text
//       let cleanResponse = response.trim();

//       // Extract JSON array from response
//       const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
//       if (!jsonMatch) {
//         throw new Error("No valid JSON array found in response");
//       }

//       const names = JSON.parse(jsonMatch[0]);

//       // Validate and enhance each name
//       return names.map((name, index) => ({
//         id: Date.now() + index,
//         name: name.name || `Name ${index + 1}`,
//         meaning: name.meaning || "Meaningful name",
//         origin: name.origin || this.getDefaultOrigin(formData.religion),
//         pronunciation: name.pronunciation || name.name?.toLowerCase(),
//         category: name.category || "Traditional",
//         popularity: name.popularity || "Moderate",
//         description:
//           name.description ||
//           `A beautiful ${
//             formData.gender || "baby"
//           } name with cultural significance.`,
//         culturalSignificance:
//           name.culturalSignificance ||
//           "Rich cultural heritage and spiritual significance.",
//         historicalFigures: name.historicalFigures || [],
//         variations: name.variations || [],
//         type: "baby",
//       }));
//     } catch (error) {
//       console.error("Error parsing baby name response:", error);
//       // Return fallback names if parsing fails
//       return this.getFallbackBabyNames(formData);
//     }
//   }

//   parseBrandNameResponse(response, formData) {
//     try {
//       // Clean the response - remove any markdown formatting or extra text
//       let cleanResponse = response.trim();

//       // Extract JSON array from response
//       const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
//       if (!jsonMatch) {
//         throw new Error("No valid JSON array found in response");
//       }

//       const names = JSON.parse(jsonMatch[0]);

//       // Validate and enhance each name
//       return names.map((name, index) => ({
//         id: Date.now() + index,
//         name: name.name || `Brand ${index + 1}`,
//         meaning: name.meaning || "Innovative business name",
//         category: name.category || formData.industry || "Business",
//         description:
//           name.description ||
//           `A modern ${
//             formData.industry || "business"
//           } name suggesting innovation and growth.`,
//         domainAvailable:
//           name.domainAvailable !== undefined
//             ? name.domainAvailable
//             : Math.random() > 0.4,
//         variations: name.variations || [],
//         targetAudience:
//           name.targetAudience || formData.targetAudience || "Modern businesses",
//         brandPersonality: name.brandPersonality || [
//           "Professional",
//           "Innovative",
//         ],
//         memorability: name.memorability || "High",
//         pronunciation: name.pronunciation || name.name?.toLowerCase(),
//         type: "brand",
//       }));
//     } catch (error) {
//       console.error("Error parsing brand name response:", error);
//       // Return fallback names if parsing fails
//       return this.getFallbackBrandNames(formData);
//     }
//   }

//   getDefaultOrigin(religion) {
//     const origins = {
//       islamic: "Arabic",
//       hindu: "Sanskrit",
//       buddhist: "Sanskrit",
//       christian: "Hebrew",
//       jewish: "Hebrew",
//       sikh: "Punjabi",
//       modern: "Various",
//     };
//     return origins[religion] || "Various";
//   }

//   getFallbackBabyNames(formData) {
//     const fallbackNames = [
//       {
//         id: Date.now() + 1,
//         name: formData.gender === "girl" ? "Aisha" : "Omar",
//         meaning:
//           formData.gender === "girl"
//             ? "Living, prosperous"
//             : "Flourishing, long-lived",
//         origin: "Arabic",
//         pronunciation: formData.gender === "girl" ? "AH-ee-shah" : "OH-mar",
//         category: "Traditional",
//         popularity: "Popular",
//         description: `A beautiful ${
//           formData.gender || "baby"
//         } name with deep cultural significance.`,
//         culturalSignificance: "Rich Islamic heritage and spiritual meaning.",
//         historicalFigures: [],
//         variations: [],
//         type: "baby",
//       },
//     ];

//     // Generate 19 more similar fallback names
//     for (let i = 2; i <= 20; i++) {
//       fallbackNames.push({
//         id: Date.now() + i,
//         name: `Name ${i}`,
//         meaning: "Beautiful meaning",
//         origin: this.getDefaultOrigin(formData.religion),
//         pronunciation: `name-${i}`,
//         category: "Traditional",
//         popularity: "Moderate",
//         description: `A meaningful ${formData.gender || "baby"} name.`,
//         culturalSignificance: "Cultural significance.",
//         historicalFigures: [],
//         variations: [],
//         type: "baby",
//       });
//     }

//     return fallbackNames;
//   }

//   getFallbackBrandNames(formData) {
//     const fallbackNames = [
//       {
//         id: Date.now() + 1,
//         name: "Nexura",
//         meaning: "Next-generation solutions",
//         category: formData.industry || "Technology",
//         description:
//           "A modern, tech-forward name suggesting innovative solutions.",
//         domainAvailable: true,
//         variations: ["Nexur", "Nexura.io", "Nexuris"],
//         targetAudience: formData.targetAudience || "Tech-savvy professionals",
//         brandPersonality: ["Innovative", "Trustworthy", "Modern"],
//         memorability: "High",
//         pronunciation: "NEX-you-rah",
//         type: "brand",
//       },
//     ];

//     // Generate 19 more similar fallback names
//     for (let i = 2; i <= 20; i++) {
//       fallbackNames.push({
//         id: Date.now() + i,
//         name: `Brand${i}`,
//         meaning: "Business excellence",
//         category: formData.industry || "Business",
//         description: `A modern ${formData.industry || "business"} name.`,
//         domainAvailable: Math.random() > 0.4,
//         variations: [`Brand${i}X`, `Brand${i}Pro`],
//         targetAudience: formData.targetAudience || "Modern businesses",
//         brandPersonality: ["Professional", "Reliable"],
//         memorability: "Good",
//         pronunciation: `brand-${i}`,
//         type: "brand",
//       });
//     }

//     return fallbackNames;
//   }

//   async getNameSuggestions(query, type) {
//     try {
//       const prompt = `Based on the search query "${query}", suggest 5 ${type} names that are similar or related.
//       Return as JSON array with format: [{"name": "example", "reason": "why it's similar"}]`;

//       const response = await callOpenRouterAPI(prompt, type);

//       // Parse suggestions
//       const jsonMatch = response.match(/\[[\s\S]*\]/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }

//       return [];
//     } catch (error) {
//       console.error("Name suggestions error:", error);
//       return [];
//     }
//   }

//   async getNameDetails(name, type) {
//     try {
//       const prompt = `Provide detailed information about the ${type} name "${name}".
//       Include etymology, cultural significance, famous people with this name, and interesting facts.
//       Return as JSON object with format:
//       {
//         "etymology": "origin and history",
//         "culturalSignificance": "cultural meaning",
//         "famousPeople": ["list of famous people"],
//         "interestingFacts": ["list of facts"],
//         "numerology": "numerological meaning if applicable",
//         "modernUsage": "how it's used today"
//       }`;

//       const response = await callOpenRouterAPI(prompt, type);

//       // Parse details
//       const jsonMatch = response.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }

//       return {
//         etymology: "Rich historical background",
//         culturalSignificance: "Significant cultural meaning",
//         famousPeople: [],
//         interestingFacts: [],
//         modernUsage: "Popular in contemporary usage",
//       };
//     } catch (error) {
//       console.error("Name details error:", error);
//       return {
//         etymology: "Historical background available",
//         culturalSignificance: "Cultural significance present",
//         famousPeople: [],
//         interestingFacts: [],
//         modernUsage: "Used in modern contexts",
//       };
//     }
//   }
// }

// const nameService = new NameService();

// module.exports = {
//   generateBabyNames: (formData) => nameService.generateBabyNames(formData),
//   generateBrandNames: (formData) => nameService.generateBrandNames(formData),
//   getNameSuggestions: (query, type) =>
//     nameService.getNameSuggestions(query, type),
//   getNameDetails: (name, type) => nameService.getNameDetails(name, type),
// };

const { callOpenRouterAPI } = require("./openRouterService");
const { CULTURAL_NAME_DATA } = require("../data/culturalData");
const { validateNameRequest } = require("../utils/validation");

class NameService {
  async generateBabyNames(formData) {
    try {
      console.log("Generating baby names with data:", formData);

      // Validate request
      validateNameRequest(formData, "baby");

      // Create prompt for LLM
      const prompt = this.createBabyNamePrompt(formData);

      // Call OpenRouter API
      const response = await callOpenRouterAPI(prompt, "baby");

      // Parse and format response - Fixed parsing
      const names = this.parseBabyNameResponse(response, formData);

      console.log(`Generated ${names.length} baby names`);
      return names;
    } catch (error) {
      console.error("Baby name generation error:", error);
      throw new Error(`Failed to generate baby names: ${error.message}`);
    }
  }

  async generateBrandNames(formData) {
    try {
      console.log("Generating brand names with data:", formData);

      // Validate request
      validateNameRequest(formData, "brand");

      // Create prompt for LLM
      const prompt = this.createBrandNamePrompt(formData);

      // Call OpenRouter API
      const response = await callOpenRouterAPI(prompt, "brand");

      // Parse and format response - Fixed parsing
      const names = this.parseBrandNameResponse(response, formData);

      console.log(`Generated ${names.length} brand names`);
      return names;
    } catch (error) {
      console.error("Brand name generation error:", error);
      throw new Error(`Failed to generate brand names: ${error.message}`);
    }
  }

  createBabyNamePrompt(formData) {
    const {
      gender = "unisex",
      religion = "modern",
      origin,
      keywords = [],
      meaning,
      startsWith,
      endsWith,
      length = "medium",
    } = formData;

    let prompt = `Generate 20 unique, authentic baby names with the following criteria:

**Requirements:**
- Gender: ${gender}
- Cultural/Religious Background: ${religion}
${origin ? `- Specific Origin: ${origin}` : ""}
${keywords.length ? `- Preferred Meanings: ${keywords.join(", ")}` : ""}
${meaning ? `- Specific Meaning: ${meaning}` : ""}
${startsWith ? `- Must start with: ${startsWith}` : ""}
${endsWith ? `- Must end with: ${endsWith}` : ""}
- Name Length: ${length}

**Cultural Context:**
${this.getCulturalContext(religion)}

**CRITICAL INSTRUCTIONS:**
1. Generate ONLY authentic, real names from actual cultural traditions
2. NO placeholder names like "Name 1", "Name 2", "Generic Name" etc.
3. Each name must be historically and culturally accurate
4. All names must be different and unique
5. Return ONLY the JSON array, no additional text or markdown

**Output Format (JSON array only):**
[
  {
    "name": "Aisha",
    "meaning": "Living, prosperous",
    "origin": "Arabic",
    "pronunciation": "AH-ee-shah",
    "category": "Traditional",
    "popularity": "Popular",
    "description": "A beautiful name meaning 'alive' or 'living one', traditionally associated with vitality and prosperity.",
    "culturalSignificance": "Aisha was the name of Prophet Muhammad's wife, known for her intelligence and scholarship.",
    "historicalFigures": ["Aisha bint Abu Bakr"],
    "variations": ["Ayesha", "Aishah", "Aisa"]
  }
]

Generate exactly 20 unique, authentic names following this format.`;

    return prompt;
  }

  createBrandNamePrompt(formData) {
    const {
      industry = "technology",
      style = "modern",
      keywords = [],
      description,
      targetAudience,
      length = "medium",
      avoidNumbers = true,
    } = formData;

    let prompt = `Generate 20 unique, creative brand names with the following criteria:

**Requirements:**
- Industry: ${industry}
- Brand Style: ${style}
${keywords.length ? `- Keywords/Concepts: ${keywords.join(", ")}` : ""}
${description ? `- Business Description: ${description}` : ""}
${targetAudience ? `- Target Audience: ${targetAudience}` : ""}
- Name Length: ${length}
${avoidNumbers ? "- Avoid numbers in names" : ""}

**Industry Context:**
${this.getIndustryContext(industry)}

**CRITICAL INSTRUCTIONS:**
1. Generate ONLY creative, brandable names suitable for business
2. NO placeholder names like "Brand 1", "Brand 2", "Generic Brand" etc.
3. Each name must be memorable and professionally viable
4. All names must be different and unique
5. Return ONLY the JSON array, no additional text or markdown

**Output Format (JSON array only):**
[
  {
    "name": "Nexura",
    "meaning": "Next-generation solutions",
    "category": "Technology",
    "description": "A modern, tech-forward name combining 'next' and 'aura' to suggest innovative solutions.",
    "domainAvailable": true,
    "variations": ["Nexur", "Nexura.io", "Nexuris"],
    "targetAudience": "Tech-savvy professionals",
    "brandPersonality": ["Innovative", "Trustworthy", "Modern"],
    "memorability": "High",
    "pronunciation": "NEX-you-rah"
  }
]

Generate exactly 20 unique, creative names following this format.`;

    return prompt;
  }

  getCulturalContext(religion) {
    const contexts = {
      islamic:
        "Islamic names often reference Allah's 99 names, prophets, companions, or virtues mentioned in the Quran. They should be meaningful and carry positive connotations.",
      hindu:
        "Hindu names often derive from Sanskrit and reference deities, virtues, nature, or astrological elements. They should reflect spiritual or positive qualities.",
      buddhist:
        "Buddhist names reflect enlightenment, peace, compassion, and spiritual virtues. They often have Sanskrit or regional origins.",
      christian:
        "Christian names often come from the Bible, saints, or Christian virtues. They should have spiritual significance or positive meanings.",
      jewish:
        "Jewish names often have Hebrew origins, biblical connections, or relate to Jewish heritage and traditions.",
      sikh: "Sikh names often reference divine light, love, or spiritual concepts. Boys traditionally have 'Singh' and girls 'Kaur' as surnames.",
      modern:
        "Modern names can be from any culture but should be contemporary, easy to pronounce, and suitable for global use.",
    };

    return contexts[religion] || contexts.modern;
  }

  getIndustryContext(industry) {
    const contexts = {
      technology:
        "Tech brands should convey innovation, reliability, and forward-thinking. Consider names that suggest connectivity, intelligence, or digital solutions.",
      healthcare:
        "Healthcare brands should inspire trust, care, and professionalism. Names should suggest healing, wellness, or medical expertise.",
      finance:
        "Financial brands should convey security, growth, and reliability. Consider names that suggest prosperity, stability, or financial wisdom.",
      education:
        "Educational brands should suggest knowledge, growth, and enlightenment. Names should inspire learning and intellectual development.",
      food: "Food brands should be appetizing, memorable, and evoke positive emotions. Consider names that suggest taste, quality, or culinary excellence.",
      fashion:
        "Fashion brands should be stylish, memorable, and evoke desired emotions. Consider names that suggest elegance, style, or personal expression.",
      travel:
        "Travel brands should evoke wanderlust, adventure, and discovery. Names should suggest exploration, comfort, or memorable experiences.",
      consulting:
        "Consulting brands should convey expertise, trust, and results. Names should suggest guidance, strategy, or professional excellence.",
    };

    return (
      contexts[industry] ||
      "Create names that are professional, memorable, and appropriate for the business context."
    );
  }

  parseBabyNameResponse(response, formData) {
    try {
      console.log("Raw API response:", response);

      // Handle if response is already an object from the updated openRouterService
      if (response && response.names && Array.isArray(response.names)) {
        console.log("Response already formatted by openRouterService");
        return response.names.map((name, index) => ({
          id: name.id || Date.now() + index,
          name: name.name,
          meaning: name.meaning || "Meaningful name",
          origin: name.origin || this.getDefaultOrigin(formData.religion),
          pronunciation: name.pronunciation || name.name?.toLowerCase(),
          category: name.category || "Traditional",
          popularity: name.popularity || "Moderate",
          description:
            name.description ||
            `A beautiful ${
              formData.gender || "baby"
            } name with cultural significance.`,
          culturalSignificance:
            name.culturalSignificance ||
            "Rich cultural heritage and spiritual significance.",
          historicalFigures: name.historicalFigures || [],
          variations: name.variations || [],
          type: "baby",
        }));
      }

      // Original parsing logic for string responses
      let cleanResponse = response.trim();

      // Remove markdown formatting
      cleanResponse = cleanResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // Extract JSON array from response
      const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn("No valid JSON array found, attempting fallback parsing");
        throw new Error("No valid JSON array found in response");
      }

      let names = JSON.parse(jsonMatch[0]);

      // Validate names are authentic (not placeholders)
      const hasPlaceholders = names.some(
        (name) =>
          !name.name ||
          name.name.toLowerCase().includes("name ") ||
          name.name.match(/^name\s*\d+$/i) ||
          name.name.toLowerCase().includes("generic") ||
          name.name.toLowerCase().includes("placeholder")
      );

      if (hasPlaceholders) {
        console.warn(
          "API returned placeholder names, falling back to generic names"
        );
        throw new Error("API returned placeholder names");
      }

      // Validate and enhance each name
      return names.map((name, index) => ({
        id: Date.now() + index,
        name: name.name || `Name ${index + 1}`,
        meaning: name.meaning || "Meaningful name",
        origin: name.origin || this.getDefaultOrigin(formData.religion),
        pronunciation: name.pronunciation || name.name?.toLowerCase(),
        category: name.category || "Traditional",
        popularity: name.popularity || "Moderate",
        description:
          name.description ||
          `A beautiful ${
            formData.gender || "baby"
          } name with cultural significance.`,
        culturalSignificance:
          name.culturalSignificance ||
          "Rich cultural heritage and spiritual significance.",
        historicalFigures: name.historicalFigures || [],
        variations: name.variations || [],
        type: "baby",
      }));
    } catch (error) {
      console.error("Error parsing baby name response:", error);
      // Return fallback names if parsing fails
      return this.getFallbackBabyNames(formData);
    }
  }

  parseBrandNameResponse(response, formData) {
    try {
      console.log("Raw API response:", response);

      // Handle if response is already an object from the updated openRouterService
      if (response && response.names && Array.isArray(response.names)) {
        console.log("Response already formatted by openRouterService");
        return response.names.map((name, index) => ({
          id: name.id || Date.now() + index,
          name: name.name,
          meaning: name.meaning || "Innovative business name",
          category: name.category || formData.industry || "Business",
          description:
            name.description ||
            `A modern ${
              formData.industry || "business"
            } name suggesting innovation and growth.`,
          domainAvailable:
            name.domainAvailable !== undefined
              ? name.domainAvailable
              : Math.random() > 0.4,
          variations: name.variations || [],
          targetAudience:
            name.targetAudience ||
            formData.targetAudience ||
            "Modern businesses",
          brandPersonality: name.brandPersonality || [
            "Professional",
            "Innovative",
          ],
          memorability: name.memorability || "High",
          pronunciation: name.pronunciation || name.name?.toLowerCase(),
          type: "brand",
        }));
      }

      // Original parsing logic for string responses
      let cleanResponse = response.trim();

      // Remove markdown formatting
      cleanResponse = cleanResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // Extract JSON array from response
      const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn("No valid JSON array found, attempting fallback parsing");
        throw new Error("No valid JSON array found in response");
      }

      let names = JSON.parse(jsonMatch[0]);

      // Validate names are authentic (not placeholders)
      const hasPlaceholders = names.some(
        (name) =>
          !name.name ||
          name.name.toLowerCase().includes("brand ") ||
          name.name.match(/^brand\s*\d+$/i) ||
          name.name.toLowerCase().includes("generic") ||
          name.name.toLowerCase().includes("placeholder")
      );

      if (hasPlaceholders) {
        console.warn(
          "API returned placeholder names, falling back to generic names"
        );
        throw new Error("API returned placeholder names");
      }

      // Validate and enhance each name
      return names.map((name, index) => ({
        id: Date.now() + index,
        name: name.name || `Brand ${index + 1}`,
        meaning: name.meaning || "Innovative business name",
        category: name.category || formData.industry || "Business",
        description:
          name.description ||
          `A modern ${
            formData.industry || "business"
          } name suggesting innovation and growth.`,
        domainAvailable:
          name.domainAvailable !== undefined
            ? name.domainAvailable
            : Math.random() > 0.4,
        variations: name.variations || [],
        targetAudience:
          name.targetAudience || formData.targetAudience || "Modern businesses",
        brandPersonality: name.brandPersonality || [
          "Professional",
          "Innovative",
        ],
        memorability: name.memorability || "High",
        pronunciation: name.pronunciation || name.name?.toLowerCase(),
        type: "brand",
      }));
    } catch (error) {
      console.error("Error parsing brand name response:", error);
      // Return fallback names if parsing fails
      return this.getFallbackBrandNames(formData);
    }
  }

  getDefaultOrigin(religion) {
    const origins = {
      islamic: "Arabic",
      hindu: "Sanskrit",
      buddhist: "Sanskrit",
      christian: "Hebrew",
      jewish: "Hebrew",
      sikh: "Punjabi",
      modern: "Various",
    };
    return origins[religion] || "Various";
  }

  getFallbackBabyNames(formData) {
    const fallbackNames = [
      {
        id: Date.now() + 1,
        name: formData.gender === "girl" ? "Aisha" : "Omar",
        meaning:
          formData.gender === "girl"
            ? "Living, prosperous"
            : "Flourishing, long-lived",
        origin: "Arabic",
        pronunciation: formData.gender === "girl" ? "AH-ee-shah" : "OH-mar",
        category: "Traditional",
        popularity: "Popular",
        description: `A beautiful ${
          formData.gender || "baby"
        } name with deep cultural significance.`,
        culturalSignificance: "Rich Islamic heritage and spiritual meaning.",
        historicalFigures: [],
        variations: [],
        type: "baby",
      },
    ];

    // Generate 19 more similar fallback names
    for (let i = 2; i <= 20; i++) {
      fallbackNames.push({
        id: Date.now() + i,
        name: `Name ${i}`,
        meaning: "Beautiful meaning",
        origin: this.getDefaultOrigin(formData.religion),
        pronunciation: `name-${i}`,
        category: "Traditional",
        popularity: "Moderate",
        description: `A meaningful ${formData.gender || "baby"} name.`,
        culturalSignificance: "Cultural significance.",
        historicalFigures: [],
        variations: [],
        type: "baby",
      });
    }

    return fallbackNames;
  }

  getFallbackBrandNames(formData) {
    const fallbackNames = [
      {
        id: Date.now() + 1,
        name: "Nexura",
        meaning: "Next-generation solutions",
        category: formData.industry || "Technology",
        description:
          "A modern, tech-forward name suggesting innovative solutions.",
        domainAvailable: true,
        variations: ["Nexur", "Nexura.io", "Nexuris"],
        targetAudience: formData.targetAudience || "Tech-savvy professionals",
        brandPersonality: ["Innovative", "Trustworthy", "Modern"],
        memorability: "High",
        pronunciation: "NEX-you-rah",
        type: "brand",
      },
    ];

    // Generate 19 more similar fallback names
    for (let i = 2; i <= 20; i++) {
      fallbackNames.push({
        id: Date.now() + i,
        name: `Brand${i}`,
        meaning: "Business excellence",
        category: formData.industry || "Business",
        description: `A modern ${formData.industry || "business"} name.`,
        domainAvailable: Math.random() > 0.4,
        variations: [`Brand${i}X`, `Brand${i}Pro`],
        targetAudience: formData.targetAudience || "Modern businesses",
        brandPersonality: ["Professional", "Reliable"],
        memorability: "Good",
        pronunciation: `brand-${i}`,
        type: "brand",
      });
    }

    return fallbackNames;
  }

  async getNameSuggestions(query, type) {
    try {
      const prompt = `Based on the search query "${query}", suggest 20 ${type} names that are similar or related. 
      Return as JSON array with format: [{"name": "example", "reason": "why it's similar"}]`;

      const response = await callOpenRouterAPI(prompt, type);

      // Parse suggestions
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return [];
    } catch (error) {
      console.error("Name suggestions error:", error);
      return [];
    }
  }

  async getNameDetails(name, type) {
    try {
      const prompt = `Provide detailed information about the ${type} name "${name}". 
      Include etymology, cultural significance, famous people with this name, and interesting facts.
      Return as JSON object with format:
      {
        "etymology": "origin and history",
        "culturalSignificance": "cultural meaning",
        "famousPeople": ["list of famous people"],
        "interestingFacts": ["list of facts"],
        "numerology": "numerological meaning if applicable",
        "modernUsage": "how it's used today"
      }`;

      const response = await callOpenRouterAPI(prompt, type);

      // Parse details
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return {
        etymology: "Rich historical background",
        culturalSignificance: "Significant cultural meaning",
        famousPeople: [],
        interestingFacts: [],
        modernUsage: "Popular in contemporary usage",
      };
    } catch (error) {
      console.error("Name details error:", error);
      return {
        etymology: "Historical background available",
        culturalSignificance: "Cultural significance present",
        famousPeople: [],
        interestingFacts: [],
        modernUsage: "Used in modern contexts",
      };
    }
  }
}

const nameService = new NameService();

module.exports = {
  generateBabyNames: (formData) => nameService.generateBabyNames(formData),
  generateBrandNames: (formData) => nameService.generateBrandNames(formData),
  getNameSuggestions: (query, type) =>
    nameService.getNameSuggestions(query, type),
  getNameDetails: (name, type) => nameService.getNameDetails(name, type),
};
