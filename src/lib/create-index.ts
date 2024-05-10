import { getClient } from './elasticsearch'

const createIndex = async (indexName: string) => {
    const elasticClient = getClient()
    await elasticClient.indices.create({ index: indexName });
    console.log("Index created");
};

createIndex("clients");
createIndex("address");
createIndex("routers");