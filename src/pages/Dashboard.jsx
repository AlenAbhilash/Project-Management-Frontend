import React, { useEffect, useState } from 'react';
import ProjectHeader from '../components/Header';
import Myprojects from '../components/Myprojects';
import Profile from '../components/Profile';
import { Col, Row } from 'react-bootstrap';

function Dashboard() {
  const [username, setUsername] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    } else {
      setUsername("")
    }
  }, [])
  return (
    <>
      <div>
        <ProjectHeader insideDashboard/>
        <Row className="mt-4">
          <Col sm={12} md={6}>
          {
              <h2>
              Welcome {username}<span className="text-warning fw-bolder"></span>
            </h2>
          }
            <Myprojects />
          </Col>
          <Col sm={12} md={6} className='mt-5'>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
