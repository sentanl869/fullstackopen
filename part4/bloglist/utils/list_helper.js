const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((result, blog) => result += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((last, curr) => last.likes > curr.likes ? last : curr)
}

module.exports = {
  dummy, totalLikes, favoriteBlog,
}