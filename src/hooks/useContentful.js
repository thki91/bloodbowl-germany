import { useCallback } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Papa from "papaparse";
import _ from "lodash";

const mapTeamMember = (contentEntry) => {
  return {
    picture: contentEntry.fields?.picture?.fields?.file?.url,
    text: documentToHtmlString(contentEntry.fields.text),
    name: contentEntry.fields.name,
    captain: !!contentEntry.fields?.captain,
    order: contentEntry.fields?.order,
    teamType: contentEntry.fields?.teamType,
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

const mapCharter = (contentEntry) => {
  return {
    description: documentToHtmlString(contentEntry.fields.description),
    title: contentEntry.fields.title,
    order: contentEntry.fields?.order,
    type: contentEntry.fields?.type,
  };
};

const mapFacts = (contentEntry) => {
  return {
    description: contentEntry.fields.description,
    icon: contentEntry.fields.icon?.fields?.file?.url,
    order: contentEntry.fields?.order,
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

      const mappedItemsSortedByOrder = entries.items
        .map((entry) => mapTeamMember(entry))
        .sort((a, b) => {
          if (!a.order) a.order = 100;
          if (!b.order) b.order = 100;
          return a.order - b.order;
        });

      return _.groupBy(mappedItemsSortedByOrder, "teamType");
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
      const rankingTable = await parseCSVFile(asset.fields.file.url);
      return { rankingTable, updatedAt: asset.sys.updatedAt };
    } catch (error) {
      console.log(`Error fetching ranking ${error}`);
    }
  }, [client]);

  const getCharter = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "accordion",
        "fields.type": "Charter",
      });
      return _.sortBy(
        entries.items.map((entry) => mapCharter(entry)),
        "order"
      );
    } catch (error) {
      console.log(`Error fetching charter ${error}`);
    }
  }, [client]);

  const getFacts = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "fact",
      });
      return _.sortBy(
        entries.items.map((entry) => mapFacts(entry)),
        "order"
      );
    } catch (error) {
      console.log(`Error fetching facts ${error}`);
    }
  }, [client]);

  return { getMembers, getNews, getRanking, getCharter, getFacts };
};

export default useContentful;
