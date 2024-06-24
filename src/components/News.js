import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaulProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
        setProgress :0
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        };

        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`
    }

    async updateNews(page) {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parsedData = await data.json();
        this.props.setProgress(70)
        this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews(1);
    }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews(this.state.page - 1)
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews(this.state.page + 1)
    // }

    fetchMoreData = async () => {
        // this.setState({page : this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ page: this.state.page + 1, article: this.state.article.concat(parsedData.articles), totalResults: parsedData.totalResults });
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center my-3'>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                    // endMessage={
                    //     <p style={{ textAlign: "center" }}>
                    //         <b>Yay! You have seen it all</b>
                    //     </p>
                    // }
                >
                    <div className="container">
                        <div className='row '>
                            {!this.state.loading && this.state.article?.map((element) => {
                                return <div className='col-md-4 d-flex justify-content-center' key={element.url + element.title}>
                                    <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/187925868/vector/newspaper-cover-page.jpg?s=612x612&w=0&k=20&c=SantJnFi_0dCOD_HUXgRSJxagvgL7Wp_F_e-rFSUV_E="} url={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
            </div>
        )
    }
}

export default News
