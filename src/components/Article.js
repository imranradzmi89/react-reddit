const Article = (props) => {
    return (
        <article>
            <a href={`https://reddit.com/${props.article.permalink}`} target = "_blank" rel="noreferrer">
                <div className = "article-container">
                <h3>{props.article.title}</h3>
                <img src={props.article.thumbnail} alt="" />
                </div>
            </a>
        </article>
    )
}

export default Article
