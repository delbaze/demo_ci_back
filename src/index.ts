import * as dotenv from "dotenv";

dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { WilderResolver } from "./resolver/wilder.resolver";
import { buildSchema } from "type-graphql";
import datasource from "./lib/datasource";

console.log("coucou")
const start = async (): Promise<void> => {
  const schema = await buildSchema({ resolvers: [WilderResolver], validate: false});
  const server = new ApolloServer({
    schema,
    
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  server.listen().then(async ({ url }) => {
    await datasource.initialize();
    console.log(`Serveur lancé sur ${url}`);
  });
};
start();
