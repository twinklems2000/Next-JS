import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()

    const { email, username, password } = reqBody

    console.log(reqBody)

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: 'User already exist' }, { status: 400 })
    }

    // hash password

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      email,
      username,
      password: hashPassword,
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    // send email for verification

    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser?._id })

    return NextResponse.json({
      message: 'User Created Successfuly',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
