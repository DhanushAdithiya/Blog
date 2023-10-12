import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useParams } from "react-router-dom";

interface BlogData {
  title: string;
  content: string;
  author: string;
  authorId: string;
  likes: number;
  time: Date;
}

interface UserProfile {
  username: string;
  profilePicture: string;
  instagram: string;
  linkedin: string;
}

function App() {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState<BlogData>();
  const [userData, setUserData] = useState<UserProfile>();

  const getAuthorProfile = useCallback(async (authorId?: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/${authorId}`, {
        method: "GET",
      });
      const data = await response.json();

      if (response.status === 200) {
        setUserData(data);
        console.log(data);
      } else if (response.status === 404) {
        console.log("Author not found");
      } else {
        throw new Error("Failed to fetch author profile");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBlog = useCallback(
    async (blogId?: string) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/blogs/${blogId}`, {
          method: "GET",
        });
        const data = await response.json();

        if (response.status === 200) {
          setBlogData(data);
          getAuthorProfile(data?.authorId);
        } else if (response.status === 404) {
          console.log("Blog not found");
        } else {
          throw new Error("Failed to fetch blog data");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [getAuthorProfile]
  );

  useEffect(() => {
    fetchBlog(blogId);
  }, [blogId, getAuthorProfile, fetchBlog]);

  return (
    <>
      <h1 className="blog-title">{blogData?.title}</h1>
      <p className="blog-content">{blogData?.content}</p>
      <h3 className="blog-author">Written by: {blogData?.author}</h3>
      <img src={userData?.profilePicture} alt="" />
    </>
  );
}

export default App;
