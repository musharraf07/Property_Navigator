import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Dashusers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setuserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getallusers/${currentUser._id}`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.log("Error:", res.status);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.isAdmin]);

  console.log(users);

  const handleDeleteuser = async () => {
    try {
      const res = await fetch(`/api/user/deleteusers/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 
    scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 max-w-6xl w-full mx-auto"
    >
      <h1 className="text-3xl font-semibold text-center my-7">User Details</h1>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md border-collapse">
            <Table.Head className="bg-gray-700 text-white text-xl">
              <Table.HeadCell className="border border-gray-400">
                Date created
              </Table.HeadCell>
              <Table.HeadCell className="border border-gray-400">
                Username
              </Table.HeadCell>
              <Table.HeadCell className="border border-gray-400">
                email
              </Table.HeadCell>
              <Table.HeadCell className="border border-gray-400">
                {" "}
                Admin
              </Table.HeadCell>
              <Table.HeadCell className="border border-gray-400">
                Delete user
              </Table.HeadCell>
            </Table.Head>

            {users.map((users) => (
              <Table.Body className="divide-y text-center py-4 text-xl">
                <Table.Row key={users._id} className="bg-white">
                  <Table.Cell className="border border-gray-400 whitespace-normal">
                    {new Date(users.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-700 border border-gray-400 whitespace-normal">
                    {users.username}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-700 border border-gray-400 whitespace-normal">
                    {users.email}
                  </Table.Cell>
                  <Table.Cell className="text-center flex justify-center items-center border border-gray-400 pb-6">
                    {users.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>

                  <Table.Cell className="border border-gray-400 whitespace-normal ">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setuserIdToDelete(users._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer "
                    >
                      {" "}
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no Users yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="max-w-sm mx-auto py-5"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center py-5">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteuser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
