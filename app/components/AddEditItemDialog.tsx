import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface Item {
  id?: number;
  name: string;
  dateOfBirth: string;
  age: number;
}

interface AddEditItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Item) => void;
  item: Item | null;
}

export default function AddEditItemDialog({
  open,
  onClose,
  onSave,
  item,
}: AddEditItemDialogProps) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDateOfBirth(item.dateOfBirth);
    } else {
      setName("");
      setDateOfBirth("");
    }
  }, [item]);

  const handleSave = () => {
    const age = calculateAge(dateOfBirth);
    onSave({ id: item?.id, name, dateOfBirth, age });
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{item ? "Edit Item" : "Add New Item"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
