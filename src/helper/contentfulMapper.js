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
    id: contentEntry.sys.id,
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

const mapGalleryWithImageWidth = (contentEntry, width) => {
  return contentEntry.fields.galleryImage?.map((entry) => {
    return {
      src: `${entry.fields.image?.fields?.file?.url}?w=${width}`,
      width: entry.fields.image?.fields?.file?.details.image.width,
      height: entry.fields.image?.fields?.file?.details.image.height,
      title: entry.fields?.title,
      caption: entry.fields?.description,
      tags: entry.fields?.tag
        ? [{ value: entry.fields?.tag, title: entry.fields?.tag }]
        : [],
    };
  });
};

export const mapGallery = (contentEntry) => {
  const galleryDesktop = mapGalleryWithImageWidth(contentEntry, 700);
  const galleryMobile = mapGalleryWithImageWidth(contentEntry, 500);
  return { galleryDesktop, galleryMobile };
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

export const mapImprint = (contentEntry) => {
  return {
    title: contentEntry.fields.title,
    content: documentToHtmlString(contentEntry.fields.content, optionsRichText),
  };
};

export const mapSponsor = (contentEntry) => {
  return {
    logo: contentEntry.fields.logo?.fields?.file?.url,
  };
};
