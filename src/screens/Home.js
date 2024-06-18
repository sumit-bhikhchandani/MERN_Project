import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');


  const loadFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/foodData', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const res = response.data;
      console.log(res);
      
      if (res && res.length >= 2) {
        setFoodItems(res[0]);
        setFoodCat(res[1]);
      } else {
        console.error('Invalid response from the API', response);
      }
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  };
  

  useEffect(() => {
    loadFoodItems();
  }, []);

  console.log("foodItems:", foodItems);
  console.log("foodCat:", foodCat);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/1175313488/photo/croissant-on-a-white-isolated-background.jpg?s=2048x2048&w=is&k=20&c=myWQoBsyDcAvhxrryzHVukSExO46p0zRlJIFagaF6gc=" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
      {foodCat && foodCat.length > 0 && foodCat.map((data, index) => (
        <div className='row mb-3' key={index}>
          <div className='fs-3 m-3'>{data?.CategoryName}</div>
          <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
          {foodItems && foodItems.length > 0 ? (
            foodItems.filter((items) => (items.CategoryName === data.CategoryName) && (items?.name?.toLowerCase().includes(search?.toLowerCase())))
              .map((filterItems, idx) => (
                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                  <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                </div>
              ))
          ) : (
            <div>No Such Data</div>
          )}
        </div>
      ))}
      </div>
      <Footer />
    </div>
  )
}
