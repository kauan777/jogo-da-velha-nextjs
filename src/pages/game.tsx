import { GetServerSideProps } from "next";
import Board from "../components/Board";
import { parseCookies } from "nookies";
import { api } from "../lib/axios";
import {
  useAuthentication,
  UserProps,
} from "../contexts/AuthenticationContext";
import { useEffect } from "react";
import NavBar from "../components/NavBar";

type PageProps = {
  data: UserProps;
};

export default function Game({ data }: PageProps) {
  const player = useAuthentication((state) => state.user);
  const setUser = useAuthentication((state) => state.setUser);

  useEffect(() => {
    console.log(data);
    setUser(data);
  }, []);

  return (
    <>
      <NavBar />
      <main className="container">
        <Board />
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
