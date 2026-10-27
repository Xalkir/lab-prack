import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header>
        <p className="app-title">
          Каталог фильмов и сериалов
        </p>

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
        <Outlet />
      </main>
    </div>
  )
}