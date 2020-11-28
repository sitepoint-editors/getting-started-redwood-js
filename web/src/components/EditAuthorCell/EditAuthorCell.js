import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import AuthorForm from 'src/components/AuthorForm'

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
const UPDATE_AUTHOR_MUTATION = gql`
  mutation UpdateAuthorMutation($id: Int!, $input: UpdateAuthorInput!) {
    updateAuthor(id: $id, input: $input) {
      id
      name
      email
      topic
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ author }) => {
  const { addMessage } = useFlash()
  const [updateAuthor, { loading, error }] = useMutation(
    UPDATE_AUTHOR_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.authors())
        addMessage('Author updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateAuthor({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Author {author.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AuthorForm
          author={author}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
