import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaulProps = {
        country : 'in',
        pageSize : 9,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    async updateNews(page){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&page=${page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    async componentDidMount() {
        this.updateNews(1);
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1})
        this.updateNews(this.state.page+1)
    }

    handleNextClick = async () => {
        this.setState({page: this.state.page + 1})
        this.updateNews(this.state.page+1)
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center my-3'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className='row '>
                    {!this.state.loading && this.state.article?.map((element) => {
                        return <div className='col-md-4 d-flex justify-content-center' key={element.url + element.title}>
                            <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/187925868/vector/newspaper-cover-page.jpg?s=612x612&w=0&k=20&c=SantJnFi_0dCOD_HUXgRSJxagvgL7Wp_F_e-rFSUV_E="} url={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button type="button" disabled={!(Math.ceil(this.state.totalResults / this.props.pageSize) >= (this.state.page+1))} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
