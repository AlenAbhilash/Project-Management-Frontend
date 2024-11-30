import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
    MDBRipple
} from 'mdb-react-ui-kit';
import { server_url } from '../../services/server';

function ProjectCard({ project }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <MDBCard className='rounded'>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay rounded' onClick={handleShow} >
                    <MDBCardImage
                       src={`${server_url}/uploads/${project.projectImage}`}
                        fluid
                        alt='Weather app'
                        className='rounded'
                    />
                    <a>
                        <div className='mask rounded' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                </MDBRipple>
                <MDBCardBody>
                    <MDBCardTitle className='fw-bold text-center'>{project.title}</MDBCardTitle>
                </MDBCardBody>
            </MDBCard>
            <Modal show={show} onHide={handleClose} centered className='w-100'>
                <Modal.Header closeButton>
                    <Modal.Title>{project.language} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <img src={`${server_url}/uploads/${project.projectImage}`} className='w-75' alt="" />
                        </Col>
                        <Col md={6}>
                            <h2 className='text-success'>{project.title}</h2>
                            <p><span className='fw-bolder'>{project.overview}</span> : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab alias officiis ullam nam architecto quis recusandae voluptatum. Praesentium, cum! Consequuntur ea expedita incidunt ipsum magnam sint deleniti vero eum molestias.</p>
                            <p><span className='text-warning'>{project.language}</span>HTML,CSS,JS</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mt-2">
                        <a href="" target='_blank' className='me-3 btn text-dark'><i className='fa-brands fa-github fa-2x'></i></a>
                        <a href="" target='_blank' className='me-3 btn text-dark'><i className='fa-brands fa-github fa-2x'></i></a>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProjectCard;
