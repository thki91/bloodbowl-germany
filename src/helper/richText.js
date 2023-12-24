import { INLINES, BLOCKS } from "@contentful/rich-text-types";

export const optionsRichText = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node) => {
      return `<a target="_blank" rel="noopener noreferrer" href="/${node.data.target.fields?.file?.url}">${node.content[0].value}</a>`;
    },
    [INLINES.HYPERLINK]: (node) => {
      return `<a target="_blank" rel="noopener noreferrer" href="${node.data.uri}">${node.content[0].value}</a>`;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imgUrl = node.data.target?.fields?.file?.url;
      return imgUrl
        ? `<img src=${imgUrl} style="width: auto;max-height:500px; margin:0 auto;margin-bottom:15px; margin-top: 15px;"/>`
        : "";
    },
  },
};
