import { Link } from "react-router-dom";
// import Banner from "../Banner";

const Nav = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Link to="/">Todos</Link>
      <Link to="/belongs-to">Belongs To</Link>
    </div>
  );
};

export default Nav;
