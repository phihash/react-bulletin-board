import { Link } from "react-router-dom";

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

export default ThreadItem;