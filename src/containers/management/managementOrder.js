import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Menu,
  Modal,
} from "@mui/material";
import { Row } from "react-bootstrap";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/api/api";
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

export default function ManagementOrder() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [users, setUser] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const navigate = useNavigate();

  const handleOpenEditModal = (row) => {
    setCurrentRow(row);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentRow(null);
  };
  const columns = [
    {
      field: "no",
      headerName: "No",
      width: 70,
    },
    { field: "id", headerName: "Order ID", width: 60 },
    { field: "userId", headerName: "User ID", width: 60 },
    { field: "address", headerName: "Address", width: 100 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "finalPrice", headerName: "Final Price", width: 150 },
    { field: "createdDate", headerName: "Created Date", width: 150 },
    { field: "voucherId", headerName: "Voucher ID", width: 60 },
    {
      field: "shippingId",
      headerName: "Shipping Id",
      width: 60,
    },
    {
      field: "payment",
      headerName: "Payment Method",
      width: 60,
      valueGetter: (params) => {
        if (
          !params ||
          !params.row ||
          !params.row.payment ||
          !params.row.payment.methodName
        ) {
          return "N/A";
        }
        return params.row.payment.methodName;
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => {
        if (params.value === 1) {
          return <span style={{ color: "#ccc" }}>Chờ xát nhận đơn hàng</span>;
        } else if (params.value === 2) {
          return <span style={{ color: "#ffff00" }}>Chờ lấy hàng</span>;
        } else if (params.value === 3) {
          return <span style={{ color: "#00cc00" }}>Chờ giao hàng</span>;
        } else if (params.value === 4) {
          return <span style={{ color: "#228b22" }}>Giao hàng thành công</span>;
        } else if (params.value === 5) {
          return <span style={{ color: "#ff0000" }}>Giao hàng thất bại</span>;
        }
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
          handleDetailsClick(params.row.id);
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
      const response = await axiosClient.get("/api/Order/GetAllOrders");
      console.log("Response from API:", response.data);
      const ordersWithId = response.data.map((orders, index) => ({
        ...orders,
        no: index + 1,
        id: orders.id,
      }));
      setUser(ordersWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDetailsClick = (userID) => {
    navigate(`/reality3d/management/management-order-details-page/${userID}`);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    // Convert the value to an integer if the name is "status"
    //  const updatedValue = name === "status" ? parseInt(value, 10) : value;

    if (name === "status") {
      const updatedValue = parseInt(value, 10);
      const currentStatus = currentRow.status;

      // Define the valid status transitions
      const validTransitions = {
        1: [2, 3, 4, 5],
        2: [3, 4, 5],
        3: [4, 5],
        4: [],
        5: [],
      };
      if (!validTransitions[currentStatus]?.includes(updatedValue)) {
        console.error("Invalid status transition.");
        return;
      }
    }

    setCurrentRow((prev) => ({
      ...prev,
      [name]: name === "status" ? parseInt(value, 10) : value,
    }));
  };
  const handleSaveEdit = async () => {
    try {
      if (!currentRow || !currentRow.id) {
        console.error("Invalid category data.");
        return;
      }

      const dataToUpdate = {
        userId: currentRow.userId,
        address: currentRow.address,
        paymentId: currentRow.paymentId,
        totalPrice: currentRow.totalPrice,
        finalPrice: currentRow.finalPrice,
        voucherId: currentRow.voucherId,
        shippingId: currentRow.shippingId,
        createdDate: currentRow.createdDate,
        status: parseInt(currentRow.status, 10),
      };

      await axiosClient.put(
        `/api/Order/UpdateOrder/?id=${currentRow.id}`,
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
              Management Orders
            </h1>
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
                    pageSize={100}
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
          {/* Edit Modal */}
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
                width: 400,
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
                Edit Category
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
                    label="userId"
                    name="User Id"
                    value={currentRow.userId}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    label="address"
                    name="Address"
                    value={currentRow.address}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    label="paymentId"
                    name="Payment Id"
                    value={currentRow.paymentId}
                    onChange={handleEditChange}
                    readOnly={true}
                  />{" "}
                  <TextField
                    fullWidth
                    label="totalPrice"
                    name="Total Price"
                    value={currentRow.totalPrice}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    label="finalPrice"
                    name="Final Price"
                    value={currentRow.finalPrice}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    label="createdDate"
                    name="Created Date"
                    value={currentRow.finalPrice}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    label="voucherId"
                    name="Voucher Id"
                    value={currentRow.voucherId}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    label="shippingId"
                    name="Shipping Id"
                    value={currentRow.shippingId}
                    onChange={handleEditChange}
                    readOnly={true}
                  />
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={currentRow.status}
                    onChange={handleEditChange}
                  >
                    <MenuItem value={1}>Chờ xác nhận đơn hàng</MenuItem>
                    <MenuItem value={2}>Chờ lấy hàng</MenuItem>
                    <MenuItem value={3}>Chờ giao hàng</MenuItem>
                    <MenuItem value={4}>Giao hàng thành công</MenuItem>
                    <MenuItem value={5}>Giao hàng thất bại</MenuItem>
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
        </div>
      </div>
    </>
  );
}
