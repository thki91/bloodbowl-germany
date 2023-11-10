import { useCallback } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Papa from "papaparse";

const mapTeamMember = (contentEntry) => {
  return {
    picture: contentEntry.fields.picture.fields.file.url,
    text: documentToHtmlString(contentEntry.fields.text),
    name: contentEntry.fields.name,
    captain: !!contentEntry.fields?.captain,
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

const newsHardcoded = {
  sys: {
    type: "Array",
  },
  total: 3,
  skip: 0,
  limit: 100,
  items: [
    {
      fields: {
        title: "Kapitänswahl Bewerbungsstart",
        previewText:
          "Es ist wieder soweit - nach dem WorldCup ist vor dem Eurobowl. Jeder, der an mindestens einem Eurobowl/EurOpen-Turnier oder an einem NAF World Cup teilgenommen hat, kann ab sofort sein Interesse an diesem Amt äußern oder vorgeschlagen werden.",
        text: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Es ist wieder soweit - nach dem WorldCup ist vor dem Eurobowl.  Jeder, der an mindestens einem Eurobowl/EurOpen-Turnier oder an einem NAF World Cup teilgenommen hat, kann ab sofort sein Interesse an diesem Amt äußern oder von irgendjemand anders vorgeschlagen werden. Der Nominierungszeitraum geht vom ",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  value: "04.10.2023.-15.10.2023. ",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [],
                  value: "Euren Hut könnt Ihr im ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "http://www.dbbcev.de/joomla/index.php/forum/deutscher-pavillion/6170-kapitaenswahl-zum-eurobowl-2024-in-griechenland-bewerbungen-voschlaege",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "deutschen Pavillon des DBBC-Forums",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    " in den Ring werfen.\n\nAb dem 16.10.2023 werden für alle einsehbar die Bewerbungen im entsprechenden Q/A-Thread des deutschen Pavillons im ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "http://www.dbbcev.de/joomla/index.php/forum/deutscher-pavillion",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "DBBC-Forum",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    " veröffentlicht.\n\nAm 16.10.2023 werden die Bewerbungen veröffentlicht und im Anschluss folgt die Q&A-Runde vom ",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  value: "16.10.-31.10.2023",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    ". Es steht den Kandidaten frei sich vor der Wahl zu Ihren Vorstellungen bzgl. der Teamzusammenstellung zu äußern und ggf. Fragen dazu zu beantworten (ist allerdings empfehlenswert, wenn man gewählt werden will).\n\nDie eigentliche Wahl findet vom ",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  value: "01.11.-15.11.2023",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    " statt. Abstimmungsberechtigt sind Spieler, die innerhalb eines Zeitraums von zwei Jahren vor dem Datum der Kapitänswahl mindestens ein Major-Turnier (bzw. eines bei dem es eine doppelte Wertung der NAF-Punkte gibt) außerhalb Deutschlands gespielt haben. Falls es nur einen Kandidaten gibt, so ist er automatisch Kapitän.",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "document",
        },
        publishedAt: "2023-10-04T00:00+01:00",
        picture: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "uTzeZXibj197MfEIHxWC2",
          },
        },
      },
      sys: {
        id: "2OjUQ28hUV55vv9Bj31cMv",
        type: "Entry",
      },
    },
    {
      fields: {
        title: "2.Platz beim Eurobowl in Malta!",
        previewText:
          "Team-Deutschland (Arioso, Baki, Miko, Ignaz, Junior84, Oventa, Sprinter, Stimme) holte einen sensationellen 2.Platz beim Eurobowl in Malta. Das Team musste sich trotz Sieg im abschließenden Spiel gegen Dänemark, nur von eben diesen, nach Tiebreakern geschlagen geben. ",
        text: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Nach einem spannenden Turnier holt Team-Deutschland (",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Arioso",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Baki",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Miko",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Ignaz",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Junior84",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Oventa",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Sprinter",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: ", ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Stimme",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    ") einen sensationellen 2.Platz beim Eurobowl in Malta. Das Team musste sich trotz Sieg im abschließenden Spiel gegen Dänemark nur von eben diesen nach Tiebreakern geschlagen geben. ",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Neben der ausgezeichneten Team-Wertung konnten weitere Auszeichnungen abgegriffen werden. So gewann ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage&coach=3676&variant=13",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Ignaz ",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: 'beim Eurobowl "Most CAS" und ',
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "https://member.thenaf.net/index.php?module=NAF&type=coachpage&coach=6737&variant=13",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Twyllenimor",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    ' "Best Stunty" im parallel stattfindenden Euro-Open-Turnier.',
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  value: "Fazit vom Eurobowl-Kapitän Arioso: ",
                  nodeType: "text",
                },
                {
                  data: {},
                  marks: [],
                  value:
                    "Turnier war super. Die Organisation war makellos, abends mit allen Spielern in einem Hotel zu sein und endlich die Leute nach der Covid-Pandemie wieder zu sehen tat so unglaublich gut. Es haben sich neue Freundschaften entwickelt, die alten wurden wiederbelebt. Und endlich einmal hatten wir das Glück, dass wir in den letzten Jahren nicht hatten. Wann immer mal einer Pech hatte, waren andere aus dem Team da und haben es kompensiert. Eine großartige Leistung von allen 8, obwohl wir schlechtere Einzelbilanzen hatten als beim letzten Mal. Auf und neben dem Platz waren wir wirklich eine Einheit. Es war zudem zu spüren wie die Open-Teilnehmer vor Ort und Ihr Zuhause auf Instagram mit gefiebert haben. Daher auch ein Dank an Julian, der selbstlos den Social Media Manager gespielt und den Hauptteil der Arbeit übernommen hat, Euch mit Infos zu versorgen. ",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "document",
        },
        publishedAt: "2022-11-06T00:00+01:00",
        picture: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "uTzeZXibj197MfEIHxWC2",
          },
        },
      },
      sys: {
        id: "4l7LZvM56S4KqBc93anOkg",
        type: "Entry",
      },
    },
    {
      fields: {
        title: "Urnengang zur Kapitänswahl eröffnet!",
        previewText:
          "Der Zugang zur den Urnen ist bis zum 15.11 geöffnet. Wenn Ihr wahlberechtigt seid, solltet Ihr eine Mail von Michal erhalten haben. Zur Wahl stehen die Kandidaten Arioso und Ignaz. \n",
        text: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Der Zugang zur den Urnen ist bis zum 15.11 geöffnet. Mit der Teilnahme an einem NAF Major / National Tournament innerhalb der letzten 2 Jahre (01.11.2021 bis 31.10.2023) außerhalb Deutschlands seid Ihr für die Wahl des Eurobowl-Kapitäns 2024 in Griechenland stimmberechtigt. Wenn Ihr wahlberechtigt seid, solltet Ihr eine Mail von Michal erhalten haben, falls nicht wendet Euch vertrauensvoll an Ihn. ",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    " Zur Wahl stehen die beiden Kandidaten Arioso und Ignaz. Nähere Infos zu Ihren Wahlprogrammen findet Ihr hier: ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: " http://dbbcev.de/joomla/index.php/forum/deutscher-pavillion/6185-arioso-bewerbung-und-q-a-eb-2024",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Arioso",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: " | ",
                  nodeType: "text",
                },
                {
                  data: {
                    uri: "http://dbbcev.de/joomla/index.php/forum/deutscher-pavillion/6186-ignaz-bewerbung-und-q-a-eb-2024",
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Ignaz",
                      nodeType: "text",
                    },
                  ],
                  nodeType: "hyperlink",
                },
                {
                  data: {},
                  marks: [],
                  value: "",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Solltet Ihr keinen Zugriff auf das Forum haben sendet bitte eine PM an Arioso, der Euch zeitnah den Zugriff ermöglichen wird.",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "document",
        },
        publishedAt: "2023-11-01T00:00+01:00",
        picture: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "uTzeZXibj197MfEIHxWC2",
          },
        },
      },
      sys: {
        id: "XCUyJVIYczvTXSYqkWWN0",
        type: "Entry",
      },
    },
  ],
  includes: {
    Asset: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "h5b8m67s7aeb",
            },
          },
          id: "uTzeZXibj197MfEIHxWC2",
          type: "Asset",
          createdAt: "2023-11-06T11:44:32.648Z",
          updatedAt: "2023-11-06T11:44:32.648Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-US",
        },
        fields: {
          title: "malta",
          description: "",
          file: {
            url: "//images.ctfassets.net/h5b8m67s7aeb/uTzeZXibj197MfEIHxWC2/449c1833311bb5ed86316e5e20366623/malta.jpg",
            details: {
              size: 40000,
              image: {
                width: 299,
                height: 299,
              },
            },
            fileName: "malta.jpg",
            contentType: "image/jpeg",
          },
        },
      },
    ],
  },
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
      return entries.items.map((entry) => mapTeamMember(entry));
    } catch (error) {
      console.log(`Error fetching team members ${error}`);
    }
  }, [client]);

  const getNews = useCallback(async () => {
    try {
      // const entries = await client.getEntries({
      //     content_type: "newsArticle",
      //     select: "fields"
      // });
      return newsHardcoded.items.map((entry) => mapNewsArticle(entry));
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
