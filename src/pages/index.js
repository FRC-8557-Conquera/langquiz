import Footer from "@app/components/Footer"
import GlobalNav from "@app/components/GlobalNav"
import Link from "next/link"


export default function Home() {
  return (<main className="home-main">
    <GlobalNav />
    <div className="footer-wrap">
      <div className="home-content">
        <h1 className="home-heading">Dil sorularını cevaplayarak kültürel bilginizi genişletin!</h1>
        <Link href="/questions" className="btn btn-lg">Başla</Link>
      </div>
      <Footer />
    </div>
  </main>)
}