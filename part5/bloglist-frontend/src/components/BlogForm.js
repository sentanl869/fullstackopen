const BlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={props.title}
            name="Title"
            onChange={props.handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={props.author}
            name="Author"
            onChange={props.handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={props.url}
            name="Url"
            onChange={props.handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm