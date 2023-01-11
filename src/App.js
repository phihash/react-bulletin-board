import  { useEffect, useState } from 'react'
import './App.css';
import {  BrowserRouter,  Routes,  Route, Link} from 'react-router-dom';
import Header from './components/Header';
import CreateNewThread from './components/createNewThread';
import Post from './components/Post';

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
      <h1 className='text-center margin-top'>新着スレッド</h1>
      <ThreadItem titles={titles} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
            <Routes>
                <Route path="/" element={<Threads />} />
                <Route path="/thread/new" element={<CreateNewThread />} />
                <Route path="/thread/:id/posts" element={<Post />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
