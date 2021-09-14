import React, {useState, useEffect} from 'react'
import Article from './components/Article'


function App() {
  //hook for array of posts
  const [articles,setArticles] = useState([])
  const [subreddit, setSubreddit] = useState(['webdev'])
  //default of 10 posts 
  const [visible,setVisible] = useState(10)
  const [filterFlag, setFilter] = useState('')
  const [nowBrowsingTag, setBrowsingTag] = useState('all')

const showMoreArticles = () => {
  setVisible( (prevValue) => prevValue + 10 )
  
}

const filterPost = (e) => {
  if(e.target.innerHTML === 'all'){
    setFilter('')
    setBrowsingTag('all')
  }
  else {
    setFilter('/' + e.target.innerHTML)
    setBrowsingTag(e.target.innerHTML)
  }
  console.log(filterFlag)
  
}

  useEffect( ()=> {
    fetch(`https://www.reddit.com/r/${subreddit}${filterFlag}.json?limit=100`).then(res => {
      if(res.status !== 200) {
        console.log('FETCH ERROR!')
        return
      }

      res.json().then( data => {
          setArticles(data.data.children)
          console.log(data)
      })
    })
  }, [subreddit,filterFlag])

  return (
    <div className="App">
      <header className = 'App-header'>
        <input type="text" className="input" value= {subreddit} onChange= {e => setSubreddit(e.target.value)} />
      </header>
      <div className ="filter-btn-container">
        <button className ="filter-btn" onClick = {filterPost}>all</button>
        <button className ="filter-btn" onClick = {filterPost}>hot</button>
        <button className ="filter-btn" onClick = {filterPost}>new</button>
        <button className ="filter-btn" onClick = {filterPost}>top</button>
      </div>
      <h1>Now browsing {nowBrowsingTag} posts</h1>
      <div className="articles">
        {/* loop through articles array & pass in data as prop */}
        {
          articles.slice(0,visible).map( (article,index) => <Article key= {index} article = {article.data} /> )
        }
      </div>
      <button className = "load" onClick ={showMoreArticles}>Load More</button>
    </div>
  );
}

export default App;
