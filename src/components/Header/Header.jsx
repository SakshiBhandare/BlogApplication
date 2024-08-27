import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ]

  return (
    <>
      <header className='py-4 shadow bg-purple-400'>
        <Container>
          <nav className='flex flex-wrap gap-20'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px' />
              </Link>
            </div>

            <div className="relative w-full max-w-md mt-1.5 rounded-lg">
              <input
                type="text"
                placeholder="Search for your favourite topic"
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-purple-50 text-black focus:outline-2 focus:outline-purple-600"
              />
              <FaSearch className="absolute left-3 top-3 text-black" />
            </div>

            <ul className='flex ml-auto'>
              {
                navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)}
                        className='inline-block text-white px-6 py-2 duration-200 hover:bg-purple-900 hover:text-white rounded-full'>
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )
              }

              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  )
}

export default Header
