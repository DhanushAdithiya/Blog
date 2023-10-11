import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useParams } from "react-router-dom";

interface BlogData {
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  likes: number;
  time: Date;
}

function App() {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState<BlogData>();
  async function fetchBlog(blogId?: string) {
    const response = await fetch(`http://127.0.0.1:8000/blogs/${blogId}`, {
      method: "GET",
    });
    const data = await response.json();
    if (response.status === 200 && data) {
      setBlogData(data);
    } else if (response.status === 404) {
      console.log(data);
    } else {
      console.log(data);
    }
  }

  // TODO IMPLEMENT THIS FEATURE TO GET SOCIALS OF THE AUTHOR
  // async function getAuthorProfile(authorId: string) {
  //   const response = await fetch(
  //     `http://127.0.0.1:8000/user/${blogData?.authorId}`,
  //     {
  //       method: "GET",
  //     }
  //   );

  //   const data = await response.json();
  //   if (response.status === 200 && data) {
  //   }
  // }
  useEffect(() => {
    fetchBlog(blogId);
  });

  return (
    <>
      <h1 className="blog-title">{blogData?.title}</h1>
      <p className="blog-content">{blogData?.content}</p>
      <h3 className="blog-author">Written by: {blogData?.authorName}</h3>
      {/* <h3 className="blog-time-written">Written at {blogData?.time}</h3> */}
    </>
  );
}

export default App;
