import {Link} from 'react-router-dom';

function Header(){
  return(
    <header className="App-header">
    <Link to="/"><h1>掲示板</h1></Link>
    <Link to='/thread/new' className='header-link'>スレッドを立てる</Link>
    </header>
  )
}

export default Header;
