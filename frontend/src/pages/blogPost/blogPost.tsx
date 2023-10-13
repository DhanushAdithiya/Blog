import React, { useCallback, useEffect, useState } from "react";
import "./blog.css";
import Navbar from "../../components/navbar/navbar";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LogoInstagram } from "react-ionicons";
import { LogoLinkedin } from "react-ionicons";

interface BlogData {
  title: string;
  content: string;
  author: string;
  authorId: string;
  likes: number;
  time: Date;
  picture: string;
  summary: string;
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
      <div className="blog-post-main">
        <div className="blog-post-hero">
          <div className="blog-post-headings">
            <h1 className="blog-title">{blogData?.title}</h1>
            <h2 className="summary">{blogData?.summary}</h2>
            <div className="blog-author-section">
              <img
                className="blog-author-picture"
                src={userData?.profilePicture}
                alt="profile"
              />
              <div className="blog-author-links">
                {/* TODO: LINK CHANGE THIS TO A LINK AND LINK IT TO AN ACCOUNT */}
                <h3 className="blog-author-name">{blogData?.author}</h3>
                {userData?.instagram && (
                  <a href={userData.instagram}>
                    <LogoInstagram></LogoInstagram>
                  </a>
                )}
                {userData?.linkedin && (
                  <a href={userData.linkedin}>
                    <LogoLinkedin></LogoLinkedin>
                  </a>
                )}
              </div>
            </div>
          </div>

          <img
            src={blogData?.picture}
            className="blog-post-thumbnail"
            alt="thumbail"
          />
        </div>
      </div>

      <hr />
      <Markdown className="blog-post-content" remarkPlugins={[remarkGfm]}>
        {blogData?.content}
      </Markdown>
    </>
  );
}

export default App;
