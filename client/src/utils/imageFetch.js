import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_IMAGE } from "./queries";

export const useFetchImage = (imageName) => {
  const { data, loading, error } = useQuery(FETCH_IMAGE, {
    variables: { imageName },
    skip: !imageName,
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (data && data.fetchImage) {
      const base64Image = `data:${data.fetchImage.contentType};base64,${data.fetchImage.data}`;
      setImageUrl(base64Image);
    }
  }, [data]);

  return {
    imageUrl,
    loading,
    error,
  };
};
