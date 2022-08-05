import Link from "next/link";
import { Detective, EnvelopeSimple, Lock } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "../../styles/login.module.scss";

interface userProps {
  nickname?: string;
  email?: string;
  password?: string;
}

function SignUp() {
    const [nickname, setNickname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const signUp = async () => {

    }


  return (
    <main className="container">
      <div className={styles.boxLogin}>
        <h1>Tela de cadastro</h1>
        <div className={styles.containerInput}>
          <Detective size={24} color="#ffff" />
          <input 
            type="text" 
            placeholder="Digite seu nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>
        <div className={styles.containerInput}>
          <EnvelopeSimple size={24} color="#ffff" />
          <input 
            type="text" 
            value={email}
            placeholder="Digite seu email"
           onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.containerInput}>
          <Lock size={24} color="#fff" />
          <input 
            type="password"
            value={password}
            placeholder="Digite sua senha"
            onChange={(event) => setPassword(event.target.value)}
           />
        </div>
        <div className={styles.containerInput}>
          <Lock size={24} color="#fff" />
          <input 
             type="password"
             placeholder="Confirme sua senha"
             value={confirmPassword}
             onChange={(event) => setConfirmPassword(event.target.value)}
             />
        </div>

        <Link href="/login">
          <a className={styles.buttonSignIn} onClick={signUp}>Cadastrar-se</a>
        </Link>
      </div>
    </main>
  );
}

export default SignUp;
