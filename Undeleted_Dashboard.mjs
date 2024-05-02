import got from 'got'; 
import fs from 'fs/promises';

const API_KEY = '<Insert User API_KEY>';
const GRAPH_API = 'https://api.newrelic.com/graphql';

const headers = {
  'Content-Type': 'application/json',
  'Api-Key': API_KEY
};

async function readGuidsFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    console.error("Failed to read file:", error);
    return [];
  }
}

async function undeleteDashboards(guids) {
  const query = `
mutation UndeleteDashboards {
  ${guids.map((guid, index) => `
  undelete${index}: dashboardUndelete(guid: "${guid}") {
    errors {
      description
      type
    }
  }
  `).join('')}
}`;

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query })
  };

  try {
    const response = await got(GRAPH_API, options);
    console.log("Response:", response.body);
  } catch (error) {
    console.error("Error:", error.response.body);
  }
}

async function main() {
  const guids = await readGuidsFromFile('guids.txt'); //place the txt file in the same directory of script or provide the path.
  if (guids.length > 0) {
    await undeleteDashboards(guids);
  } else {
    console.log("No GUIDs found to process."); 
  }
}

main();
