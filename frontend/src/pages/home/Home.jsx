import Blogs from "../../components/blogs/blogs";

function Home({ blogsData }) {
  return (
    <>
      <Blogs blogsData={blogsData} />
    </>
  )
}

export default Home;