import { GetServerSideProps } from "next";
import Link from "next/link";
import { Lock, UserCircle } from "phosphor-react";
import { setCookie, parseCookies } from "nookies";
import { Toaster, toast } from "react-hot-toast";

import { useState } from "react";
import styles from "../../styles/login.module.scss";
import { api } from "../lib/axios";
import { useRouter } from "next/router";
import { useAuthentication } from "../contexts/AuthenticationContext";

function Login() {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useAuthentication((state) => state.user);
  const setUser = useAuthentication((state) => state.setUser);
  const router = useRouter();

  console.log(user);

  const signIn = async () => {
    const { data } = await api.post("/login", {
      nickname,
      password,
    });
    if (data.error) {
      toast.error(`${data.message}`);
      return;
    }
    setCookie(undefined, "token_user_jogo_da_velha", data.token, {
      maxAge: 60 * 60 * 1, // 1h
    });

    setUser(data);
    console.log(user);

    router.push("/");
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <main className={styles.container}>
        <section className={styles.boxLogin}>
          <h1>Olá pessoal</h1>
          <span>Entre na sua conta para se divertir</span>
          <div className={styles.containerInput}>
            <UserCircle size={24} color="#4da6f8" />
            <input
              type="text"
              value={nickname}
              placeholder="Digite seu email"
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>
          <div className={styles.containerInput}>
            <Lock size={24} color="#4da6f8" />
            <input
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button onClick={signIn} className={styles.buttonSignIn}>
            Entrar
          </button>
          <div className={styles.hr}>
            <hr />
            <span>Ou</span>
            <hr />
          </div>
          <Link href="/signup">
            <a className={styles.buttonSignUp}>Cadastrar-se</a>
          </Link>
        </section>
        <section className={styles.apresentation}>
          <h2>Bem vindo ao JDV</h2>
          <span>
            Chame seus amigos e se desafiem em quem é o melhor no jogo da velha
          </span>
          <p>Criado por <Link target="_blank" href="https://www.instagram.com/ikauan.costa/">Kauan Costa</Link></p>
        </section>
      </main>
    </>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token_user_jogo_da_velha: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
