import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BuyDialog({ symbol, open, handleClose, handleBuy }) {
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => {
    setAmount(e.target.value);
  }

  const handleSubmit = () => {
    if (!amount || amount < 1) {
      alert("Number of stocks must be greater than 0");
    } else {
      handleBuy(symbol, Number(amount));
    }
    setAmount(1);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy { symbol } stocks</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the number of the stocks you want to buy.
          </DialogContentText>
          <TextField
            onChange={handleChange}
            value={amount}
            autoFocus
            margin="dense"
            label="Stocks number"
            type="number"
            width="50%"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Buy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}