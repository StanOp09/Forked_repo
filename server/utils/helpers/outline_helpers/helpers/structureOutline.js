function structureOutline(text) {
  const lines = text.split("\n");
  const structure = { sections: [], errors: [] };
  let currentSection = null;

  lines.forEach((line, index) => {
    line = line.trim();
    // console.log("Line 8: line holds:", line);
    // console.log(typeof line);
    if (line.startsWith("H2:")) {
      if (
        currentSection &&
        (!currentSection.subSections || currentSection.subSections.length === 0)
      ) {
        structure.errors.push(
          `Section "${currentSection.sectionTitle}" has no subsections. (Line: ${index})`
        );
      }
      currentSection = {
        sectionTitle: line.replace("H2:", "").trim(),
        subSections: [],
      };
      // console.log("Line 24: currentSection holds:", line);
      // console.log(typeof currentSection);
    } else if (line.startsWith("H3:")) {
      if (!currentSection) {
        structure.errors.push(
          `Subsection "${line}" found without a parent section. (Line: ${index})`
        );
        return;
      }
      currentSection.subSections.push({
        subTitle: line.replace("H3:", "").trim(),
        content: "",
      });
      // console.log("Line 37: currentSection holds:", line);
      // console.log(typeof currentSection);
    } else if (line.startsWith("-")) {
      if (!currentSection || currentSection.subSections.length === 0) {
        structure.errors.push(
          `Description found without a subsection. (Line: ${index})`
        );
        return;
      }
      const lastSubSection =
        currentSection.subSections[currentSection.subSections.length - 1];
      if (lastSubSection.content) {
        structure.errors.push(
          `Multiple descriptions found for subsection "${lastSubSection.subTitle}". (Line: ${index})`
        );
      } else {
        lastSubSection.content = line.replace("-", "").trim();
      }
    } else if (line && !line.startsWith("H2:") && !line.startsWith("H3:")) {
      structure.errors.push(
        `Unexpected text found: "${line}". (Line: ${index})`
      );
    }
  });

  if (currentSection) {
    if (
      !currentSection.subSections ||
      currentSection.subSections.length === 0
    ) {
      structure.errors.push(
        `Section "${currentSection.sectionTitle}" has no subsections at the end of the document.`
      );
    }
    structure.sections.push(currentSection);
  }

  // Return both the structured content and any errors found.
  return { structure, errors: structure.errors, originalText: text };
  // return structure;
}

module.exports = structureOutline;

// Possible Corrections to be made list:
// Somewhere it sends a non valid subsection after h2: Introduction -> Need to see if H3 is being parsed properly, same with details
// Line 8 shows that it runs after conclusion content, one more time, returns a final string, while holding nothing
// At line 38,
