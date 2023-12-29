import { useState } from 'react'
import styles from'./Home.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'

const isSuccess = false

interface IFormState {
  name: string
  email: string
}



function Home() {
  const {register, handleSubmit, reset} = useForm<IFormState>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true)
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data),

    }).then(response => 
      response.json()

    ).then(data => {
      if(!data) return

      setIsSuccess(true)
      reset()
    }).finally(() => {
      setIsLoading(false)
    })
  }


  return (
    <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
      {isSuccess ? (
        <div className={styles.success}>Form sent!</div>
      ) : (
        <>
           <h1>GTA 6 - Submit a request</h1>
           <input type="name" placeholder='Enter name:' {...register('name')} />
           <input type="email" placeholder='Enter Email:' {...register('email')} />
           <button disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Take GTA!'}</button>
        </>
           )}
        </form>
    </div>
  )

}

export default Home

