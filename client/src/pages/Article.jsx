
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../utils/queries';
import ContentEditor from '../components/contentEditor/ContentEditor';

function Article() {  
  const { articleId } = useParams();
  const { loading, error, data } = useQuery(GET_ARTICLE, { variables: {articleId} });

  return (
    <div>
      { !loading && !error && data.getArticle &&
        <ContentEditor 
          articleId={data.getArticle._id}
          title={data.getArticle.title}
          content={data.getArticle.content}
          createdArticles={data.getArticle.createdArticles}
          createdPosts={data.getArticle.createdPosts}
          />
      }
      { !loading && error &&
        <p><pre>{JSON.stringify(error, null, 2)}</pre></p>
      }
      { !loading && !error && !data.getArticle &&
        <p>Article not found.</p>
      }
    </div>
  );
}

export default Article;