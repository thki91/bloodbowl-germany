import { useCallback } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Papa from "papaparse";

const mapTeamMember = (contentEntry) => {
  return {
    picture: contentEntry.fields?.picture?.fields?.file?.url,
    text: documentToHtmlString(contentEntry.fields.text),
    name: contentEntry.fields.name,
    captain: !!contentEntry.fields?.captain,
    order: contentEntry.fields?.order,
  };
};

const mapNewsArticle = (contentEntry) => {
  return {
    text: documentToHtmlString(contentEntry.fields.text),
    title: contentEntry.fields.title,
    previewText: contentEntry.fields.previewText,
    publishedAt: contentEntry.fields.publishedAt,
    picture: contentEntry.fields.picture?.fields?.file?.url,
  };
};

const parseCSVFile = async (fileUrl) => {
  return new Promise((resolve) => {
    Papa.parse(fileUrl, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

const useContentful = () => {
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    accessToken: import.meta.env.VITE_CONTENTFUL_PRIVATE_API_KEY,
    environment: "master", // defaults to 'master' if not set
  });

  const getMembers = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "teamMember",
        select: "fields",
      });
      return entries.items
        .map((entry) => mapTeamMember(entry))
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.log(`Error fetching team members ${error}`);
    }
  }, [client]);

  const getNews = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "newsArticle",
        select: "fields",
      });

      return entries.items
        .map((entry) => mapNewsArticle(entry))
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } catch (error) {
      console.log(`Error fetching news articles ${error}`);
    }
  }, [client]);

  const getRanking = useCallback(async () => {
    try {
      const asset = await client.getAsset("4QbbhyoSHk3gPwESRCxOFv");
      return await parseCSVFile(asset.fields.file.url);
    } catch (error) {
      console.log(`Error fetching news articles ${error}`);
    }
  }, [client]);

  return { getMembers, getNews, getRanking };
};

export default useContentful;
