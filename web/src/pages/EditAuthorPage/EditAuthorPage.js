import AuthorsLayout from 'src/layouts/AuthorsLayout'
import EditAuthorCell from 'src/components/EditAuthorCell'

const EditAuthorPage = ({ id }) => {
  return (
    <AuthorsLayout>
      <EditAuthorCell id={id} />
    </AuthorsLayout>
  )
}

export default EditAuthorPage
