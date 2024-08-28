import React, { Component } from "react";
import "./Newsitem.css";

export class NewsItem extends Component {
  render() {
    const { title, description, imgUrl, newsUrl, author, date,sources} = this.props;
    return (
      <div className="container my-3 js-card">
        <div className="card container card-css card-style">
          <img src={imgUrl===null?"https://marketplace.canva.com/EAFS3P8tE84/1/0/1600w/canva-red-minimalist-breaking-news-headline-youtube-thumbnail-wnQUmGYKiGc.jpg":imgUrl} className="card-img-top image-style" alt="..." />
          <div className="card-body">
                <h5 className="card-title">
                  {title}
                  <span class="badge text-bg-secondary mx-2">{sources}</span>
                </h5>
            
            <details>
              <summary>
                {description && description.split(" ").slice(0, 30).join(" ")}
              </summary>
              <span className="card-text">
                {description &&
                  description.split(" ").slice(30).join(" ")}
              </span>
            </details>
            <div className="container-card-bottom">
            <span className="card-text author-date">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </span>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
            >
              Read more
            </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
