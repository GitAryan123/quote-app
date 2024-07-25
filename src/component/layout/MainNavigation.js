import React from "react";
import styles from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
function MainNavigation() {
  return (
    <header className={styles["header"]}>
      <h1 className={styles["logo"]}>GreateQuotes</h1>
      <nav className={styles["nav"]}>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles["active"] : "")}
              to={"/all-quotes"}
            >
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles["active"] : "")}
              to={"/new-quote"}
            >
              Add a Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
