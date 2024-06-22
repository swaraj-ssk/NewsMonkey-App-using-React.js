import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            "article": [],
            loading : false
        };
        // console.log(this.state.article);
    }
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey={API_KEY}";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({article : parsedData.articles});
    }
    render() {
        return (
            <div className="container my-3">
                <h1>NewsMmonkey - Top Headlines</h1>
                <div className='row '>
                    {this.state.article.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title?element.title:""} desc={element.description?element.description:""} imgUrl={element.urlToImage?element.urlToImage :"https://media.istockphoto.com/id/187925868/vector/newspaper-cover-page.jpg?s=612x612&w=0&k=20&c=SantJnFi_0dCOD_HUXgRSJxagvgL7Wp_F_e-rFSUV_E="} url={element.url}/>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default News
