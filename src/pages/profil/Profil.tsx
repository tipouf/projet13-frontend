import './Profil.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../../redux/slices/userSlice'

const Profil = () => {
  const [user, setUser] = useState<User | null>(null)
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const dispatch = useDispatch()

  type User = {
    firstName: string
    lastName: string
  }

  useEffect(() => {
    dispatch(getUser()).unwrap().then((dataResponse:any) => {
      setUser(dataResponse?.body)
      setFirstName(dataResponse?.body?.firstName || '')
      setLastName(dataResponse?.body?.lastName || '')
    })
  }, [dispatch])

  const updateUserHandler = () => {
    console.log("updateUserHandler", firstName, lastName)
    setUser({ firstName, lastName })
    dispatch(updateUser({ firstName, lastName }))
    setEditing(false)
  }

  const toggleEdit = () => {
    setEditing(!editing)
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />
        {editing ? (
          <div className="edit-form">
            <input type="text" placeholder="prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        ) : (
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        )}
        </h1>
        {editing ? (
          <div className="button-form">
            <button className="edit-button" onClick={() => updateUserHandler()}>Save</button>
            <button className="edit-button" onClick={() => toggleEdit()}>Cancel</button>
          </div>
        ) : (
          <button className="edit-button" onClick={() => toggleEdit()}>Modifier</button>
        )}
        

      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default Profil

