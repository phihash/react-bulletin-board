import { useState } from "react";
import { Link } from "react-router-dom";


function CreateNewThread(){
    const [text,setText] = useState("");

    const createThread = async () => {
     await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads`,{
      method: 'POST',
      body: JSON.stringify({
        "title": text
      })
    }).then(() => {
      setText("");
    });
  }
    const detectForm = (e) => {
      setText(e.target.value);
    }

    const isNotNull = () => {//空のタイトルは入力させない
      if(text){
        createThread();
      }
    }

  return(
    <div className="create-new-thread">
      <p className="font-size-large">スレッド新規作成</p>
      <input type="text" className="font-size-large d-block" onChange={detectForm} value={text} placeholder='スレッドタイトル' />
       <Link to='/' className="header-link">TOPへ戻る</Link>
       <button onClick={isNotNull} className="button">作成</button>
    </div>
  )
}

export default CreateNewThread
