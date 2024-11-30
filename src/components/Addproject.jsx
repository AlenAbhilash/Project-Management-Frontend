import { MDBBtn } from 'mdb-react-ui-kit'
import React, {  useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectApi } from '../../services/allApi';

function Addproject() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "", language: "", github: "",
      website: "", overview: "", projectImage: ""
    });
    setPreview('');
  };
  const handleShow = () => setShow(true);

  const [preview, setPreview] = useState("");
  const [fileStatus, setFileStatus] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "", language: "", github: "",
    website: "", overview: "", projectImage: ""
  });

  // Handle Add Project
  const handelAddProject = async () => {
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
      reqBody.append("projectImage", projectImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
        };

        try {
          const result = await addprojectApi(reqBody, reqHeader);
          if (result.status === 200) {
            handleClose();
            toast.info("Project Added")
          } else {
            console.log(result.response ? result.response.data : result.message);
          }
        } catch (error) {
          console.log(error.response ? error.response.data : error.message);
        }
      }
    }
  };

  useEffect(() => {
    if (projectData.projectImage &&
      (projectData.projectImage.type === 'image/png' ||
        projectData.projectImage.type === 'image/jpeg' ||
        projectData.projectImage.type === 'image/jpg')) {
      const imageUrl = URL.createObjectURL(projectData.projectImage);
      setPreview(imageUrl);
      setFileStatus(false);
    } else if (projectData.projectImage) {
      setFileStatus(true);
      setProjectData({ ...projectData, projectImage: "" });
    }
  }, [projectData.projectImage]);

  return (
    <>
      <MDBBtn onClick={handleShow}>Add Project</MDBBtn>
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
                <input type="file" style={{ display: "none", border: 'none' }} onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} />
                <img src={preview || "https://purepng.com/public/uploads/large/purepng.com-photos-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596102asedt.png"} alt="" className='w-100' />
              </label>
              {fileStatus && <div className='mt-3 text-danger'>
                Please upload following file extensions (jpeg/png/jpg)
              </div>}
            </div>
            <div className="col-6">
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Title' onChange={e => setProjectData({ ...projectData, title: e.target.value })} value={projectData.title} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Languages Used' onChange={e => setProjectData({ ...projectData, language: e.target.value })} value={projectData.language} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='GitHub Link' onChange={e => setProjectData({ ...projectData, github: e.target.value })} value={projectData.github} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Website Link' onChange={e => setProjectData({ ...projectData, website: e.target.value })} value={projectData.website} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Project Overview' onChange={e => setProjectData({ ...projectData, overview: e.target.value })} value={projectData.overview} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handelAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addproject;
