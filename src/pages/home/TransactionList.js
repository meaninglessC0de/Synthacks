// styles
import styles from './Home.module.css'
import { useFirestore } from '../../hooks/useFirestore'
import Calendar from 'react-calendar'
import {useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

export default function TransactionList({ transactions }) {
  const {deleteDocument} =useFirestore('transactions')
  


  return (

    <ul className={styles.transactions}>


      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <Link to={`/${transaction.id}`}><p className={styles.name}>{transaction.name}</p></Link> 
          <p className={styles.amount}>{transaction.date}</p>
          <button onClick={()=>deleteDocument(transaction.id)}>Delete</button>
        </li>
      ))}
    </ul>
    
  )
}