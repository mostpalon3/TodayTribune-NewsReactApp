import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import "./News.css";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export class News extends Component {
  static defaultProps = {
    pageSize: 18,
    category: "general",
    author: "unknown",
    date: "unknown",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 90,//fixed this to 90 since this api have numerous articles to load plus it throws error since it is developer version of api
    };
    document.title = `${this.capitalize(
      this.props.category === "general"
        ? "Today Tribune - Your Daily Dose of Trusted News"
        : this.props.category) + ' - Today Tribune - Your Daily Dose of Trusted News'
    }`;
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  fetchArticles = async (page) => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${API_KEY}&page=${page}&pageSize=${this.props.pageSize}&sortBy=publishedAt`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(75);
    console.log(parsedData);
    this.setState({
      loading: false,
      page,
      articles: parsedData.articles,
    });
    this.props.setProgress(100);
  };

  // handlePrevClick = () => {
  //   this.fetchArticles(this.state.page - 1);
  // }

  // handleNextClick = () => {
  //   if (this.state.totalResults && this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //     this.fetchArticles(this.state.page + 1);
  //   }
  // }

  //dekho ham na har baari 18 articles load kar rhey so hamare ek array me 18 articles hua, so when we concate the pre existing article with the new fetched article on the next page it is joined with the pre array, array1.concat(array2){we are updating the page here so we will get different array to join everytime}
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    //we are directly updating the page in api since setState is asynchronous and takes time to update
    let url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${API_KEY}&page=${this.state.page+1}&pageSize=${this.props.pageSize}&sortBy=publishedAt`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      // loading: false,
            //since we are showing the spinner with the loader in the infinitescroll component 
      articles: this.state.articles.concat(parsedData.articles),
    });
  };
  capitalize = (text) => {
    let lowerText = text.toLowerCase();
    return lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center headline">Today Tribune - Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <h1 className="text-center ">
            {this.capitalize(this.props.category)}
          </h1>
          <hr />
          {this.state.loading && <Loading/>}
          <div className="row">
            {this.state.articles ? (
              this.state.articles.map((element) => {
                //removes the removed news
                if (element.title !== "[Removed]") {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imgUrl={element && element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        sources={element.source.name}
                      />
                    </div>
                  );
                }
              })
            ) : (
              <h4 className="text-center">
                Unable to fetch data due to Server error :&#x28;
              </h4>
            )}
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</button> */}
        {/* disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} => changing since we are using everything url so we are limiting it to 4 pages */}
        {/* <button className="btn btn-dark" disabled={this.state.page === 4} onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}

export default News;
