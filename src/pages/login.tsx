import Link from 'next/link'
import { Lock, UserCircle } from 'phosphor-react'
import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import styles from '../../styles/login.module.scss'


function Login() {

  return (
    <main className="container">
        <div className={styles.boxLogin}>
            <h1>Faça o login</h1>
            <div className={styles.containerInput}>
                <UserCircle size={24} color="#ffff" />
                <input type="text" placeholder='Digite seu email'/>
            </div>
            <div className={styles.containerInput}>
                <Lock size={24} color="#fff" />
                <input  type="password" placeholder='Digite sua senha'/>
            </div>
 
            <Link href="/">
                <a className={styles.buttonSignIn}>
                    Entrar
                </a>
            </Link>
            <div className={styles.hr}>
                <hr/>
                <span>Ou</span>
                <hr/>
            </div>
            <Link href="/signUp">
                <a className={styles.buttonSignUp}>
                    Cadastrar-se
                </a>
            </Link>
        </div>
    </main>
  )
}

export default Login