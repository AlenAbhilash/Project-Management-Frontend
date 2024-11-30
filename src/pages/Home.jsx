import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { Link, useNavigate } from 'react-router-dom';
import { getHomeProject } from '../../services/allApi';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const nav = useNavigate()
  const [project, setProjects] = useState([])
  const gethomeproject = async () => {
    const result = await getHomeProject()
    if (result.status = 200) {
      setProjects(result.data)
    } else {
      setProjects([])
    }
  }
  console.log(project);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    gethomeproject()
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className="container-fluid bg-info">
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{ fontSize: '80px' }} className='fw-bolder text-light'>
              <i className='fa-solid fa-list-check me-2'></i> Project-Fair
            </h1>
            <p className='text-light'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
              tempora, perspiciatis labore aliquam nihil rem corporis beatae necessitatibus
              nisi totam dolor fugit nostrum magnam eius quis possimus ullam aliquid doloremque?
            </p>
            <Link to={'/login'}>
              <MDBBtn className='btn btn-warning'>Start To Explore</MDBBtn></Link>
          </Col>
          <Col sm={12} md={6}>
            <img
              src='https://logocorps.com/assets/images/new-animate/products-side.gif?v=1'
              style={{ marginLeft: '150px' }}
              className='w-75 rounded-4'
              alt='animated gif'
            />
          </Col>
        </Row>
      </div>
      <div className="all-projects mt-5">
        <h1 className='text-center text-primary fw-bold'>Explore Your Project</h1>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '20px' }}>
          <div style={{ display: 'inline-block', animation: 'scrollLeft 10s linear infinite' }}>
            <Row className='w-75 m-5 g-5'>
              {project.length > 0 && project.map((project, index) => (
                <Col sm={16} md={6} lg={4}>
                  <ProjectCard project={project} />
                </Col>
              ))

              }
            </Row>
          </div>
        </div>
        {
          loggedIn ? <div className='text-center mt-5'>
            <Link to={'/projects'} style={{ textDecoration: "none", color: 'blue' }}>
              <MDBBtn> View More Projects</MDBBtn>
            </Link>
          </div> : <div className='text-center mt-5'>
            <Link to={'/login'} style={{ textDecoration: "none", color: 'blue' }}>
              <MDBBtn> View More Projects</MDBBtn>
            </Link>
          </div>
        }
      </div>
    </>
  );
}

export default Home;
