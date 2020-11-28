export const schema = gql`
  type Author {
    id: Int!
    name: String!
    email: String!
    topic: String
    createdAt: DateTime!
  }

  type Query {
    authors: [Author!]!
    author(id: Int!): Author
  }

  input CreateAuthorInput {
    name: String!
    email: String!
    topic: String
  }

  input UpdateAuthorInput {
    name: String
    email: String
    topic: String
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author!
    updateAuthor(id: Int!, input: UpdateAuthorInput!): Author!
    deleteAuthor(id: Int!): Author!
  }
`
