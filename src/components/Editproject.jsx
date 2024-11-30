import React, { useContext, useEffect, useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { server_url } from '../../services/server';
import { editProjectApi } from '../../services/allApi';
import { toast } from 'react-toastify';
import { editProjectResponseContext } from '../Context Api/ContextShare';


function Editproject({ project }) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectData, setProjectData] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: "",
  });
  const [editProjectResponse, setEditProjectResponse] = useContext(editProjectResponseContext)
  const handleShow = () => {
    setShow(true);
    setProjectData({
      id: project._id,
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: project.projectImage,
    });
    setPreview(project.projectImage ? `${server_url}/uploads/${project.projectImage}` : "");
  };

  const handleClose = () => {
    setShow(false);
    setProjectData({ id: project._id, title: project.title, language: project.language, github: project.github, website: project.website, overview: project.overview, projectImage: "" });
    setPreview(projectData.projectImage);
  };

  const handelUpadte = async () => {
    const { title, language, github, website, overview, projectImage } = projectData;
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info("Please fill missing fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage);

      const token = sessionStorage.getItem("token");
      console.log(token);
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": preview ? "multipart/form-data" : "application/json"
        }
        //api call
        try {
          const result = await editProjectApi(projectData.id, reqBody, reqHeader)
          if (result.status == 200) {
            handleClose()
            setEditProjectResponse(result.data)
          } else {
            toast.warn(result.response.data)
          }
        } catch (err) {
          console.log(err.message);

        }
      }
    }
  }
  useEffect(() => {
    if (projectData.projectImage && typeof projectData.projectImage !== 'string') {
      const objectUrl = URL.createObjectURL(projectData.projectImage);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [projectData.projectImage]);

  return (
    <>
      <MDBBtn onClick={handleShow} className='text-dark me-3'>
        <i className='fa-solid fa-pen-to-square m-2'></i>
      </MDBBtn>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input
                  type="file"
                  style={{ display: "none", border: 'none' }}
                  onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })}
                />
                <img
                  src={preview ? preview : `${server_url}/uploads/${project.projectImage}`}
                  alt="Project Preview"
                  className='w-100'
                />
              </label>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <input
                  type="text"
                  className='form-control'
                  placeholder='Project Title'
                  onChange={e => setProjectData({ ...projectData, title: e.target.value })}
                  value={projectData.title}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className='form-control'
                  placeholder='Languages Used'
                  onChange={e => setProjectData({ ...projectData, language: e.target.value })}
                  value={projectData.language}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className='form-control'
                  placeholder='GitHub Link'
                  onChange={e => setProjectData({ ...projectData, github: e.target.value })}
                  value={projectData.github}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className='form-control'
                  placeholder='Website Link'
                  onChange={e => setProjectData({ ...projectData, website: e.target.value })}
                  value={projectData.website}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className='form-control'
                  placeholder='Project Overview'
                  onChange={e => setProjectData({ ...projectData, overview: e.target.value })}
                  value={projectData.overview}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handelUpadte}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Editproject;
