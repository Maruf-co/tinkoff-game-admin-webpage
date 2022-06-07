import './styles/NotFound.css'

import {Link} from 'react-router-dom'

export const NotFound = () => {
    return (
      <div className='container'>
          <div className='logoWrapper'>
              <Link to = '/'>
                  <img className='logo' src='https://www.tinkoff.ru/system/images/logo.svg'/>
              </Link>
          </div>
          <img className='picture' src='https://www.tinkoff.ru/system/images/404.svg'/>
          <h1 id="title" className="title">Такой страницы нет</h1>
          <div className="content">
              Но&nbsp;есть много других полезных страниц
          </div>

      </div>
    );
}