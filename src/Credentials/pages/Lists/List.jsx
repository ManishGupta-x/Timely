import React from 'react'
import styles from './List.module.css'
export const List = () => {
  return (
      <div className={styles.container}>
          <div className={styles.items}>
              <h3> Heading </h3>
              <ul className={styles.listItems}>
                  <li>
                      <a>Text1</a>
                  </li>
                  <li>
                      <a>Text2</a>
                  </li>
                  <li>
                      <a>Text3</a>
                  </li>
                  <li>
                      <a>Text4</a>
                  </li>

              </ul>
          </div>
     </div>
  )
}
