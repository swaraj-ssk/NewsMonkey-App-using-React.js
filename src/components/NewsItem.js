import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, desc, imgUrl, url} = this.props;
        return (
            <div className='my-3' data-bs-theme="dark">
                <div className="card" style={{width: "18rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div> 
                </div>
            </div>
        )
    }
}

export default NewsItem