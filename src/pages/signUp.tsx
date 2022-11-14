import Link from "next/link";
import { api } from "../lib/axios";
import { Detective, Lock } from "phosphor-react";
import { useState } from "react";
import styles from "../../styles/login.module.scss";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Loading from "react-loading";

interface userProps {
  nickname?: string;
  email?: string;
  password?: string;
}

function SignUp() {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const signUp = async () => {
    if (nickname == "" || password == "" || confirmPassword == "") {
      toast.error("Preencha todos os campos");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("As senhas não conferem");
      return;
    }

    const { data } = await api.post("/signUp", {
      nickname: nickname,
      password: password,
    });

    if (data.error) {
      setIsLoading(false);
      toast.error(data.message);
      return;
    }
    setIsLoading(false);
    router.push("/login");
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <main className={styles.container}>
        <div className={styles.boxLogin}>
          <h1>Cadastrar-se</h1>
          <span>Pense bem no seu nickname </span>
          <div className={styles.containerInput}>
            <Detective size={24} color="#4da6f8" />
            <input
              type="text"
              placeholder="Digite seu nickname"
              value={nickname}
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
          <div className={styles.containerInput}>
            <Lock size={24} color="#4da6f8" />
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button className={styles.buttonSignIn} onClick={signUp}>
            {isLoading ? (
              <Loading
                type="spinningBubbles"
                color="#fff"
                width={25}
                height={25}
              />
            ) : (
              <span>Cadastrar-se</span>
            )}
          </button>
        </div>
        <section className={styles.apresentation}>
          <h2>Faça sua conta agora mesmo</h2>
          <span>
            Chame seus amigos e se desafiem em quem é o melhor no jogo da velha
          </span>
          <p>
            Criado por{" "}
            <Link
              target="_blank"
              href="https://www.instagram.com/ikauan.costa/"
            >
              Kauan Costa
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default SignUp;
