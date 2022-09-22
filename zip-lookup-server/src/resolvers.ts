import { ZIPPO_URI } from './helpers/constants';
import { PostCode } from './postcode';
import { ZippoClient } from './zippoclient'

const zippoClient = new ZippoClient(ZIPPO_URI);

export const resolvers = {
    Query: {
        postcode: async (parent: any, args: { countryCode: string, postCode: string }): Promise<PostCode> => {
            return zippoClient.getPostCode(args.postCode, args.countryCode)
        },
    },
};
