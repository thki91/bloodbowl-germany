import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { optionsRichText } from "./richText";
import { parseCSVFile } from "./parseCsvFile";

export const mapTeamMember = (contentEntry) => {
  return {
    picture: contentEntry.fields?.picture?.fields?.file?.url,
    text: documentToHtmlString(contentEntry.fields.text, optionsRichText),
    textNextToImage: documentToHtmlString(
      contentEntry.fields.textNextToImage,
      optionsRichText
    ),
    name: contentEntry.fields.name,
    captain: !!contentEntry.fields?.captain,
    order: contentEntry.fields?.order,
    teamType: contentEntry.fields?.teamType,
    role: contentEntry.fields?.role,
  };
};

export const mapNewsArticle = (contentEntry) => {
  return {
    text: documentToHtmlString(contentEntry.fields.text, optionsRichText),
    title: contentEntry.fields.title,
    previewText: contentEntry.fields.previewText,
    publishedAt: contentEntry.fields.publishedAt,
    picture: contentEntry.fields.picture?.fields?.file?.url,
    author: contentEntry.fields.author,
    type: contentEntry.fields.type,
  };
};

export const mapAccordions = (contentEntry) => {
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

export const mapFact = (contentEntry) => {
  return {
    description: contentEntry.fields.description,
    icon: contentEntry.fields.icon?.fields?.file?.url,
    order: contentEntry.fields?.order,
  };
};

export const mapGallery = (contentEntry) => {
  return {
    image1: {
      url: contentEntry.fields.image1?.fields?.file?.url,
      description: contentEntry.fields.image1?.fields?.description,
    },
    image2: {
      url: contentEntry.fields.image2?.fields?.file?.url,
      description: contentEntry.fields.image2?.fields?.description,
    },
    image3: {
      url: contentEntry.fields.image3?.fields?.file?.url,
      description: contentEntry.fields.image3?.fields?.description,
    },
    image4: {
      url: contentEntry.fields.image4?.fields?.file?.url,
      description: contentEntry.fields.image4?.fields?.description,
    },
    image5: {
      url: contentEntry.fields.image5?.fields?.file?.url,
      description: contentEntry.fields.image5?.fields?.description,
    },
  };
};

export const mapHeaderImage = (contentEntry) => {
  return {
    image1: contentEntry.fields.image1?.fields?.file?.url,
    image2: contentEntry.fields.image2?.fields?.file?.url,
  };
};

export const mapStatistic = (contentEntry) => {
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

export const mapEurobowlResult = async (contentEntry) => {
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
