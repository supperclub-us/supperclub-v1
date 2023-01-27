import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import './navbar.css';

const Navbar = () => {

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='navbar-main'>
      <div className='navbar-left'>
        <img id='logo' src="https://i.imgur.com/q8UzAM2.jpg" />
        <h1>SupperClub</h1>
      </div>

      <div className='navbar-right'>
        <Link to="/home">Home</Link>
        <Link to="/chefs">Chefs</Link>
        <Link to="/cuisine">Cuisine </Link> 
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

    </div>
  );
};

export default Navbar;


// return (
//   <div className='navBar'>
//     <div className='navBar-left'>
//       <img id='logo' src="https://i.imgur.com/QpAv4b8.png" />
//       <h1>SupperClub</h1>
//     </div>

//     <nav className='navBar-right'>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <button type="button" onClick={logoutAndRedirectHome}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// );