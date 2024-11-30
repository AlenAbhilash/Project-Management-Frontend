import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {TokenAuthContext} from '../Context Api/TokenAuth'


function ProjectHeader({ insideDashboard }) {
  const nav = useNavigate()
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext)
  const handelLogout = () => {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    setIsAuthorized(false)
    nav('/')

  }
  return (
    <div>
      <Navbar className='bg-info'>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ background: "none", color: "white" }}>
              <i className='fa-solid fa-list-check me-2'></i>
              Project-Fair
            </Link>
          </Navbar.Brand>
          {
            insideDashboard && <MDBBtn className='btn btn-warning' onClick={handelLogout}>LogOut</MDBBtn>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default ProjectHeader