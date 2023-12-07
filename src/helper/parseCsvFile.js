import Papa from "papaparse";

export const parseCSVFile = async (fileUrl) => {
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
