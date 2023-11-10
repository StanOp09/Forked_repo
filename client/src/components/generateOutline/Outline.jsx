import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GENERATE_OUTLINE } from "../../utils/mutations";

function ArticleOutlineGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [keywords, setKeywords] = useState("");
  const [desiredWordCount, setDesiredWordCount] = useState(0);

  const [generateOutline] = useMutation(GENERATE_OUTLINE);

  const handleGenerateOutline = async () => {
    try {
      const { data } = await generateOutline({
        variables: {
          topic,
          tone,
          keywords,
          desiredWordCount,
        },
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tone"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <input
        type="number"
        placeholder="Desired Word Count"
        value={desiredWordCount}
        onChange={(e) => setDesiredWordCount(e.target.value)}
      />
      <button onClick={handleGenerateOutline}>Generate Outline</button>
    </div>
  );
}

export default ArticleOutlineGenerator;
