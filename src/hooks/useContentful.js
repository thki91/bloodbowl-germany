import { useCallback } from 'react';
import {createClient} from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const mapMembers = (contentEntry) => {
    return {
      picture : contentEntry.fields.picture.fields.file.url ,
      text: documentToHtmlString(contentEntry.fields.text),
      previewText: documentToHtmlString(contentEntry.fields.previewText),
      name: contentEntry.fields.name
    }
  }
  

const useContentful = () => {
    const client = createClient({
        space: import.meta.env.VITE_CONTENTFUL_SPACE,
        accessToken: import.meta.env.VITE_CONTENTFUL_PRIVATE_API_KEY,
        environment: 'master', // defaults to 'master' if not set
      })
    
      const getMembers = useCallback(async () => {
        try {
            const entries = await client.getEntries({
                content_type: "teamMember",
                select: "fields"
            });
            console.log(entries.items)
            return entries.items.map((entry) => mapMembers(entry))
        } catch (error) {
            console.log(`Error fetching team members ${error}`);
        }}
        ,[client]);

    return { getMembers }
  }


  export default useContentful
  