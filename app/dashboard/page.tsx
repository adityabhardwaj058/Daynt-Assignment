"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import AddEditItemDialog from "../components/AddEditItemDialog";
import { toast } from "react-toastify";

interface Item {
  id: number;
  name: string;
  dateOfBirth: string;
  age: number;
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditItem(null);
    setOpenDialog(true);
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleSave = async (item: Item) => {
    try {
      if (item.id) {
        await fetch(`/api/items/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        setItems(items.map((i) => (i.id === item.id ? item : i)));
        toast.success("Item updated successfully");
      } else {
        const response = await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const newItem = await response.json();
        setItems([...items, newItem]);
        toast.success("Item added successfully");
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "dateOfBirth", headerName: "Date of Birth", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Add New Item
        </Button>
        <Button
          onClick={logout}
          variant="outlined"
          color="secondary"
          sx={{ mb: 2, ml: 2 }}
        >
          Logout
        </Button>
        <DataGrid
          rows={items}
          columns={columns}
          pageSize={10}
          loading={loading}
          autoHeight
        />
        <AddEditItemDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSave}
          item={editItem}
        />
      </Container>
    </ProtectedRoute>
  );
}
