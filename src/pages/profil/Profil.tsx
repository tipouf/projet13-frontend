import './Profil.scss'
import { useEffect, useState } from 'react'
import { updateUser } from '../../redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'

const Profil = () => {
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const dispatch = useAppDispatch()
  const { user: userRedux } = useAppSelector((state: { user: { user: { firstName: string; lastName: string } } }) => state.user);

  useEffect(() => {
    setFirstName(userRedux?.firstName)
    setLastName(userRedux?.lastName)
  }, [userRedux])

  const updateUserHandler = () => {
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
            <input type="text" placeholder="prénom" value={firstName} className="edit-input" onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="nom" value={lastName} className="edit-input" onChange={(e) => setLastName(e.target.value)} />
          </div>
        ) : (
          <span>
            {userRedux?.firstName} {userRedux?.lastName}
          </span>
        )}
        </h1>
        {editing ? (
          <div className="button-form">
            <button className="edit-button" onClick={() => updateUserHandler()}>Save</button>
            <button className="edit-button" onClick={() => toggleEdit()}>Cancel</button>
          </div>
        ) : (
          <button className="edit-button" onClick={() => toggleEdit()}>Edit Name</button>
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

