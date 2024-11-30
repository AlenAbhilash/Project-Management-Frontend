import React, { useEffect, useState } from 'react';
import ProjectHeader from '../components/Header';
import { Col, Row } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { getAllProject } from '../../services/allApi';

function Projects() {
  const [project, setProjects] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const getAllprojects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };
      // API call
      const result = await getAllProject(searchKey, reqHeader);
      if (result.status === 200) {
        setProjects(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getAllprojects();
  }, [searchKey]);

  return (
    <>
      <ProjectHeader />
      <div className="projects" style={{ marginTop: "100px" }}>
        <h1 className='text-center mt-5 fw-bolder'>All Projects</h1>
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="d-flex w-50 mb-3">
            <input 
              onChange={(e) => setSearchKey(e.target.value)} 
              type="text" 
              className='form-control p-2 m-2' 
              placeholder='Search Projects by technology' 
            />
            <i style={{ marginLeft: '10px' }} className='fa-solid fa-magnifying-glass fa-rotate-90'></i>
          </div>
        </div>
        <Row className='mt-5 container'>
          {project.length > 0 ? project.map((proj) => (
            <Col sm={16} md={6} lg={4} key={proj._id}>
              <ProjectCard project={proj} />
            </Col>
          )) : 'Nothing to Display'}
        </Row>
      </div>
    </>
  );
}

export default Projects;
