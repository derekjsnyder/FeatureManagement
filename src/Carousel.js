import React from "react";
import ThemeContext from "./ThemeContext";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <div className={theme == "healthwise" ? "carousel-hw" : "carousel"}>
            <img src={photos[active]} alt="animal" />
            <div className="carousel-smaller">
              {photos.map((photo, index) => (
                // eslint-disable-next-line
                <img
                  key={photo}
                  onClick={this.handleIndexClick}
                  data-index={index}
                  src={photo}
                  className={index === active ? "active" : ""}
                  alt="animal thumbnail"
                />
              ))}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Carousel;
