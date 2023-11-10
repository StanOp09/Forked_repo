const correctionPrompt = require("../utils/helpers/outline_helpers/helpers/correctionPrompt");
const outlinePrompt = require("../utils/helpers/outline_helpers/helpers/outlinePrompt");
const structureOutline = require("../utils/helpers/outline_helpers/helpers/structureOutline");

describe("Prompts Functions", () => {
  describe("correctionPrompt", () => {
    // Example test for correctionPrompt
    it("should generate a prompt for article revision based on user decisions", () => {
      const structuredData = {
        structure: {
          sections: [
            {
              id: "1", // Add an ID to the section
              sectionTitle: "Introduction",
              subSections: [
                {
                  id: "1.1",
                  subTitle: "Overview",
                  content: "Content for overview",
                }, // Add IDs to subsections
              ],
            },
          ],
        },
        originalText: "Original article text",
      };

      const userDecisions = {
        1: "keep", // Refer to the section by ID
        1.1: "regenerate", // Refer to the subsection by ID
        conclusion: "regenerate", // Use a specific key for the conclusion
      };

      const prompt = correctionPrompt(structuredData, userDecisions);
      expect(prompt).toContain("H2: Introduction"); // This should remain because the section ID '1' is marked as 'keep'
      expect(prompt).toContain(
        '[Please regenerate the subsection for "Overview"]'
      ); // This will be regenerated because '1.1' is marked as 'regenerate'
      expect(prompt).toContain("[Please regenerate the conclusion]"); // The conclusion is marked as 'regenerate'
    });
  });

  describe("outlinePrompt", () => {
    // Example test for outlinePrompt
    it("should generate an article outline prompt based on the input parameters", () => {
      const topic = "Artificial Intelligence";
      const tone = "informative";
      const keywords = "AI, Machine Learning, Deep Learning";
      const desiredWordCount = 3000;

      const prompt = outlinePrompt(topic, tone, keywords, desiredWordCount);
      expect(prompt).toContain("complex");
      expect(prompt).toContain("approximately 7 H2 sections");
      expect(prompt).toContain("and 2 H3 subsections");
      expect(prompt).toContain("AI, Machine Learning, Deep Learning");
      expect(prompt).toContain("approximately 3000 words in total");
    });
  });

  describe("structureOutline", () => {
    // Example test for structureOutline
    it("should structure the given outline text into sections and subsections", () => {
      const text = `
      H2: Introduction
      - An introduction to the topic.
      H2: Main Section
      H3: Detail One
      - Details about the first point.
      H3: Detail Two
      - Details about the second point.
      H2: Conclusion
      - A summary of the article.
    `;

      const { structure, errors } = structureOutline(text);
      expect(structure.sections.length).toBe(3);
      expect(structure.sections[0].sectionTitle).toBe("Introduction");
      expect(structure.sections[1].subSections.length).toBe(2);
      expect(structure.sections[2].sectionTitle).toBe("Conclusion");
      expect(errors.length).toBe(0);
    });

    it("should report errors for improperly formatted outlines", () => {
      const text = `
        H2: Introduction
        This is not a valid subsection.
        H2: Conclusion
        - Conclusion content.
      `;

      const { errors } = structureOutline(text);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  // ... more tests for each function
});
