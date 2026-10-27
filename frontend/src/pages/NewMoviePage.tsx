import { Link } from 'react-router'

export function NewMoviePage() {
  return (
    <section>
      <h1>Добавление фильма или сериала</h1>

      <p>
        Форма создания фильма или сериала будет добавлена
        в следующей лабораторной работе.
      </p>

      <Link to="/movies">
        ← Вернуться к каталогу
      </Link>
    </section>
  )
}