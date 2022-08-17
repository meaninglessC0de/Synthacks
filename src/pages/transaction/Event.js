import { useParams } from 'react-router-dom'
import {useEffect,useState} from 'react'
import { projectFirestore } from '../../firebase/config'
import Calendar from 'react-calendar'
import './Event.css'
// styles

export default function Recipe() {
  const { id } = useParams()
  const [date,setDate]=useState(null)
  const [event, setEvent] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    setIsPending(true)

    const unsub=projectFirestore.collection('transactions').doc(id).onSnapshot((doc)=>{
      if(doc.exists){
        setIsPending(false)
        setEvent(doc.data())
        console.log(doc.data())
        let date=new Date(doc.data().date)
        setDate(date)
        

        
      }else{
        setIsPending(false)
        setError('Could not find recipe')
        console.log(error)
      }
    },(err)=>{
        console.log(err.message)
        setError(err.message)
    })

    return ()=>unsub()
  },[id])


  return (
    <div>
      
      {date && <div className='calendar-container'>
        <Calendar value={date} />
      </div>}
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {event && (
        <>
          <h2 className='header'>{event.name}</h2>
          
          
         

          
        </>
      )}
    </div>
  )
}