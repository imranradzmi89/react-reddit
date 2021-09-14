import React, {useState, useEffect} from 'react'
import Article from './components/Article'

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
  crossorigin="anonymous"
/>

function App() {
  //hook for array of posts
  const [articles,setArticles] = useState([])
  const [subreddit, setSubreddit] = useState(['webdev'])
  //default of 10 posts 
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
