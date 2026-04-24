import ArticleGrid from "./main/ArticleGrid";
import Main from "./main/Main";

export default function Home() {
    return (
        <main className="home-wrapper">
            <Main />
            <div className="content-container">
                <ArticleGrid/>
            </div>
        </main>
    )
}