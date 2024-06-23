import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        // console.log(this.state.article);
    }
    async componentDidMount() {
        // let url = "https://mocki.io/v1/40c9f1c7-c82e-4375-9d33-8eceb25a6d9e";
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.API_KEY}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    handlePrevClick = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            article: parsedData.articles,
            loading:false
        })
    }

    handleNextClick = async () => {
        if (Math.ceil(this.state.totalResults / this.props.pageSize) >= (this.state.page+1)) {
            console.log("Next");
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                article: parsedData.articles,
                loading:false
            })
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className='row '>
                    {!this.state.loading && this.state.article?.map((element) => {
                        return <div className='col-md-4 d-flex justify-content-center' key={element.url + element.title}>
                            <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/187925868/vector/newspaper-cover-page.jpg?s=612x612&w=0&k=20&c=SantJnFi_0dCOD_HUXgRSJxagvgL7Wp_F_e-rFSUV_E="} url={element.url} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button type="button" disabled={Math.ceil(this.state.totalResults / this.props.pageSize) < (this.state.page+1)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
