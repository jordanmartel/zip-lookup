import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDef';

const server = new ApolloServer( {
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    /**

     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
    **/
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});