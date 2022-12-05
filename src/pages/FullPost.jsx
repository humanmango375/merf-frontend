import React, { useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {

  const { id } = useParams()

  const [isLoading, setIsLoading] = React.useState(true)

  const [postData, setPostData] = React.useState({})

  useEffect(() => {
    const fetchPostById = async (id) => {
      setIsLoading(true)
      const { data } = await axios.get(`/posts/${id}`)
      setPostData(data.doc)
      setIsLoading(false)
    }
    fetchPostById(id)
  }, [])

  if (isLoading) {
    return (
      <Post isLoading={isLoading}/>
    )
  }

  return (
    <>
      <Post
        id={id}
        title={postData.title}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullname: postData.user.fullname,
        }}
        createdAt={postData.createdAt}
        viewsCount={postData.viewCount}
        commentsCount={3}
        tags={postData.tags}
        isFullPost
      >
        <ReactMarkdown children={postData.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
