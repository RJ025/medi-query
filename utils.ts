import { Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN);

export async function queryPineconeVectorStore (
    client : Pinecone,
    indexname : string,
    namespace : string,
    searchQuery : string
) : Promise<string> {

    const hfOutput = await hf.featureExtraction({
        model : 'mixedbread-ai/mxbai-embed-large-v1',
        inputs : searchQuery
    })

    console.log('hfoutput' , hfOutput);

    const queryEmbbeding = Array.from(hfOutput);
    console.log('queryEmbedding' , queryEmbbeding)
    const index = client.Index(indexname);
    const queryResponse = await index.namespace(namespace).query({
        topK : 5,
        vector : queryEmbbeding as any,
        includeMetadata : true,
        includeValues : false
    })

    console.log(queryResponse)

    if(queryResponse.matches.length > 0) {
        const concatRetrivals = queryResponse.matches.map((match , idx) => {
            return `\n Clinical Findings ${idx+1} : \n ${match.metadata?.chunk}`
        }).join("\n\n")
        console.log(concatRetrivals)
        return concatRetrivals;
    } else {
        return "<no_match>"
    }
}