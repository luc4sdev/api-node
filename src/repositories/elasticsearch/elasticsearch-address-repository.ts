import { AddressRepository } from "../address-repository";
import { getClient } from "@/lib/elasticsearch";

const elasticClient = getClient()


export class ElasticsearchAddressRepository implements AddressRepository {

    async findById(id: string): Promise<any | null> {
        const body = await elasticClient.search({
            index: "address",
            body: {
                query: {
                    match: { id: id },
                },
            },
        });

        if (body.hits.hits.length === 0) {
            return null;
        }

        return body.hits.hits[0]._source;
    }

}