import Link from "next/link";

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img
          src="/logo.svg"
          width={44}
          height={44}
          alt="agenticjournaling"
          className="logo-img"
        />
        <Link href="/" className="logo-font">
          agenticjournaling
        </Link>
        <div className="nav-menu">
          <a
            href="mailto:info@agenticjournaling.com"
            className="mail-icon-link"
            aria-label="Email"
          >
            <img
              src="/mail.svg"
              width={20}
              height={20}
              alt="send mail"
              className="mail-icon"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
