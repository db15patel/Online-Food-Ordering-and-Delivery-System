import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../actions/index";
import { setNav } from "../actions/index.js";
import Languageoption from "./LanguageDropDown";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
//import { logout } from '../redux/actions/authActions';

function NavBar() {
  const { t } = useTranslation();
  const navbar = useSelector((state) => state.navbar);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  return (
    <div>
      <nav className="w-full bg-slate-200 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link className="nav-logo" to="/">
                <h1 className="text-black font-bold">
                  {t("Quick")} {t("Food")}
                </h1>
                {/* <img src={Logo}/> */}
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-800 rounded-md outline-none focus:border-black focus:border"
                  onClick={() => dispatch(setNav())}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              {RenderHomeLinks()}
            </div>
          </div>
        </div>
      </nav>
      <Languageoption onChange={(e) => handleClick(e)} />
    </div>
  );
}

function RenderHomeLinks() {
  const isLoggedIn = useSelector((state) => state.loggedInUser.loggedIn);
  const userName = useSelector((state) => state.loggedInUser.userName);
  const isRestaurant = useSelector((state) => state.loggedInUser.isRestaurant);
  const dispatch = useDispatch();
  // const history = useHistory();
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   history.push("/login"); // redirect to login page
  // };

  return (
    <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
      <li className="text-black font-bold">
        <Link to="/restaurants">RESTAURANTS</Link>
      </li>
      <li className="text-black font-bold space-x-4">
        {isLoggedIn ? (
          <>
            <Link className="text-black-700 font-bold hover:text-white-700">
              {userName}{" "}
            </Link>

            <Link to="/login">
              <button
                type="button"
                className="btn rounded-lg bg-orange h-12 px-6"
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(logOutUser());
                  signOut(auth);
                }}
              >
                LOGOUT
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">LOGIN/REGISTER</Link>
        )}
      </li>
      {isLoggedIn && isRestaurant ? (
        <>
          <li className="text-black font-bold">
            <Link to="/restaurants">ADD FOODS</Link>
          </li>
          <li className="text-black font-bold">
            <Link to="/restaurants">MY FOODS</Link>
          </li>
          <li className="text-black font-bold">
            <Link to="/restaurants">ORDER REQUESTS</Link>
          </li>
        </>
      ) : (
        // Render customer links and register restaurant button
        <>
          {!isLoggedIn && (
            <li className="text-black font-bold">
              <Link to="/register-restaurant">
                <button
                  type="button"
                  className="btn rounded-lg bg-orange h-12 px-6"
                >
                  REGISTER RESTAURANT
                </button>
              </Link>
            </li>
          )}
          {isLoggedIn && !userName.isRestaurant && (
            <li className="text-black font-bold">
              <Link to="/restaurants">MY ORDERS</Link>
            </li>
          )}
        </>
      )}
    </ul>
  );
}

// function renderUserAccountLinks() {
//   return (

//     <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//       <li className="text-white">
//         <Link to='/restaurants'>RESTAURANTS</Link>
//       </li>
//       <li className="text-white">
//         <Link to='/orders'>MY ORDERS</Link>
//       </li>
//       <li className="hidden md:flex text-white">
//         Firstname Lastname
//       </li>
//       <li className="text-white">
//         <Link to='/'>
//           <button type="button" className="btn bg-orange h-12 px-6">LOG OUT</button>
//         </Link>
//       </li>
//     </ul>
//   );
// }

export default NavBar;
