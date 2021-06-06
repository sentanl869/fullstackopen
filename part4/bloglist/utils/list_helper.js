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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  let result = {}
  let statistic = new Map()
  blogs.forEach(blog => {
    if (statistic.has(blog.author)) {
      let count = statistic.get(blog.author) + 1
      statistic.set(blog.author, count)
    } else {
      statistic.set(blog.author, 1)
    }
  })
  const entires = statistic.entries()
  let max_count = 0
  for (let [k, v] of entires) {
    if (v > max_count) {
      max_count = v
      result = {
        author : k,
        blogs: v,
      }
    }
  }
  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}