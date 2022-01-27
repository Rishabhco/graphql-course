import {GraphQLServer,PubSub} from 'graphql-yoga';
import db from './db'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Posts from './resolvers/Posts';
import Comment from './resolvers/Comment';

const pubsub= new PubSub();

const server=new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:{
        Query,
        Mutation,
        Subscription,
        User,
        Posts,
        Comment,
    },
    context:{
        db,
        pubsub
    }
});

server.start(()=>{
    console.log("Server is up");
})