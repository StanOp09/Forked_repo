function correctionPrompt(structuredData, userDecisions) {
  let prompt =
    "Please revise the following article outline based on user feedback:\n";

  // Destructure to get structure and originalText
  const { structure, originalText } = structuredData;

  // Helper function to determine the expected number of subsections for a section.
  function getExpectedSubsections(sectionTitle) {
    const section = structure.sections.find(
      (s) => s.sectionTitle === sectionTitle
    );
    return section ? section.subSections.length : 1; // Default to 1 if not found
  }

  // Iterate through the structured outline and build the prompt
  structure.sections.forEach((section) => {
    if (userDecisions[section.id] === "keep") {
      // User decided to keep the section as it is
      prompt += `H2: ${section.sectionTitle}\n`;
      section.subSections.forEach((sub) => {
        if (userDecisions[sub.id] === "keep") {
          // User decided to keep the subsection as it is
          prompt += `  H3: ${sub.subTitle}\n`;
          prompt += `  - ${sub.content}\n`;
        } else {
          // User decided to regenerate the subsection
          prompt += `  H3: [Please regenerate the subsection for "${sub.subTitle}"]\n`;
        }
      });
    } else {
      prompt += `H2: [Please regenerate the section for "${section.sectionTitle}"]\n`;
      const expectedSubsections = getExpectedSubsections(section.sectionTitle);
      for (let i = 0; i < expectedSubsections; i++) {
        prompt += `  H3: [Please regenerate a subsection title and content]\n`;
      }
    }
  });
  // structure.sections.forEach((section) => {
  //   if (userDecisions[section.id] === "keep") {
  //     // User decided to keep the section as it is
  //     prompt += `H2: ${section.sectionTitle}\n`;
  //     section.subSections.forEach((sub) => {
  //       if (userDecisions[sub.id] === "keep") {
  //         // User decided to keep the subsection as it is
  //         prompt += `  H3: ${sub.subTitle}\n`;
  //         prompt += `  - ${sub.content}\n`;
  //       } else {
  //         // User decided to regenerate the subsection
  //         prompt += `  H3: [Please regenerate the subsection for "${sub.subTitle}"]\n`;
  //       }
  //     });
  //   } else {
  //     // User decided to regenerate the entire section
  //     prompt += `H2: [Please regenerate the section for "${section.sectionTitle}"]\n`;
  //     // Indicate the expected number of subsections for regeneration based on the initial outline.
  //     const expectedSubsections = getExpectedSubsections(section.sectionTitle);
  //     for (let i = 0; i < expectedSubsections; i++) {
  //       prompt += `  H3: [Please regenerate a subsection title and content]\n`;
  //     }
  //   }
  // });

  // Append conclusion regeneration if needed
  if (userDecisions["conclusion"] === "regenerate") {
    prompt += `H2: [Please regenerate the conclusion]\n`;
  }

  return prompt.trim();
}

module.exports = correctionPrompt;
