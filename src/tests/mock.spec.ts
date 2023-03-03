import { ApolloServer, gql } from "apollo-server";
import { faker } from "@faker-js/faker";

const typeDefs = gql`
  type Query {
    listUsers: [User]
    hello: String
    user: User
  }
  type User {
    nom: String
    prenom: String
  }
`;

const resolvers = {
  Query: {
    listUsers: () => {},
  },
};

const mocks = {
  String: "Coucou",
  User: () => ({ nom: faker.name.firstName(), prenom: faker.name.lastName() }),
};
const GET_USER = gql`
  query ListUsers {
    listUsers {
      nom
      prenom
    }
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
});

beforeAll(async () => {
  await server.listen({ port: 4006 });
  console.log(`🚀 Server ready`);
});

test("Test", async () => {
  const result = await server.executeOperation({
    query: GET_USER,
    // variables: { id: 1 }
  });
  expect(result.data?.listUsers).not.toHaveLength(0);
});

afterAll(() => setTimeout(() => process.exit(), 1000))
