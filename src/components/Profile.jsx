import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { server_url } from '../../services/server';
import { toast } from 'react-toastify';


function Profile() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "", email: "", password: "", profileImage: "", github: "", linkedin: ""
  })
  const [existingImage, setImage] = useState('')
  const [perview, setPerview] = useState("")

  //Profile Update
  const handelUpadte = async () => {
    const { username, email, password, profileImage, github, linkedin } = userData
    if (!github || !linkedin) {
      toast.info("Pleases fill")
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      perview ? reqBody.append("profileImage", profileImage) : reqBody.append("existingImage", existingImage)
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);

    }
  }
  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const userDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserData({
        ...userData, username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        github: userDetails.github,
        linkedin: userDetails.linkedin
      }, [open])
    } else {

    }

  }, [])

  useEffect(() => {
    if (userData.profileImage) {
      setPerview(URL.createObjectURL(userData.profileImage))
    } else {
      setPerview('')
    }
  }, [userData.profileImage])

  console.log(userData);

  return (
    <>
      <div>
        <div className="card shadow p-5 mt-4">
          <div className="d-flex justify-content-between">
            <h1>Profile</h1>
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-outline-info"
              aria-controls="profile-collapse"
              aria-expanded={open}
            >
              <i className="fa-solid fa-angle-down fa-beat-fade"></i>
            </button>
          </div>
          <Collapse in={open}>
            <div id="profile-collapse">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => setUserData({ ...userData, profileImage: e.target.files[0] })} />
                {
                  existingImage == "" ? <img
                    width={'200px'}
                    src={perview ? perview : "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"}
                    alt="Profile Placeholder"
                    className="img-thumbnail"
                  /> : <img
                    width={'200px'}
                    src={`${server_url}/uploads/${existingImage}`}
                    alt="Profile Placeholder"
                    className="img-thumbnail"
                  />
                }
              </label>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Github Link"
                  className="form-control" value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })}
                />
                <br />
                <input
                  type="text"
                  placeholder="LinkedIn Link"
                  className="form-control" value={userData.linkedin} onChange={e => setUserData({ ...userData, linkedin: e.target.value })}
                />
              </div>

              <div className="d-grid mt-2">
                <button className="btn btn-warning" onChange={handelUpadte}>Update</button>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Profile;
