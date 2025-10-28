import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LatestUsersList() {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", file: null as File | null });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedFile, setEditedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/products/latest")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch failed", err));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.file) {
      alert("Missing name or file");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("file", newProduct.file);

    axios
      .post("http://localhost:3000/products", formData)
      .then(() => {
        fetchProducts(); // ensure data matches backend
        setNewProduct({ name: "", file: null });
        setShowAddForm(false);
      })
      .catch((err) => {
        console.error("Upload failed", err);
        alert("Upload failed");
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Delete failed", err));
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, product: any) => {
    setAnchorEl(e.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditedName(product.name);
    setEditedFile(null);
    handleMenuClose();
  };

  const saveEdit = (id: number) => {
    const formData = new FormData();
    formData.append("name", editedName);
    if (editedFile) {
      formData.append("file", editedFile);
    }

    axios
      .patch(`http://localhost:3000/products/${id}`, formData)
      .then(() => {
        fetchProducts(); // re-fetch to update
        setEditingId(null);
        setEditedName("");
        setEditedFile(null);
      })
      .catch((err) => console.error("Edit failed", err));
  };

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <Card sx={{ borderRadius: 6, width: "100%" }}>
      <Box display="flex" justifyContent="space-between" px={3} py={2}>
        <Typography variant="h6">Latest Products</Typography>
        <Button variant="contained" onClick={() => setShowAddForm(true)}>
          + Add
        </Button>
      </Box>
      <Divider />

      <List>
        {showAddForm && (
          <ListItem sx={{ borderBottom: "1px solid #eee" }}>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                label="Product Name"
                fullWidth
                variant="standard"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setNewProduct({ ...newProduct, file: e.target.files[0] });
                  }
                }}
                style={{ marginTop: 8 }}
              />
              <Box mt={2}>
                <Button variant="contained" onClick={handleAddProduct}>
                  Save
                </Button>
              </Box>
            </Box>
          </ListItem>
        )}

        {visibleProducts.map((product) => (
          <ListItem key={product.id} sx={{ borderBottom: "1px solid #eee" }}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={`http://localhost:3000${product.img}`}
                sx={{ width: 48, height: 48, borderRadius: 2 }}
              />
            </ListItemAvatar>

            {editingId === product.id ? (
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  variant="standard"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  fullWidth
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setEditedFile(e.target.files[0]);
                    }
                  }}
                  style={{ marginTop: 8 }}
                />
                <Button onClick={() => saveEdit(product.id)} size="small" sx={{ mt: 1 }}>
                  Save
                </Button>
              </Box>
            ) : (
              <ListItemText
                primary={product.name}
                secondary={`Updated: ${new Date(product.updatedAt).toLocaleString()}`}
              />
            )}

            <IconButton onClick={() => handleDelete(product.id)} color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={(e) => handleMenuOpen(e, product)}>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleEdit(selectedProduct)}>Edit</MenuItem>
      </Menu>

      <Box display="flex" justifyContent="flex-end" p={1}>
        {products.length > 4 && (
          <Button sx={{ textTransform: "none" }} onClick={() => setShowAll(!showAll)}>
            {showAll ? "View Less" : "View All"}
            <ChevronRightIcon />
          </Button>
        )}
      </Box>
    </Card>
  );
}
