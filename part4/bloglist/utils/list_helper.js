const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((result, blog) => result += blog.likes, 0)
}

module.exports = {
  dummy, totalLikes,
}