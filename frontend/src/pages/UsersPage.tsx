import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  InputAdornment,
  Checkbox,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch with token & handle 401
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const res = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        alert("Unauthorized or network error");
      }
    };

    fetchCustomers();
  }, []);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCustomerIds(
      event.target.checked ? customers.map((c) => c.id.toString()) : []
    );
  };

  // ✅ Missing `handleSelectOne` added
  const handleSelectOne = (id: string) => {
    setSelectedCustomerIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted");
      setCustomers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete user");
    }
  };

  // ✅ Fix: this was defined outside the component before
  const filteredCustomers = customers.filter((customer) =>
    [customer.username, customer.email, customer.phone, customer.city]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mt={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={400}>
            Customers
          </Typography>
          <Box mt={1} display="flex" gap={1}>
            <Button startIcon={<UploadIcon />} variant="text">
              Import
            </Button>
            <Button startIcon={<DownloadIcon />} variant="text">
              Export
            </Button>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => alert("Add new customer")}
        >
          Add Customer
        </Button>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 6 }}>
        <CardContent>
          <TextField
            placeholder="Search customers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              width: "50%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "60px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      customers.length > 0 &&
                      selectedCustomerIds.length === customers.length
                    }
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Signed up</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  hover
                  selected={selectedCustomerIds.includes(
                    customer.id.toString()
                  )}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.includes(
                        customer.id.toString()
                      )}
                      onChange={() =>
                        handleSelectOne(customer.id.toString())
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=${customer.email}`}
                        sx={{ mr: 1 }}
                      />
                      {customer.username || customer.name}
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone || "-"}</TableCell>
                  <TableCell>{customer.city || "-"}</TableCell>
                  <TableCell>
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDelete(customer.id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
