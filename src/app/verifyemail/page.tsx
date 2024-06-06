'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function VerifyEmail() {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  const verifyToken = async () => {
    try {
      const result = await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
      toast.success(result?.data?.message)
    } catch (err: any) {
      console.log(err)
      setError(true)
    }
  }

  useEffect(() => {
    if (token?.length > 0) {
      verifyToken()
    }
  }, [token])

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-black-950 font-semibold font-mono text-4xl mb-8">
          Verify Email 📧
        </h1>
        {verified && (
          <h3 className="text-violet-800 font-semibold font-mono text-2xl my-4">
            Email Verified{' '}
            {
              <Link className=" underline  decoration-solid" href="/login">
                Login
              </Link>
            }
          </h3>
        )}
        {error && (
          <h3 className="text-violet-800 font-semibold font-mono text-2xl my-4">
            Error{' '}
          </h3>
        )}
      </div>
    </>
  )
}
