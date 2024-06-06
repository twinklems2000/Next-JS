'use client'

import Button from '@/components/button'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async () => {
    try {
      setLoading(true)
      const result = await axios.post('/api/users/forgotpassword', { email })
      console.log('result', result)
      toast.success(result?.data?.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-black-950 font-semibold font-mono text-4xl mb-8">
          Forgot Password
        </h1>
        <div className="flex flex-col">
          <label className="text-black-950 font-mono text-2xl mt-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
            placeholder="Email"
            type="text"
          />
          <Button
            title="Submit"
            handleClick={handleForgotPassword}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  )
}
