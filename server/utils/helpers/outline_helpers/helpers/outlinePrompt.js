function outlinePrompt(topic, tone, keywords, desiredWordCount) {
  let complexity;
  let sections;
  let subsectionsPerSection;

  if (desiredWordCount >= 4000) {
    complexity = "very complex";
    sections = 9;
    subsectionsPerSection = 3;
  } else if (desiredWordCount >= 3000) {
    complexity = "complex";
    sections = 7;
    subsectionsPerSection = 2;
  } else if (desiredWordCount >= 2500) {
    complexity = "moderately complex";
    sections = 6;
    subsectionsPerSection = 2;
  } else if (desiredWordCount >= 2000) {
    complexity = "moderate";
    sections = 5;
    subsectionsPerSection = 1;
  } else {
    complexity = "simple";
    sections = 4;
    subsectionsPerSection = 1;
  }

  let outline = `
Please create an article outline for the topic "${topic}" in a ${tone} tone.
The outline should be ${complexity} in detail with approximately ${sections} H2 sections and ${subsectionsPerSection} H3 subsections under each H2, where appropriate.
Include an introduction at the beginning and a conclusion at the end.
Use "H2" for section headers and "H3" for subsection headers, followed by a colon and the title.
Provide short descriptions for each section where appropriate.
Ensure that the article flows logically and covers the topic comprehensively.
Incorporate these keywords where relevant: ${keywords}.
Aim for the article to be approximately ${desiredWordCount} words in total.

Example of the desired format:
H2: Introduction to ${topic}
  - Briefly introduce the topic and its relevance.
  
`;

  for (let i = 0; i < sections; i++) {
    outline += `H2: Main Section ${i + 1} Title\n`;
    for (let j = 0; j < subsectionsPerSection; j++) {
      outline += `  H3: Subsection ${j + 1} Title\n`;
      outline += `    - Short description of what this subsection will cover.\n`;
    }
    // Add an extra newline for spacing, but not after the last section
    if (i < sections - 1) {
      outline += "\n";
    }
  }

  // Add the conclusion with spacing
  outline += `\nH2: Conclusion\n  - Summarize the main points of the article and provide closing thoughts.\n`;

  // console.log(
  //   "outlinePrompt.js:",
  //   "\n",
  //   "type:",
  //   typeof outline,
  //   "\n\n",
  //   "Returned Prompt:",
  //   "\n",
  //   outline
  // );

  return outline;
  // return outline.trim(); // Trim the final string to remove any leading/trailing whitespace
}

module.exports = outlinePrompt;
