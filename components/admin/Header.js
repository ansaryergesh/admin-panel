import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import {connect} from 'react-redux';
import cookie from 'js-cookie'
import axios from 'axios';
import Flash from './FlashMessage'

function mapStateToProps(state) {
  return {adminReducer:state.adminReducer}
}
const Header = ({adminReducer}) => {
    const router = useRouter()


    const handleLogout = () => {
      axios.get(`${process.env.BASE_URL}/logout?email=${adminReducer.user.email}`,{headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }})
        .then(res=> {
          router.push('/login')
          cookie.remove('admin_token')
        })
    }
    useEffect(() => {
      if(cookie.get('admin_token') === undefined) {
        router.push('/login')
      }
    }, [])
    if(adminReducer.user.name=== null) {
      <div>Загрузка...</div>
    }
    return (
        <>
        <Flash />
        <header role="banner">
          <h1><a className='logo' href='/'>I-credit</a></h1>
          <ul className="utilities">
            <li className="users"><a className='logo' href="/">{adminReducer.user.name}</a></li>
            <li className="logout warn"  onClick={handleLogout}><a href>Log Out</a></li>
          </ul>
        </header>
        <nav role="navigation">
          <ul className="main">
            {/* <li className="dashboard"><a href="#">Dashboard</a></li> */}
            {/* <li className="write"><a href="#">Write Post</a></li> */}
            <li className="edit"><a  className={router.pathname==='/smscenter' ? 'active' : ''} href="smscenter">SMS-Center</a></li>
            <li className="comments"><a className={router.pathname==='/telegram' ? 'active' : ''} href="telegram">Telegram</a></li>
            <li className="users"><a className={router.pathname==='/users' ? 'active' : ''}  href="users">Manage Users</a></li> 
          </ul>
        </nav>
        </>

    )
}

export default connect(mapStateToProps)(Header);