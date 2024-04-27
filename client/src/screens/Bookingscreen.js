import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from"sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration : 2000
});

function Bookingscreen({ match }) {
  let params = useParams();

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const roomid = params.roomid;

  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays();
  const [totalamount, settotalamount] = useState();

  useEffect(
    () => async () => {
      if(!localStorage.getItem('currentUser'))
      window.location.reload='/login'
      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })
        ).data;
        settotalamount(totaldays * data.room.rentperday);
        setroom(data.room);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    },
    [totaldays]
  );

  
  async function onToken(token) {
    console.log(token);
   
      const bookingDetails = {
        room,
        userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
      };
      try {
        setloading(true);
        const result = await axios.post("/api/bookings/bookroom", bookingDetails);
        setloading(false);
        Swal.fire('Congratulations','Your Room Booked Successfully','success').then(result=>{

          window.location.href='/bookings'
        })
      } catch (error) {
        setloading(false);
      Swal.fire('OOps','Something went wrong','error')
      
      }
      
  }
  return (
    <div className="m-5"data-aos='flip-left'>``
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimage" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>
                    Name :{JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date :{params.fromdate}</p>
                  <p>To Date :{params.todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />

                  <p>Total days :{totaldays}</p>
                  <p> Rent per day :{room.rentperday}</p>
                  <p> Total Amount :{totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51OcMKULWkIUfY6Kn8sUKiWx5sHwOdl1zjDzcj1XLlb54tkEACIvmtJgIq4zRKhFy6km0scO6QRKrrRbGKsFgCw0900RTpguvax"
                >
                  <button className="btn btn-primary">Pay Now{""}</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
