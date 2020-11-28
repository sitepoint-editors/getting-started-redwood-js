import { createAuthor, deleteAuthor } from './authors'

describe('authors', () => {
  let author

  it('creates an author', () => {
    author = createAuthor({ input: { name: 'T', email: 'xyz@abc.xo' } })
  })

  it('deletes an author', () => {
    deleteAuthor(author)
  })
})
