import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContextValue";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext) || {};

  const hoverUnderline =
    "relative after:block after:h-[2px] after:bg-[#5F6FFF] after:absolute after:left-0 after:bottom-[-3px] after:w-0 hover:after:w-full after:transition-all after:duration-300";

  return (
    <>
      {/* Overlay when mobile menu is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <nav className="w-full border-b border-gray-300 bg-white relative z-50">
        {/* DESKTOP & MOBILE TOP BAR */}
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LEFT (Mobile hamburger) */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>

          {/* CENTER LOGO MOBILE — BUT DESKTOP ALIGNS LOGO LEFT */}
          <img
            className="w-40 cursor-pointer md:mr-8"
            src={assets.logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />

          {/* DESKTOP NAV ITEMS */}
          <ul className="hidden md:flex items-center gap-10 text-gray-700 font-semibold flex-1">
            <NavLink to="/" className={hoverUnderline}>
              HOME
            </NavLink>
            <NavLink to="/doctors" className={hoverUnderline}>
              ALL DOCTORS
            </NavLink>
            <NavLink to="/about" className={hoverUnderline}>
              ABOUT
            </NavLink>
            <NavLink to="/contact" className={hoverUnderline}>
              CONTACT
            </NavLink>
          </ul>

          {/* RIGHT PROFILE PIC */}
          <div className="relative flex items-center gap-3">
            {/* Desktop CTA when not logged in */}
            {!token && (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:inline-block px-4 py-2 bg-[#5F6FFF] text-white rounded-full font-semibold"
              >
                Create Account
              </button>
            )}

            {token && (
              <img
                src={userData?.image || assets.profile_pic}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border object-cover"
                onClick={() => setShowMenu(!showMenu)}
              />
            )}

            {showMenu && (
              <div className="absolute top-12 right-0 bg-white border rounded-lg w-40 p-3 flex flex-col gap-3 z-50">
                <button
                  className="text-left hover:text-[#5F6FFF]"
                  onClick={() => {
                    navigate("/my-profile");
                    setShowMenu(false);
                  }}
                >
                  My Profile
                </button>
                <button
                  className="text-left hover:text-[#5F6FFF]"
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowMenu(false);
                  }}
                >
                  My Appointments
                </button>
                <button
                  className="text-left hover:text-[#5F6FFF]"
                  onClick={() => {
                    // clear token via context
                    if (setToken) setToken(null);
                    setShowMenu(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* LEFT SLIDE MENU (Mobile) */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden 
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <X
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <ul className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium">
            {token && (
              <>
                <button
                  onClick={() => {
                    navigate("/my-profile");
                    setOpen(false);
                  }}
                  className="text-left hover:text-[#5F6FFF]"
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/my-appointments");
                    setOpen(false);
                  }}
                  className="text-left hover:text-[#5F6FFF]"
                >
                  My Appointments
                </button>

                <button
                  onClick={() => {
                    if (setToken) setToken(null);
                    setOpen(false);
                  }}
                  className="text-left hover:text-[#5F6FFF]"
                >
                  Logout
                </button>

                <hr />
              </>
            )}

            <NavLink to="/" onClick={() => setOpen(false)}>
              HOME
            </NavLink>
            <NavLink to="/doctors" onClick={() => setOpen(false)}>
              ALL DOCTORS
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              ABOUT
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              CONTACT
            </NavLink>

            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="px-5 py-2 bg-[#5F6FFF] text-white rounded-full font-semibold w-full mt-2"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
