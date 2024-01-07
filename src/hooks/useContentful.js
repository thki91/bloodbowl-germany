import { useCallback } from "react";
import { createClient } from "contentful";
import { getWithExpiry, setWithExpiry } from "../helper/localStorage";
import _ from "lodash";
import {
  mapNewsArticle,
  mapAccordions,
  mapEurobowlResult,
  mapHeaderImage,
  mapGallery,
  mapFact,
  mapStatistic,
  mapTeamMember,
  mapImprint,
} from "../helper/contentfulMapper";
import { parseCSVFile } from "../helper/parseCsvFile";

const useContentful = () => {
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    accessToken: import.meta.env.VITE_CONTENTFUL_PRIVATE_API_KEY,
    environment: "master", // defaults to 'master' if not set
  });

  const getTeam = useCallback(async () => {
    const localStorageValue = getWithExpiry("members");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "teamMember",
        "fields.hidden": false,
        select: "fields",
      });
      const data = _.groupBy(
        entries.items
          .map((entry) => mapTeamMember(entry))
          .sort((a, b) => {
            if (!a.order) a.order = 100;
            if (!b.order) b.order = 100;
            return a.order - b.order;
          }),
        "teamType"
      );
      setWithExpiry("members", data);
      return data;
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

  const getNationalPlayers = useCallback(async () => {
    const localStorageValue = getWithExpiry("nationalPlayers");
    if (localStorageValue) return localStorageValue;

    try {
      const asset = await client.getAsset("14g2fq3GXun3VmsBqnYSWR");
      const table = await parseCSVFile(asset.fields.file.url);
      const data = {
        table,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
      setWithExpiry("nationalPlayers", data);
      return data;
    } catch (error) {
      console.log(`Error fetching national players ${error}`);
    }
  }, [client]);

  const getNationalOverview = useCallback(async () => {
    const localStorageValue = getWithExpiry("nationalOverview");
    if (localStorageValue) return localStorageValue;

    try {
      const asset = await client.getAsset("5TbYW5QyG4VHxom6k6G3Gz");
      const table = await parseCSVFile(asset.fields.file.url);
      const data = {
        table,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
      setWithExpiry("nationalOverview", data);
      return data;
    } catch (error) {
      console.log(`Error fetching national overview ${error}`);
    }
  }, [client]);

  const getGermanBalanceSheet = useCallback(async () => {
    const localStorageValue = getWithExpiry("balanceSheet");
    if (localStorageValue) return localStorageValue;

    try {
      const asset = await client.getAsset("2C8AUsqpCvUBJGAzWod3pO");
      const table = await parseCSVFile(asset.fields.file.url);
      const data = {
        table,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
      setWithExpiry("balanceSheet", data);
      return data;
    } catch (error) {
      console.log(`Error fetching german balance sheet ${error}`);
    }
  }, [client]);

  const getRanking = useCallback(async () => {
    try {
      const asset = await client.getAsset("4QbbhyoSHk3gPwESRCxOFv");
      const rankingTable = await parseCSVFile(asset.fields.file.url);
      const data = {
        rankingTable,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
      return data;
    } catch (error) {
      console.log(`Error fetching ranking ${error}`);
    }
  }, [client]);

  const getEurobowlResults = useCallback(async () => {
    const localStorageValue = getWithExpiry("eurobowlResults");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "eurobowlResult",
      });
      const entriesMapped = await Promise.all(
        entries.items.map(async (entry) => await mapEurobowlResult(entry))
      );

      const data = _.orderBy(entriesMapped, "year", "desc");
      setWithExpiry("eurobowlResults", data);
      return data;
    } catch (error) {
      console.log(`Error fetching eurobowl results ${error}`);
    }
  }, [client]);

  const getAccordions = useCallback(async () => {
    const localStorageValue = getWithExpiry("accordions");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "accordion",
      });
      const data = _.sortBy(
        entries.items.map((entry) => mapAccordions(entry)),
        "order"
      );
      setWithExpiry("accordions", data);
      return data;
    } catch (error) {
      console.log(`Error fetching accordions ${error}`);
    }
  }, [client]);

  const getFacts = useCallback(async () => {
    const localStorageValue = getWithExpiry("facts");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "fact",
      });
      const data = _.sortBy(
        entries.items.map((entry) => mapFact(entry)),
        "order"
      );
      setWithExpiry("facts", data);
      return data;
    } catch (error) {
      console.log(`Error fetching facts ${error}`);
    }
  }, [client]);

  const getStatistics = useCallback(async () => {
    const localStorageValue = getWithExpiry("statistics");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "statistics",
      });
      const data = entries.items.map((entry) => mapStatistic(entry));
      setWithExpiry("statistics", data);
      return data;
    } catch (error) {
      console.log(`Error fetching statistics ${error}`);
    }
  }, [client]);

  const getGallery = useCallback(async () => {
    const localStorageValue = getWithExpiry("gallery");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "gallery",
      });
      const data = entries.items.map((entry) => mapGallery(entry));
      setWithExpiry("gallery", data);
      return data;
    } catch (error) {
      console.log(`Error fetching gallery ${error}`);
    }
  }, [client]);

  const getHeaderImages = useCallback(async () => {
    const localStorageValue = getWithExpiry("headerImages");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "headerImages",
      });
      if (!entries?.items?.length) return null;
      const data = mapHeaderImage(entries.items[0]);
      setWithExpiry("headerImages", data);
      return data;
    } catch (error) {
      console.log(`Error fetching header images ${error}`);
    }
  }, [client]);

  const getImprint = useCallback(async () => {
    const localStorageValue = getWithExpiry("imprint");
    if (localStorageValue) return localStorageValue;

    try {
      const entry = await client.getEntry("54c2BMj5bi77HY2Ngmoaqo");
      if (!entry) return null;
      const data = mapImprint(entry);
      setWithExpiry("imprint", data);
      return data;
    } catch (error) {
      console.log(`Error fetching imprint ${error}`);
    }
  }, [client]);

  const getSponsors = useCallback(async () => {
    const localStorageValue = getWithExpiry("sponsors");
    if (localStorageValue) return localStorageValue;

    try {
      const entries = await client.getEntries({
        content_type: "sponsor",
      });
      if (!entries?.items?.length) return null;
      const data = entries.items.map((entry) => mapSponsor(entry));
      setWithExpiry("sponsor", data);
      return data;
    } catch (error) {
      console.log(`Error fetching header images ${error}`);
    }
  }, [client]);

  return {
    getTeam,
    getNews,
    getRanking,
    getAccordions,
    getFacts,
    getEurobowlResults,
    getNationalOverview,
    getNationalPlayers,
    getGermanBalanceSheet,
    getStatistics,
    getGallery,
    getHeaderImages,
    getImprint,
    getSponsors,
  };
};

export default useContentful;
