import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const updateNews = async (page) => {
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticle(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews(1);
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API_KEY}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticle(article.concat(parsedData.articles));
        setPage(page + 1);
        setTotalResults(parsedData.totalResults)
    }

    return (
        <div className="container my-3">
            <h1 className='text-center my-3'>NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={ article.length !== totalResults }
                loader={<Spinner />}
            >
                <div className="container">
                    <div className='row '>
                        {!loading && article?.map((element) => {
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

News.defaulProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
    setProgress: 0
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
