import { Button, Input } from "antd";
import { useState } from "react";

export const ArticleWriter = () => {

    let [keyword, setKeyword] = useState('');
    let [keywords, setKeywords] = useState([]);
    let [article, setArticle] = useState(null);
  
    const generateKeywords = async () => {
      let res = await fetch('http://localhost:4000/article-writer-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: keyword
        })
      });
      let data = await res.json();
      let list = data.data.choices[0].text;
      list = list.split('---');
      setKeywords(list);
    }
  
    const selectKeyword = async (keyword) => {
      let res = await fetch('http://localhost:4000/article-writer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: keyword
        })
      });
      let data = await res.json();
      setArticle(data.data.choices[0].text);
    }
  
    return (
      <div style={{display: 'flex', padding: '1rem', width: '100%'}}>
  
        {/* LEFT SIDE */}
        <div style={{padding: '1rem', width: '50%'}}>
          
          <Input placeholder="Enter the keyword" onChange={(e) => {
            setKeyword(e.target.value);
          }}></Input>
          <Button onClick={generateKeywords}>Generate Long Tail Keywords</Button>
  
          {
            keywords && <div>
              <h4>Long Tail Keywords</h4>
              <ul>
                {
                  keywords.map((keyword, index) => {
                    return <li onClick={() => {
                      selectKeyword(keyword);
                    }} key={index}><a href="#">{keyword}</a></li>
                  })
                }
              </ul>
            </div>
          }
  
        </div>
  
        {/* RIGHT SIDE */}
        <div style={{padding: '1rem', width: '50%'}}>
          <h4>Article</h4>
          {
            article && <div dangerouslySetInnerHTML={{__html: article}}></div>
          }
        </div>
  
      </div>
    )
  }