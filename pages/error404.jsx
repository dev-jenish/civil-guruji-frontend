import React from 'react'
import styles from "@/styles/error404.module.css";

function error404() {
  return (
    <div className='maindiv'>
      <div>
      <img className={styles.bluepic} src="/assets/blueback.png" alt="Error" />
      </div>
      <div>
      <h1 className={styles.heading}>Something went wrong....</h1>
      <img className={styles.robopic} src="/assets/404robo.png" alt="Error" />
      </div>
    </div>
  )
}

export default error404
