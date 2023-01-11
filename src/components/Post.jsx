import { useLocation,useParams } from "react-router-dom";
import { useState , useEffect } from "react";
function Post(){
  const {id} = useParams();
  const location = useLocation();
  const {title} = location.state;
  const [textMessage,setTextMessage] = useState("");
  const [comments,setComments] = useState([]);

  const loadComment = async() => {
    const response  = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`,{
      method: 'GET'
    });
    if(response.status === 200){
      const data = await response.json();
      setComments(data.posts);
    }
  }

  const createComment = async () => {
    await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`,{
      method:'POST',
      body: JSON.stringify({
        "post": textMessage
      })
    }).then(() =>{
      setTextMessage("");
      loadComment()
    })
  }

  const detectTextMessage = (e) => {
    setTextMessage(e.target.value);
  }

  useEffect(() => {
    loadComment()
  },[]);

  return(
    <div className="d-flex">
      <div className="comment-list">
        <h1 className="text-center">{title}</h1>
        <div>
          {comments && comments.map((comment) => {
          return(
              <div key={comment.id} className="comment-item">
                <p>{comment.post}</p>
              </div>
          )
        })}
        </div>
      </div>
      <div className="form-area">
        <textarea className="text-area d-block" onChange={detectTextMessage} value={textMessage} name="" id="" cols="20" rows="6" placeholder='投稿しよう'></textarea>
        <button className="button d-block" onClick={createComment}>投稿する</button>
      </div>
    </div>
  )
}

export default Post;
