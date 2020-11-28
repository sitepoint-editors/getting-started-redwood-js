import Author from 'src/components/Author'

export const QUERY = gql`
  query FIND_AUTHOR_BY_ID($id: Int!) {
    author: author(id: $id) {
      id
      name
      email
      topic
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Author not found</div>

export const Success = ({ author }) => {
  return <Author author={author} />
}
