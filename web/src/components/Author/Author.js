import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/AuthorsCell'

const DELETE_AUTHOR_MUTATION = gql`
  mutation DeleteAuthorMutation($id: Int!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Author = ({ author }) => {
  const { addMessage } = useFlash()
  const [deleteAuthor] = useMutation(DELETE_AUTHOR_MUTATION, {
    onCompleted: () => {
      navigate(routes.authors())
      addMessage('Author deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete author ' + id + '?')) {
      deleteAuthor({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Author {author.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{author.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{author.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{author.email}</td>
            </tr>
            <tr>
              <th>Topic</th>
              <td>{author.topic}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(author.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAuthor({ id: author.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(author.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Author
