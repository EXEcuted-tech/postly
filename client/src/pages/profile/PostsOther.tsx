import React, { useState, useEffect } from "react";
import PostCard from "../../components/card/PostCard";
import Spinner from "../../components/loader/Spinner";
import api from "../../hooks/api";
import { PostProps, UserProps } from "../../common/interface";
import config from "../../common/config";
import mail from '../../assets/mail.png'

const PostsOther = () => {
  const userID = Number(localStorage.getItem('view_id'));
  const [posts, setData] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [retrieved, setRetrieved] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [retrieved]);

  const fetchPosts = () => {
    setPostLoading(true);
    api
      .get(
        `${config.API}/post/retrieve?col=account_id&val=${userID}`
      )
      .then((res) => {
        if (res.data.success === true) {
          setData(res.data.post);
          setTimeout(() => {
            setPostLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="animate-fade-in">
      {loading ? (
        <div className="flex justify-center mt-[2%]">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="my-[2%]">
            {postLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {posts.length > 0 ?
                <>
                {posts.map((post, index) => (
                  <PostCard
                    {...post}
                    key={index}
                    is_owner={false}
                  />
                ))}
                </>
                :
                <div className="flex flex-col items-center justify-center h-[50vh]">
                <img src={mail} alt="Email" className="w-[15%]" />
                <h1 className="mt-4 text-[#2e2e2e] text-[1.2em] font-light">No posts as of now...</h1>
                </div>
                }
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsOther;
