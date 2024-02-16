import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ContactDetails() {
  const [contactDetails, setContactDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState("");

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const res = await fetch(`/api/listing/getcontacts`);
        if (res.ok) {
          const data = await res.json();
          setContactDetails(data.data); // Assuming the data is in the format { success: true, data: [...] }
        } else {
          console.error("Error:", res.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchContactDetails();
  }, []);

  const handleDeleteContact = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/listing/deletecontact/${contactIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setContactDetails((prev) =>
          prev.filter((contact) => contact._id !== contactIdToDelete)
        );
      } else {
        const data = await res.json();
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div
      className="ptable-auto overflow-x-scroll md:mx-auto p-3 
    scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 max-w-4xl w-full mx-auto"
    >
      <h1 className="text-3xl font-semibold text-center my-7">
        Contact Details
      </h1>
      {contactDetails.length > 0 ? (
        <Table hoverable className="shadow-md border border-gray-300">
          <Table.Head className="bg-gray-700 text-white text-xl">
            <Table.HeadCell className="border border-gray-400 px-4 py-2">
              Date
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-400 px-4 py-2">
              Name
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-400 px-4 py-2">
              Email
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-400 px-4 py-2">
              Message
            </Table.HeadCell>
            <Table.HeadCell className="border border-gray-400 px-4 py-2">
              Delete
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-center py-4 text-xl">
            {contactDetails.map((contact) => (
              <Table.Row key={contact._id} className="bg-white">
                <Table.Cell className="border border-gray-400 px-4 py-2">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="border border-gray-400 px-4 py-2 font-medium text-gray-700">
                  {contact.name}
                </Table.Cell>
                <Table.Cell className="border border-gray-400 px-4 py-2 font-medium text-gray-700">
                  {contact.email}
                </Table.Cell>
                <Table.Cell className="border border-gray-400 px-4 py-2">
                  {contact.message}
                </Table.Cell>
                <Table.Cell className="border border-gray-400 px-4 py-2">
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setContactIdToDelete(contact._id);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No contact details available.</p>
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
            <h3 className="mb-5 text-lg bg-gray-700 text-white">
              Are you sure you want to delete this contact?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteContact}>
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
