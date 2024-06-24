import React from 'react'

const NewsItem =(props)=> {
        let {title, desc, imgUrl, url, publishedAt, author, source} = props;
        return (
            <div className='my-3' data-bs-theme="dark">
                <div className="card">
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <span className="badge rounded-pill text-bg-primary my-1">{source}</span>
                        <p className="card-text">{desc}</p>
                        <p className="card-text"><small className="text-muted">By {author? author : "Sources"} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div> 
                </div>
            </div>
        )
}

export default NewsItem