import AuthorsLayout from 'src/layouts/AuthorsLayout'
import AuthorCell from 'src/components/AuthorCell'

const AuthorPage = ({ id }) => {
  return (
    <AuthorsLayout>
      <AuthorCell id={id} />
    </AuthorsLayout>
  )
}

export default AuthorPage
