
import { Link, NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/movies" className="app-title">
          Каталог фильмов и сериалов
        </Link>

        <nav aria-label="Основная навигация">
          <NavLink to="/movies" end>
            Каталог
          </NavLink>

          <NavLink to="/movies/new">
            Добавить
          </NavLink>
        </nav>
      </header>

      <main>
        <p className="storage-notice">
  Изменения хранятся только до обновления страницы.
</p>
        <Outlet />
      </main>
    </div>
  )
}
