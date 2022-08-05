import Link from 'next/link'
import { Lock, UserCircle } from 'phosphor-react'
import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import styles from '../../styles/login.module.scss'


function SignUp() {

  return (
    <main className="container">
        <div className={styles.boxLogin}>
            <h1>Tela de cadastro</h1>
            <div className={styles.containerInput}>
                <UserCircle size={24} color="#ffff" />
                <input type="text" placeholder='Digite seu email'/>
            </div>
            <div className={styles.containerInput}>
                <Lock size={24} color="#fff" />
                <input  type="password" placeholder='Digite sua senha'/>
            </div>
            <div className={styles.containerInput}>
                <Lock size={24} color="#fff" />
                <input  type="password" placeholder='Confirme sua senha'/>
            </div>
 
            <Link href="/login">
                <a className={styles.buttonSignIn}>
                    Cadastrar-se
                </a>
            </Link>
        </div>
    </main>
  )
}

export default SignUp