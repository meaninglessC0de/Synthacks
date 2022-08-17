

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import {useEffect, useState} from 'react'
import Calendar from 'react-calendar'
// styles
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('transactions',['uid','==',user.uid],['createdAt','desc'])
  const [showTime, setShowTime] = useState(false) 

  const [date, setDate] = useState(new Date())

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {/* <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={false}
        />

      
      </div> */}
     
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}