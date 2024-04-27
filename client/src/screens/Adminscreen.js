import React, { useState, useEffect, Component } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tabs } from "antd";
import axios from "axios";
import Swal from"sweetalert2";
const { TabPane } = Tabs;
function Adminscreen() {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRoom/>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

//Bookings list Component

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    })();
  }, []);

  return (
    <div classname="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th> Room</th>
              <th> From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((bookings) => {
                return (
                  <tr>
                    <td>{bookings._id}</td>
                    <td>{bookings.userid}</td>
                    <td>{bookings.room}</td>
                    <td>{bookings.fromdate}</td>
                    <td>{bookings.todate}</td>
                    <td>{bookings.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Rooms list Component

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    })();
  }, []);

  return (
    <div classname="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th> Type</th>
              <th>Rent per day </th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


//Users list Component

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    })();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email </th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody></tbody>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}


//Add Room Component



export function AddRoom() {
    const [error, seterror] = useState();
    const [loading, setloading] = useState(false);
    const[name,setname]=useState('')
    const[rentperday,setrentperday]=useState('')
    const[maxcount,setmaxcount]=useState('')
    const[description,setdescription]=useState('')
    const[phonenumber,setphonenumber]=useState('')
    const[type,settype]=useState('')
    const[imgurl1,setimgurl1]=useState('')
    const[imgurl2,setimgurl2]=useState('')
    const[imgurl3,setimgurl3]=useState('')
    async function addRoom(){

        const newroom={
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imgurls:[imgurl1,imgurl2,imgurl3]
           

        }
        try {
            setloading(true)
            const result=await axios.post('/api/rooms/addroom',newroom).data
            console.log(result)
            setloading(false)
            Swal.fire("Congrats",'Your New Room Added Successfully',"success" ).then(result=>{
              window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire("Oops",'Something went wrong',"error" )
        }

    }
  return (
    <div className="row">
        
       <div className="col-md-5">
       {loading && <Loader/>}
        <input type='text' className="form-control"placeholder="room name"
        value={name} onChange={(e)=>{setname(e.target.value)}}
        />

        <input type='text' className="form-control"placeholder="rent per day"
         value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}
         />
        <input type='text' className="form-control"placeholder="max count"
         value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}
         />
        <input type='text' className="form-control"placeholder="description"
         value={description} onChange={(e)=>{setdescription(e.target.value)}}
         />
        <input type='text' className="form-control"placeholder="phone number"
         value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}
         />

       </div>
       <div className="col-md-5">
       <input type='text' className="form-control"placeholder="type"
        value={type} onChange={(e)=>{settype(e.target.value)}}
        />
        <input type='text' className="form-control"placeholder="image URL 1"
         value={imgurl1} onChange={(e)=>{setimgurl1(e.target.value)}}
         />
        <input type='text' className="form-control"placeholder="image URL 2"
         value={imgurl2} onChange={(e)=>{setimgurl2(e.target.value)}}
         />
        <input type='text' className="form-control"placeholder="image URL 3"
         value={imgurl3} onChange={(e)=>{setimgurl3(e.target.value)}}
         />
         <div className="text-right">

             <button className="btn btn primary mt-2"onClick={addRoom}>Add Room</button>
         </div>

       </div>
    </div>
  )
}
