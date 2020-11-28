import { Link, routes } from '@redwoodjs/router'

import Authors from 'src/components/Authors'

export const QUERY = gql`
  query AUTHORS {
    authors {
      id
      name
      email
      topic
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No authors yet. '}
      <Link to={routes.newAuthor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ authors }) => {
  return <Authors authors={authors} />
}
