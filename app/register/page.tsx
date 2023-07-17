'use client'

import { useState } from "react"
import Navbar from "@/components/navbar"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useRouter } from "next/router"

const Register = () => {
    const supabase = createClientComponentClient()

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

    const [captchaToken, setCaptchaToken] = useState<string>('')

    const handleRegister = async (e: any) => {
        

        try {
            e.preventDefault()
            setLoading(true)

            if (password !== passwordConfirm) {
                throw new Error('Passwords do not match.')
            }

            const { error } = await supabase.auth.signUp({
                email, 
                password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/auth/callback',
                    captchaToken,
                }
            })
            if (error) throw error
            setMessage('Check your email for the confirmation link.')
        } catch (error: any) {
            setMessage(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Register</h3>
                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password"   className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                    {/* confirm password input */}
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" onChange={
                                            (e) => setPasswordConfirm(e.target.value)
                                        }/>
                                    </div>
                                    {/* captcha */}
                                    <div className="mb-3">
                                        <HCaptcha 
                                            sitekey="10000000-ffff-ffff-ffff-000000000001"
                                            onVerify={(token) => setCaptchaToken(token)}
                                            onError={(err) => console.log(err)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        {loading ? 'Loading...' : 'Register'}
                                    </button>
                                </form>
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register



