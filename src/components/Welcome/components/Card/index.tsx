import React, { ReactNode } from 'react'
import styles from './index.module.scss'


interface CardProps {
  title: string | ReactNode
  extra?: string | ReactNode
  body: string | ReactNode
  bodyHeight?: number
}

const Card = ({ title, extra, body, bodyHeight }: CardProps) => {
  const style = bodyHeight ? { height: bodyHeight } : {}
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        <div>{extra}</div>
      </div>
      <div style={style}>{body}</div>
    </div>
  )
}

export default Card
