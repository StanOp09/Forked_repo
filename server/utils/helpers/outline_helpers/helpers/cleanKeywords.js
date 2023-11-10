function cleanKeywords(keywords) {
  if (typeof keywords !== "string") {
    return "";
  }

  return keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword !== "")
    .join(", ");
}

module.exports = cleanKeywords;
