import Link from "next/link"


export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left-links">
                <div className="footer-left">
                    <h1 className="footer-logo">Conquera</h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae nisi lectus. Vivamus maximus lectus ut sodales euismod. 
                </div>
                <div className="footer-links">
                    <Link href="/">Ana sayfa</Link>
                    <Link href="/question">Başla</Link>
                </div>
            </div>
            <div className="footer-copy">
                Copyright (c) {new Date().getFullYear()} Conquera. Tüm hakları saklıdır.
            </div>
        </footer>
    )    
}