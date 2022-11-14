import { useAuthentication } from "../../contexts/AuthenticationContext";
import styles from "./styles.module.scss";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { SignOut } from "phosphor-react";

function NavBar() {
  const user = useAuthentication((state) => state.user);
  const setUser = useAuthentication((state) => state.setUser);
  const router = useRouter();

  const logout = () => {
    setUser(null);
    destroyCookie(undefined, "token_user_jogo_da_velha");
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.infoPlayer}>
        <div className={styles.player}>
          <div className={styles.img}>{user?.nickname[0].toUpperCase()}</div>
          <b>{user?.nickname}</b>
        </div>
        <div> | </div>

        <b>
          Total de vitórias: <span>{user?.totalVictory}</span>
        </b>
      </div>

      <button onClick={logout}>
        <SignOut size={24} weight="bold" color="#ffffff" />
      </button>
    </header>
  );
}

export default NavBar;
