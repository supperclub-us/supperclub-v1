import { Button, Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllChefsAsync, selectAllChefs } from "../slices/allChefsSlice";
import "./chefForm.css";
import { Card, ModalCard } from "../profile/card/Card";
import ClearIcon from '@mui/icons-material/Clear';



const Chefs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const chefs = useSelector(selectAllChefs);

  useEffect(() => {
    dispatch(fetchAllChefsAsync());
  }, [dispatch]);

  console.log("CHEFS-->", chefs);

  const handleClick = (bookingId) => {
    console.log("chefs booking clicked!!!")
    // navigate(`/bookings/${bookingId}`)
  }

  const [open, setOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState("");
  const [selectBooking, setSelectBooking] = useState()
  const handleOpen = (booking) => {
    console.log("ME", booking)
    // setModalScreen(booking);
    setSelectBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderModalScreen = () => {
    if (modalScreen === "booking") {
      return <chefBooking handleOpen={handleOpen} />;
    }

    return <p>default</p>;
  };



  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "500px",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,

    textAlign: "center",
  };


  return (
    <div className="chefs-page-container">
      <header className="chefs-page-banner">
        <h1>Check Out Who's Cooking!</h1>
        <p3>Chefs who want to share their passion with you!</p3>
      </header>
      <div className="chefs-allCards-container">
        {chefs && chefs.length ? (
          chefs.map((chef) => {
            return (
              // Box
              <div key={chef.id} className="chefs-card-container">
                <h3 className="chefName" style={{ marginBottom: '10px' }}>
                  Chef {chef.firstName} {chef.lastName}
                </h3>
                <p style={{ marginBottom: '10px' }}>{chef.bio}</p>
                <p1 style={{ marginBottom: '10px' }}>Current Hostings:</p1>
                <div className="chefs-card-bookingcards-container">

                  {chef.chefBooking && chef.chefBooking.length ? chef.chefBooking.map((booking) => {
                    return (
                      // Button
                      <Button onClick={() => handleOpen(booking)}
                        className="chefs-card-bookingcard common-button"
                        variant="contained"
                        size="small"
                        style={{
                          fontSize: "11px",
                          height: "65px",
                          width: "140px",
                        }}
                        sx={{
                          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
                          backgroundColor: "#EB5757",
                          color: "whitesmoke",
                        }}
                      >
                        <p>{booking.title}</p>
                      </Button>
                    )


                  }) : <p>No Hostings Yet...</p>}

                </div>

              </div>
            );
          })
        ) : (
          <h1>No Chefs Around...</h1>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalCard booking={selectBooking} />
            <Button
              onClick={handleClose}
              startIcon={<ClearIcon />}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}>
            </Button>
          </Box>

        </Modal>

      </div>
    </div>
  );
};

export default Chefs;
