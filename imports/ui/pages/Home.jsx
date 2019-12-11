/* eslint-disable react/jsx-fragments */
import React from 'react';

function Home() {
  return (
    <header>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner" role="listbox">
          <div
            className="carousel-item active"
            style={{
              backgroundImage: "url('https://source.unsplash.com/bF2vsubyHcQ/1920x1080')",
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-4">First Slide</h2>
              <p className="lead">This is a description for the first slide.</p>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url('https://source.unsplash.com/bF2vsubyHcQ/1920x1080')",
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-4">Second Slide</h2>
              <p className="lead">This is a description for the second slide.</p>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url('https://source.unsplash.com/bF2vsubyHcQ/1920x1080')",
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-4">Third Slide</h2>
              <p className="lead">This is a description for the third slide.</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </header>
  );
}

export default Home;
