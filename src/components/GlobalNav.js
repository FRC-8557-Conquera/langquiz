import config from "@app/lib/config"
import Link from "next/link"

export default function GlobalNav() {
    return (<nav className="global-nav-root">
        <Link className="global-nav-name" href="/">{config.appName}</Link>
        <div className="global-nav-items">
            <a href="/">Ana sayfa</a>
            <Link href="/questions" className="btn">Başla</Link>
        </div>
    </nav>)
}