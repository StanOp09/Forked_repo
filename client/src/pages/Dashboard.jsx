import { Link } from "react-router-dom";

// Import Components
import SideNav from "../components/common/Nav/SideNav";
import CardContainer from "../components/dashboardSection/CardContainer";
// import dashboardMenu from "../components/common/Nav/data/dashboardMenu";

// Import Styles
import styles from "./Dashboard.module.css";

// Apollo
import { useQuery } from "@apollo/client";
import { GET_ARTICLES } from "../utils/queries";

// const Dashboard = () => {
//   const { loading, error, data } = useQuery(GET_ARTICLES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   const cardsData = data.getArticles.map((article) => ({
//     title: article.title,
//     id: article._id,
//   }));

//   if (data.getArticles.length === 0) {
//     return (
//       <div>
//         <p>No articles yet. Start by creating a new one!</p>
//         {/* Possibly add a button or link to go to the article outline generation page */}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboard}>
//       <aside className={styles.sidenav}>
//         <SideNav items={dashboardMenu} />
//       </aside>
//       <main className={styles.mainContent}>
//         <CardContainer
//           title="Draft Articles"
//           type="draft"
//           cardsData={cardsData}
//         />
//         {/* <CardContainer title="Draft Social Media" type="socialMedia" /> */}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

function Dashboard() {
  const {
    loading: articlesLoading,
    error: articlesError,
    data: articlesData,
  } = useQuery(GET_ARTICLES);

  return (
    <div>
      {!articlesLoading && !articlesError && articlesData && (
        <div className={styles.sidebar}>
          <h3>Saved Articles</h3>
          <ul>
            {articlesData.getArticles.map((article) => (
              <li key={article._id}>
                <Link to={{
                  pathname: `/edit-article/${article._id}`,
                  state: { article }
                }}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!articlesLoading && articlesError && (
        <div className={styles.sidebar}>
          Error loading articles: {articlesError}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
