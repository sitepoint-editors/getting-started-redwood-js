import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import AuthorForm from 'src/components/AuthorForm'

import { QUERY } from 'src/components/AuthorsCell'

const CREATE_AUTHOR_MUTATION = gql`
  mutation CreateAuthorMutation($input: CreateAuthorInput!) {
    createAuthor(input: $input) {
      id
    }
  }
`

const NewAuthor = () => {
  const { addMessage } = useFlash()
  const [createAuthor, { loading, error }] = useMutation(
    CREATE_AUTHOR_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.authors())
        addMessage('Author created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createAuthor({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Author</h2>
      </header>
      <div className="rw-segment-main">
        <AuthorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAuthor
