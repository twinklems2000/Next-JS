import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token, password } = reqBody
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ message: 'User Not Exist' }, { status: 400 })
    }

    // hash password

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    console.log(user)

    user.password = hashPassword

    await user.save()

    return NextResponse.json({
      message: 'Password Reset Successfuly',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
