import { useCallback } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import Papa from "papaparse";
import _ from "lodash";

const optionsRichText = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node) => {
      return `<a target="_blank" rel="noopener noreferrer" href="/${node.data.target.fields?.file?.url}">${node.content[0].value}</a>`;
    },
    [INLINES.HYPERLINK]: (node) => {
      return `<a target="_blank" rel="noopener noreferrer" href="${node.data.uri}">
          ${node.content[0].value}
        </a>`;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imgUrl = node.data.target?.fields?.file?.url;
      return imgUrl
        ? `<img src=${imgUrl} style="height: 50px;margin:0 auto;margin-bottom:10px"/>`
        : "";
    },
  },
};

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

const mapCharta = (contentEntry) => {
  return {
    description: documentToHtmlString(
      contentEntry.fields.description,
      optionsRichText
    ),
    title: contentEntry.fields.title,
    order: contentEntry.fields?.order,
    type: contentEntry.fields?.type,
  };
};

const mapFact = (contentEntry) => {
  return {
    description: contentEntry.fields.description,
    icon: contentEntry.fields.icon?.fields?.file?.url,
    order: contentEntry.fields?.order,
  };
};

const mapGallery = (contentEntry) => {
  return {
    image1: contentEntry.fields.image1?.fields?.file?.url,
    image2: contentEntry.fields.image2?.fields?.file?.url,
    image3: contentEntry.fields.image3?.fields?.file?.url,
    image4: contentEntry.fields.image4?.fields?.file?.url,
    image5: contentEntry.fields.image5?.fields?.file?.url,
  };
};

const mapHeaderImage = (contentEntry) => {
  return {
    image1: contentEntry.fields.image1?.fields?.file?.url,
    image2: contentEntry.fields.image2?.fields?.file?.url,
  };
};

const mapStatistic = (contentEntry) => {
  return {
    frontTextBlack: documentToHtmlString(
      contentEntry.fields.frontTextBlack,
      optionsRichText
    ),
    backTextBlack: documentToHtmlString(
      contentEntry.fields.backTextBlack,
      optionsRichText
    ),
    frontTextRed: documentToHtmlString(
      contentEntry.fields.frontTextRed,
      optionsRichText
    ),
    backTextRed: documentToHtmlString(
      contentEntry.fields.backTextRed,
      optionsRichText
    ),
    frontTextYellow: documentToHtmlString(
      contentEntry.fields.frontTextYellow,
      optionsRichText
    ),
    backTextYellow: documentToHtmlString(
      contentEntry.fields.backTextYellow,
      optionsRichText
    ),
  };
};

const mapEurobowlResult = async (contentEntry) => {
  const resultTable = await parseCSVFile(
    contentEntry.fields.resultTableCsv?.fields?.file?.url
  );
  return {
    title: contentEntry.fields.title,
    logo: contentEntry.fields.logo?.fields?.file?.url,
    year: contentEntry.fields?.year,
    endResult: contentEntry.fields?.endResult,
    resultsLink: contentEntry.fields?.resultsLink,
    reportLink: contentEntry.fields?.reportLink,
    resultTable,
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
      skipEmptyLines: true,
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
        "fields.hidden": false,
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

  const getNationalPlayers = useCallback(async () => {
    try {
      const asset = await client.getAsset("14g2fq3GXun3VmsBqnYSWR");
      const table = await parseCSVFile(asset.fields.file.url);
      return {
        table,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
    } catch (error) {
      console.log(`Error fetching national players ${error}`);
    }
  }, [client]);

  const getNationalOverview = useCallback(async () => {
    try {
      const asset = await client.getAsset("5TbYW5QyG4VHxom6k6G3Gz");
      const table = await parseCSVFile(asset.fields.file.url);
      return {
        table,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
    } catch (error) {
      console.log(`Error fetching national overview ${error}`);
    }
  }, [client]);

  const getGermanBalanceSheet = useCallback(async () => {
    try {
      const asset = await client.getAsset("2C8AUsqpCvUBJGAzWod3pO");
      const table = await parseCSVFile(asset.fields.file.url);
      return {
        table,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
    } catch (error) {
      console.log(`Error fetching german balance sheet ${error}`);
    }
  }, [client]);

  const getRanking = useCallback(async () => {
    try {
      const asset = await client.getAsset("4QbbhyoSHk3gPwESRCxOFv");
      const rankingTable = await parseCSVFile(asset.fields.file.url);
      return {
        rankingTable,
        updatedAt: asset.sys.updatedAt,
        title: asset.fields.title,
        description: asset.fields.description,
      };
    } catch (error) {
      console.log(`Error fetching ranking ${error}`);
    }
  }, [client]);

  const getEurobowlResults = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "eurobowlResult",
      });
      const entriesMapped = await Promise.all(
        entries.items.map(async (entry) => await mapEurobowlResult(entry))
      );

      return _.orderBy(entriesMapped, "year", "desc");
    } catch (error) {
      console.log(`Error fetching eurobowl results ${error}`);
    }
  }, [client]);

  const getCharta = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "accordion",
      });
      return _.sortBy(
        entries.items.map((entry) => mapCharta(entry)),
        "order"
      );
    } catch (error) {
      console.log(`Error fetching charta ${error}`);
    }
  }, [client]);

  const getFacts = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "fact",
      });
      return _.sortBy(
        entries.items.map((entry) => mapFact(entry)),
        "order"
      );
    } catch (error) {
      console.log(`Error fetching facts ${error}`);
    }
  }, [client]);

  const getStatistics = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "statistics",
      });
      return entries.items.map((entry) => mapStatistic(entry));
    } catch (error) {
      console.log(`Error fetching statistics ${error}`);
    }
  }, [client]);

  const getGallery = useCallback(async () => {
    try {
      const entries = await client.getEntries({
        content_type: "gallery",
      });
      return entries.items.map((entry) => mapGallery(entry));
    } catch (error) {
      console.log(`Error fetching gallery ${error}`);
    }
  }, [client]);

  const getHeaderImages = useCallback(async () => {
    try {
      const entry = await client.getEntry({
        content_type: "headerImages",
      });
      return mapHeaderImage(entry);
    } catch (error) {
      console.log(`Error fetching header images ${error}`);
    }
  }, [client]);

  return {
    getMembers,
    getNews,
    getRanking,
    getCharta,
    getFacts,
    getEurobowlResults,
    getNationalOverview,
    getNationalPlayers,
    getGermanBalanceSheet,
    getStatistics,
    getGallery,
    getHeaderImages,
  };
};

export default useContentful;
