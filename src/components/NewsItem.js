import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, desc, imgUrl, url, publishedAt, author, source} = this.props;
        return (
            <div className='my-3' data-bs-theme="dark">
                <div className="card">
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <span class="badge rounded-pill text-bg-primary my-1">{source}</span>
                        <p className="card-text">{desc}</p>
                        <p class="card-text"><small class="text-muted">By {author? author : "Sources"} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div> 
                </div>
            </div>
        )
    }
}

export default NewsItem