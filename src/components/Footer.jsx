import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
function ProjectFooter() {
  return (
    <MDBFooter bgColor='info' className='text-center text-lg-start text-muted mt-5 text-white'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span className='text-white'>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='warning' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='warning' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='warning' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='warning' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='warning' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='warning' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-white'>
                <img src="https://images.freeimages.com/fic/images/icons/2794/metro_ui/512/project_alt_2.png" alt="" className='rounded-5' style={{ width: '40px', padding: "2px", margin: "7px" }} />
                Project-Fair
              </h6>
              <p className='text-white'>
                A Project-Fair is a software application or hardware device designed to
                play multimedia files such as , about Project On a software level, media players can handle
                various file formats, including MP3, MP4, AVI, and more, providing users
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-white'>Products</h6>
              <p>
                <a href='#!' className=' text-white text-decoration-none'>
                  Project
                </a>
              </p>
              <p>
                <a href='#!' className=' text-white text-decoration-none'>
                  Topics
                </a>
              </p>
              <p>
                <a href='#!' className=' text-white text-decoration-none'>
                  Diiferent Frame Work
                </a>
              </p>
              <p>
                <a href='#!' className='text-white text-decoration-none'>
                  HD Videos
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-white'>Useful links</h6>
              <p>
                <a href='#!' className=' text-white text-decoration-none'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-white text-decoration-none'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-white text-decoration-none'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-white text-decoration-none'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-white'>Contact</h6>
              <p className='text-white'>
                <MDBIcon color='warning' icon='home' className='me-2' />
                New York, NY 10012, US
              </p>
              <p className='text-white'>
                <MDBIcon color='warning' icon='envelope' className='me-3' />
                info@example.com
              </p>
              <p className='text-white'>
                <MDBIcon color='warning' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p className='text-white'>
                <MDBIcon color='warning' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <img src="https://images.freeimages.com/fic/images/icons/2794/metro_ui/512/project_alt_2.png" alt="" className='rounded-5' style={{ width: '30px', padding: "2px", margin: "7px" }} /><span className='text-white fw-bold'> 2024 Copyright -</span>
        <a className='m-3 fw-bold text-white text-decoration-none' href='' >
          Project-Fair
        </a>
      </div>
    </MDBFooter>
  )
}

export default ProjectFooter