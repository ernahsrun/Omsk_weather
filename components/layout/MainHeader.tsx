import Link from "next/link";

export function MainHeader() {
  return (
    <header className="main-header">
      <div className="main-header__inner">
        <div className="main-header__logo">LOGO</div>

        <nav className="main-header__tabs">
          <Link href="/" className="main-header__tab main-header__tab--active">
            сегодня
          </Link>
          <Link href="/tomorrow" className="main-header__tab">
            завтра
          </Link>
          <Link href="/week" className="main-header__tab">
            неделя
          </Link>
          <Link href="/month" className="main-header__tab">
            месяц
          </Link>
        </nav>
      </div>
    </header>
  );
}
