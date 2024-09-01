import { RemixIcon } from '~/icons'
import styles from './header.layout.module.css'

export default function HeaderLayout() {
  return (
    <header className={styles.header}>
      <RemixIcon color='rgba(255, 255, 255, 0.9)' />
      <h1 className={styles.title}>Update Form</h1>
    </header>
  )
}
