const Article = (props) => {
    return (
        <article>
            
                <div className = "article-container">
                <h3><a href={`https://reddit.com/${props.article.permalink}`} target = "_blank" rel="noreferrer">{props.article.title}</a></h3>
                <img src={props.article.thumbnail} alt="" />
                </div>
                <div className= 'article-container'>                
                <p>Started By: {props.article.author_fullname}</p>
                <p>{props.article.num_comments} Comments</p>
                </div>
        </article>
    )
}

export default Article
