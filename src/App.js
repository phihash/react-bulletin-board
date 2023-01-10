import  { useEffect, useState } from 'react'
import './App.css';
import {  BrowserRouter, useLocation, Routes,  Route, useParams, Link} from 'react-router-dom';
import Header from './components/Header';

function ThreadItem(props){
  const {titles} = props;

  return(
    <div>
      {titles.map((title) => {
         return(
            <div key={title.id} className="thread-item">
              <h3><Link to={`/thread/${title.id}/posts`} state={{ title: title.title }}>{title.title}</Link></h3>
            </div>
         )
      })}
    </div>
  )
}

function Post(){
  const {id} = useParams();
  const location = useLocation();
  const {title} = location.state;
  const [textMessage,setTextMessage] = useState("");
  const [comments,setComments] = useState([]);

  const createComment = async () => {
    await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`,{
      method:'POST',
      body: JSON.stringify({
        "post": textMessage
      })
    })
    setTextMessage((pre) => {
      return "";
    } );
  }

  const detectTextMessage = (e) => {
    setTextMessage(e.target.value);
  }

  useEffect(() => {
    (async() => {
      const response  = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`,{
        method: 'GET'
      });
      if(response.status === 200){
        const data = await response.json();
        setComments(data.posts);
      }
    })()
  },[id]);

  return(
    <>
      <h1>{title}</h1>
      <div>
        {comments && comments.map((comment) => {
         return(
            <div key={comment.id} className="comment-item">
              <p>{comment.post}</p>
            </div>
         )
      })}
      </div>
      <textarea onChange={detectTextMessage} name="" id="" cols="30" rows="10" placeholder='投稿しよう'></textarea>
      <button onClick={createComment}>投稿する</button>
    </>
  )
}

function Threads() {
  const [titles,setTitles] = useState([]);

  useEffect(() => {
    (async() => {
      const response  = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads`,{
        method: 'GET'
      });
      if(response.status === 200){
        const data = await response.json();
        setTitles(data);
      }
    })()
  },[])

  return(
    <div>
      <h1>新着スレッド</h1>
      <ThreadItem titles={titles} />
    </div>
  )
}



function Create(){

    const [text,setText] = useState("");

    const createThread = async () => {
    const response  = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads`,{
      method: 'POST',
      body: JSON.stringify({
        "title": text
      })
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
    setText("");
  }
    const detectForm = (e) => {
      setText(e.target.value);
    }

  return(
    <>
      <h1>スレッド新規作成</h1>
      <input type="text" onChange={detectForm} value={text} placeholder='スレッドタイトル' />
      <Link to='/'>TOPへ戻る</Link>
      <button onClick={createThread}>作成</button>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>

            <Routes>
                <Route path="/" element={<Threads />} />
                <Route path="/thread/new" element={<Create />} />
                <Route path="/thread/:id/posts" element={<Post />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
