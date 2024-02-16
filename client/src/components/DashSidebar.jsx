import { Sidebar } from "flowbite-react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
    // window.localStorage.clear();
    // window.location.href = "./sign-in";
  };

  return (
    <Sidebar className="w-full md:w-60 mx-auto">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              className={`text-slate-600  font-semibold ${
                tab === "profile" ? "bg-gray-700  text-white" : ""
              }`}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=listings">
              <Sidebar.Item
                active={tab === "listings"}
                icon={HiDocumentText}
                as="div"
                className={`text-black font-semibold ${
                  tab === "listings" ? "bg-gray-700 text-white" : ""
                }`}
              >
                Property Listings
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
                className={`text-black font-semibold ${
                  tab === "posts" ? "bg-gray-700 text-white" : ""
                }`}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as="div"
                className={`text-black font-semibold ${
                  tab === "users" ? "bg-gray-700 text-white" : ""
                }`}
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=contactdetails">
              <Sidebar.Item
                active={tab === "contactdetails"}
                icon={FaPhoneAlt} // Changed icon to FaPhoneAlt
                as="div"
                className={`text-black font-semibold ${
                  tab === "contactdetails" ? "bg-gray-700 text-white" : ""
                }`}
              >
                Contact Details
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            icon={FaSignOutAlt} // Changed icon to FaSignOutAlt
            className="cursor-pointer text-black font-semibold"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
