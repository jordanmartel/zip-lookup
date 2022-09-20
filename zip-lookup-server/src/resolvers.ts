import { PostCode } from './postcode';
import { getPostCode } from './zippoclient'

export const resolvers = {
    Query: {
        postcode: async (parent: any, args: { countryCode: string, postCode: string }): Promise<PostCode> => {
            return getPostCode(args.postCode, args.countryCode)
        },
    },
};
