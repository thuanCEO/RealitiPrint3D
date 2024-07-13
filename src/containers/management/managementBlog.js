import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/api/api";
import { MdAdd, MdCheck, MdClose } from "react-icons/md";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  {
    name: "Dashboard",
    path: "/reality3d/management/management-dashboard-page",
    current: false,
  },
  {
    name: "Accounts",
    path: "/reality3d/management/management-accounts-page",
    current: false,
  },
  {
    name: "Products",
    path: "/reality3d/management/management-products-page",
    current: false,
  },
  {
    name: "Service",
    path: "/reality3d/management/management-services-page",
    current: false,
  },
  {
    name: "Blogs",
    path: "/reality3d/management/management-blogs-page",
    current: false,
  },
  {
    name: "Orders",
    path: "/reality3d/management/management-orders-page",
    current: false,
  },
  {
    name: "Vouchers",
    path: "/reality3d/management/management-vouchers-page",
    current: false,
  },
  {
    name: "Feedbacks",
    path: "/reality3d/management/management-feedbacks-page",
    current: false,
  },
  {
    name: "Categories",
    path: "/reality3d/management/management-categories-page",
    current: false,
  },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ManagementBlog() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [users, setUser] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const navigate = useNavigate();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleOpenEditModal = (row) => {
    setCurrentRow(row);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentRow(null);
  };
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setNewBlogs({
      productName: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
      image: "",
      status: 1,
    });
  };
  const [newBlogs, setNewBlogs] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    image: "",
    status: 1,
  });
  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 70,
    },
    { field: "blogId", headerName: "Blog Id", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "userId", headerName: "UserId", width: 80 },
    {
      field: "status",
      headerName: "Status",
      width: 30,
      renderCell: (params) => {
        if (params.value === 1) {
          return (
            <MdCheck
              style={{
                color: "green",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20,
              }}
            />
          );
        } else if (params.value === 2) {
          return (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdClose style={{ fontSize: 16, color: "red" }} />
            </span>
          );
        }
        return null;
      },
    },
    {
      field: "detail",
      headerName: "Detail",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          handleDetailsClick(params.row.blogId);
        };

        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            <BiSolidDetail className="icon-table" />
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenEditModal(params.row)}
          >
            <FaRegEdit className="icon-table" />
          </Button>
        );
      },
    },
  ].map((column) => ({
    ...column,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  function toggleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    const url = location.pathname;
    navigation.forEach((item) => {
      if (url === item.path) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
    fetchUsers();
  }, [location]);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/api/Blog/GetAllBlogs");
      const ordersWithId = response.data.map((orders, index) => ({
        ...orders,
        blogId: orders.id,
        id: index + 1,
      }));
      setUser(ordersWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDetailsClick = (blogId) => {
    navigate(`/reality3d/management/management-blogs-details-page/${blogId}`);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    // Convert the value to an integer if the name is "status"
    const updatedValue = name === "status" ? parseInt(value, 10) : value;

    // Update the currentRow state
    setCurrentRow((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };
  const handleSaveEdit = async () => {
    try {
      if (!currentRow || !currentRow.blogId) {
        console.error("Invalid category data.");
        return;
      }
      console.log("Updating user with accId:", currentRow.blogId);

      const dataToUpdate = {
        id: currentRow.accId,
        title: currentRow.title,
        content: currentRow.content,
        userId: currentRow.userId,
        status: parseInt(currentRow.status, 10),
      };

      await axiosClient.put(
        `/api/Blog/UpdateBlog/?id=${currentRow.blogId}`,
        dataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchUsers();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error saving edited data:", error);
    }
  };
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <Fragment>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.path}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton
                      type="button"
                      onClick={toggleOpen}
                      className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-blue focus-ring-offset-blue"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-auto w-auto"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-auto w-auto"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel
                className="md:hidden"
                style={{ maxHeight: "calc(100vh - 16rem)" }}
              >
                <div className="space-y-1 px-[4px] pb-[3px] pt-[2px] sm:px-[6px]">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.path}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-[4px] py-[2px] text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-gray-streamer pb-[3px] pt-[4px]">
                  <div className="flex items-center px-[4px]">
                    <div className="flex-shrink-0">
                      <img
                        className="h-auto w-auto rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-[3px]">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-streamer">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-streamer p-[1px] text-gray-streamer hover:text-white focus:outline-none focus-ring-blue focus-ring-offset-blue"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-auto w-auto" aria-hidden="true" />
                    </button>
                  </div>
                  <Menu as={Fragment} className="">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-streamer" : "",
                              "block px-[4px] py-[2px] text-sm font-medium leading-none text-gray-streamer"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </DisclosurePanel>
            </Fragment>
          )}
        </Disclosure>

        <header className="bg-white shadow h-16 w-full">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Management Blogs
            </h1>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdAdd />}
              onClick={handleOpenAddModal}
            >
              Add Blogs
            </Button>
          </div>
        </header>
        {/* Main  */}
        <div>
          <main>
            <div className="flex flex-wrap justify-center mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-screen w-full">
              <div className="w-full h-full">
                {" "}
                <Row className="justify-content-center">
                  <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    pagination
                  >
                    <div style={{ textAlign: "center" }}>
                      <button onClick={() => {}}>Previous</button>
                      <button onClick={() => {}}>Next</button>
                    </div>
                  </DataGrid>
                </Row>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-category-modal-title"
        aria-describedby="edit-category-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography
            id="edit-category-modal-title"
            variant="h6"
            component="h2"
          >
            Edit Account
          </Typography>
          {currentRow && (
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { mt: 2 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={currentRow.title}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={currentRow.content || ""}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="UserId"
                readOnly // Use readOnly instead of readonly
                name="userId"
                value={currentRow.userId}
                onChange={handleEditChange}
              />

              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={currentRow.status}
                onChange={handleEditChange}
              >
                <MenuItem value={1}>Hoạt động</MenuItem>
                <MenuItem value={2}>Dừng hoạt động</MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
