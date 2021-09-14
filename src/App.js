import React, {useState, useEffect} from 'react'
import Article from './components/Article'

function App() {
  const [articles,setArticles] = useState([])
  const [subreddit, setSubreddit] = useState(['webdev'])
  const [visible,setVisible] = useState(10)

const showMoreArticles = () => {
  setVisible( (prevValue) => prevValue + 10 )
}

  useEffect( ()=> {
    fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`).then(res => {
      if(res.status !== 200) {
        console.log('FETCH ERROR!')
        return
      }

      res.json().then( data => {
          setArticles(data.data.children)
          console.log(data)
      })
    })
  }, [subreddit])

  return (
    <div className="App">
      <header className = 'App-header'>
        <input type="text" className="input" value= {subreddit} onChange= {e => setSubreddit(e.target.value)} />
      </header>
      <div className="articles">
        {/* loop through articles array & pass in data as prop */}
        {
          articles.slice(0,visible).map( (article,index) => <Article key= {index} article = {article.data} /> )
        }
      </div>
      <button onClick ={showMoreArticles}>Load More</button>
    </div>
  );
}

export default App;
