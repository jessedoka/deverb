'use client'

import Navbar from "@/components/navbar"
import { useState } from 'react'
import AuthForm from "@/components/auth-form"

const Login = () => {
    return (
        <>
        <Navbar />
        <div className="container">
            <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
                <AuthForm />
            </div>
            </div>
        </div>
        </>
    )
}

export default Login