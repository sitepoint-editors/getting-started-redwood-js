import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/AuthorsCell'

const DELETE_AUTHOR_MUTATION = gql`
  mutation DeleteAuthorMutation($id: Int!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const AuthorsList = ({ authors }) => {
  const { addMessage } = useFlash()
  const [deleteAuthor] = useMutation(DELETE_AUTHOR_MUTATION, {
    onCompleted: () => {
      addMessage('Author deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete author ' + id + '?')) {
      deleteAuthor({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Topic</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{truncate(author.id)}</td>
              <td>{truncate(author.name)}</td>
              <td>{truncate(author.email)}</td>
              <td>{truncate(author.topic)}</td>
              <td>{timeTag(author.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.author({ id: author.id })}
                    title={'Show author ' + author.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAuthor({ id: author.id })}
                    title={'Edit author ' + author.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete author ' + author.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(author.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuthorsList
