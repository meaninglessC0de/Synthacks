import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const[date,setDate]=useState('')
  const [description,setDescription] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid, 
      name, 
      description,
      date,
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add an Event:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Event name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Description:</span>
          <input
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
          />
        </label>
        <label>
          <span>Date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDate(e.target.value)} 
            value={date} 
          />
        </label>
        <button>Add Event</button>
      </form>
    </>
  )
}