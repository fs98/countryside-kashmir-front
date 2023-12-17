import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Button } from '@/components/Button/Button';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmDialog = ({ isOpen, onClose, onConfirm }: ConfirmDialogProps) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Delete item?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this item? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
