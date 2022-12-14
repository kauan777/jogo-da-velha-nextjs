import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import styles from "../../styles/home.module.scss";
import { api } from "../lib/axios";
import {
  useAuthentication,
  UserProps,
} from "../contexts/AuthenticationContext";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

type PageProps = {
  data: UserProps;
};

export default function Home({ data }: PageProps) {
  const player = useAuthentication((state) => state.user);
  const setUser = useAuthentication((state) => state.setUser);

  const [rivalNickname, setRivalNickname] = useState<string>("");

  useEffect(() => {
    console.log(data);
    setUser(data);
  }, []);

  const createChannel = async () => {};

  return (
    <>
      <NavBar />
      <main className={styles.container}>
        <h3>Entre na mesma hora que seu rival</h3>
        <input
          placeholder="Digite o nickname do seu rival"
          value={rivalNickname}
          onChange={(e) => setRivalNickname(e.target.value)}
        />
        <button onClick={createChannel}>COMEÇAR</button>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token_user_jogo_da_velha: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data } = await api.get("/player", {
    headers: {
      Authorization: `${token}`,
    },
  });

  return {
    props: {
      data,
    },
  };
};
