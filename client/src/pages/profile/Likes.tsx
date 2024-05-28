import React, { useEffect, useState } from 'react'
import PostCard from '../../components/card/PostCard'
import Spinner from '../../components/loader/Spinner'
import mail from '../../assets/mail.png'
import { PostProps, reactionProps } from '../../common/interface'
import api from '../../hooks/api'
import config from '../../common/config'

const Likes = () => {
    const payload = localStorage.getItem("payload");
    const payloadObj = payload && JSON.parse(payload);
    const [loading,setLoading]= useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [posts, setData] = useState<PostProps[]>([]);
    const [retrieved, setRetrieved] = useState(false);
    const id = payloadObj?.userID;
    var value = 0;
    const [isLike,setIsLike]=useState(false);
    const [likes,setLikes]=useState<reactionProps[]>([]);

      useEffect(() => {
        fetchLikes();
      }, []);

      const fetchLikes = () => {
        setLikeLoading(true);
        console.log(payloadObj);
    
        api
            .get(`${config.API}/react/retrieve?col=reactor_id&val=${payloadObj?.userID}`)
            .then(async (res) => {
                if (res.data.success === true) {
                    console.log(res.data);
                    const posts = res.data.post;

                    const postDetailsPromises = posts.map(( post: { post_id: any } , index: any) => {
                        console.log(post.post_id)
                        return api
                            .get(`${config.API}/post/retrieve?col=post_id&val=${post.post_id}`)
                            .then((postRes) => {
                                console.log(postRes)
                                if (postRes.data.success === true) {
                                    return postRes.data.post[0];
                                } else {
                                    throw new Error('Failed to retrieve post details');
                                }
                            })
                            .catch((err) => {
                                console.error('Error fetching details for post ${post.post_id}', err);
                                return null;
                            });
                    });
    
                    try {
                        const postDetails = await Promise.all(postDetailsPromises);
                        console.log(postDetails)
                        const validPostDetails = postDetails.filter((post) => post !== null);
                        setData(validPostDetails);
                    } catch (err) {
                        console.error('Error resolving post details promises', err);
                    }
                }
                setLikeLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching likes', err);
                setLikeLoading(false);
            });
    };
    

  return (
    <div className='animate-fade-in'>
        {loading 
            ?
            <div className='flex justify-center mt-[2%]'>
                <Spinner/>
            </div>
            :
            <div>
                <div className='my-[2%]'>
                {likeLoading ? (
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
                    // is_owner={payloadObj?.userID === post.account_id}
                  />
                ))}
                </>
              :
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <img src={mail} alt="Email" className="w-[15%]" />
                  <h1 className="mt-4 text-[#2e2e2e] text-[1.2em] font-light">No liked posts yet...</h1>
                </div>
              }
              </>
            )}
                </div>
            </div>
        }
    </div>
  )
}

export default Likes