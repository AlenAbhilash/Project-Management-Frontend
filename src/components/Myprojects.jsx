import React, { useContext, useEffect, useState } from 'react'
import Addproject from '../components/Addproject'
import { MDBBtn } from 'mdb-react-ui-kit'
import { deleteProjectApi, getUserProject } from '../../services/allApi'
import { addProjectContextResponse, editProjectResponseContext } from '../Context Api/ContextShare'
import Editproject from './Editproject'
import { toast } from 'react-toastify'

function Myprojects() {
  const [project, setProject] = useState([])
  const [addProjectResponse, setaddProjectResponse] = useContext(addProjectContextResponse)
  const [editProjectResponse, setEditProjectResponse] = useContext(editProjectResponseContext)

  const getUserProjects = async () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
      // api call
      const result = await getUserProject(reqHeader)
      if (result.status === 200) {
        setProject(result.data)
      } else {
        console.log(result);
      }
    }
  }



  const handelDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      try {
        const result = await deleteProjectApi(id, reqHeader)
        if (result.status == 200) {
          getUserProject()
          toast.success("Deleted Success")
        } else {
          toast.warn(result.response.data)
        }
      } catch (err) {
        console.log(err);

      }
    }
  }

  useEffect(() => {
    getUserProjects();
  }, [addProjectResponse, editProjectResponse]);
  return (
    <>
      <div className="card shadow p-3 mt-5">
        <div className="d-flex">
          <h2>My Projects</h2>
        </div>
        <div className='ms-auto'>
          <Addproject />
        </div>
        <div className="mt-4">
          {/* collection */}
          {project.length > 0 ? project.map((proj) => (
            <div className="border d-flex align-items-center rounded p-3" key={proj._id}>
              <h3 className='fw-bold text-success font-monospace'>{proj.title}</h3>
              <div className="d-flex ms-auto">
                <Editproject project={proj} />
                <a href={proj.github} className='me-3 btn text-dark' target="_blank" rel="noreferrer">
                  <i className='fa-brands fa-github m-2'></i>
                </a>
                <MDBBtn className='text-dark' onClick={() => handelDelete(proj._id)}>
                  <i className='fa-solid fa-trash m-2'></i>
                </MDBBtn>
              </div>
            </div>
          )) : (
            <p className='text-danger'>No Projects Added Yet !!!</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Myprojects
