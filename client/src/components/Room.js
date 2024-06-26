import React , {useState} from "react";
import {Modal,Button,Carousel}from 'react-bootstrap'
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration : 2000
});
function Room({ room ,fromdate,todate}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs" data-aos='fade-up'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7 ">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count :{room.maxcount} </p>
          <p>Phone Number :{room.phonenumber} </p>
          <p>Type :{room.type} </p>
        </b>
        <div style={{ float: "right" }}>

           {(fromdate && todate)&&(
                 <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                 <botton className='btn btn primary m-2'>Book Now</botton>
                 </Link>


           )}
          
          <botton className="btn btn-primary"onClick={handleShow}>View Details</botton>
        </div>
      </div>
      
      <Modal show={show} onHide={handleClose}size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Carousel prevLabel='' nextLebel=''>
              
              {room.imageurls.map(url=>{
                return  <Carousel.Item>
                <img 
                   className="d-block w-100 bigimg"

                
                src={url} 
                
                />
                
              </Carousel.Item>
              })}
  
  
  
</Carousel>
<p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
