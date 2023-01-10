import {Link} from 'react-router-dom';

function Header(){
  return(
    <header className="App-header">
    <h1>掲示板</h1>
    <Link to='/thread/new' className='header-link'>スレッドを立てる</Link>
    </header>
  )
}

export default Header;
