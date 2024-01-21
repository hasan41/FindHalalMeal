const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const endpoint = "https://c7e0214658d64d62ba2f000a1e2c501d.us-central1.gcp.cloud.es.io"
api_key = "RTRHUktJMEJSNFJDak43c1BRdXE6a0tSZUh4T3dUZEtreklEUnB6ZW1aZw=="

//const endpoint = process.env.ELASTICSEARCH_ENDPOINT; // Use environment variable
//const api_key = process.env.ELASTICSEARCH_API_KEY; // Use environment variable

app.use(cors());
app.use(express.json()); // Use this for JSON payload parsing

const esClient = new Client({
  node: endpoint,
  auth: {
    apiKey: api_key,
  },
});

app.post('/search', async (req, res) => {
  console.log("Request body:", req.body); 

  try {
    const { query } = req.body;
    console.log(`Received search request with query: ${query}`);

    const searchQuery = {
      index: 'restaurants2',
      body: {
        query: {
          query_string: {
            query: query,
            default_field: "*"
          }
        }
      }
    };

    const result = await esClient.search(searchQuery);
    console.log(result.hits.hits);

    if (result && result.hits && result.hits.hits) {
      res.json(result.hits.hits);
    } else {
      console.log("No results found or malformed response");
      res.json([]);
    }
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
