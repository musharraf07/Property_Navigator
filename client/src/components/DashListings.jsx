import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";

export default function DashListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [lisitingIdToDelete, setlisitingIdToDelete] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/listing/get`);
        if (res.ok) {
          const data = await res.json();
          setUserListings(data);
          if (data.listing.length < 9) {
            setShowMore(false);
          } // Assuming your response is an array of listings
        } else {
          console.log("Error:", res.status); // Log the error status if response is not ok
        }
      } catch (error) {
        console.log("Error:", error.message); // Log any errors
      }
    };

    if (currentUser.isAdmin) {
      fetchProperty();
    }
  }, [currentUser.isAdmin]);

  console.log(userListings);
  const handleDeletelisitng = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/listing/deletebyadmin/${lisitingIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserListings((prev) =>
          prev.filter((lisiting) => lisiting._id !== lisitingIdToDelete)
        );
      }
    } catch (error) {
      // console.log(error.message);
    }
  };
  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 
    scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 max-w-6xl w-full mx-auto"
    >
      <h1 className="text-3xl font-semibold text-center my-7">Property Listings</h1>
      {currentUser.isAdmin && userListings.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head className="bg-gray-700 text-white text-xl">
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Property Name</Table.HeadCell>
              <Table.HeadCell>Property Address</Table.HeadCell>
              <Table.HeadCell>Delete Property</Table.HeadCell>
            </Table.Head>

            {userListings.map((listing) => (
              <Table.Body className="divide-y text-center py-4 text-xl">
                <Table.Row className="bg-white">
                  <Table.Cell>
                    {new Date(listing.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-700">
                    {listing.name}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-700">
                    {listing.address}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setlisitingIdToDelete(listing._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
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
        <p>You have no Listings yet!</p>
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
            <h3 className="mb-5 text-lg bg-gray-700 text-white">
              Are you sure you want to delete this lisiting?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletelisitng}>
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
