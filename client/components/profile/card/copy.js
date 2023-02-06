<>
      <div className="links">
        <h1>
          Welcome
          {currentChef.role === "CHEF"
            ? ` Chef ${currentChef.firstName}`
            : currentChef.firstName}
        </h1>
        <h3> Your Dashboard</h3>
        <hr />
        <Button 
          variant="contained" 
          onClick={() => { window.location.href = `/chefs/${currentChef.id}/event` }}
          sx={{
            "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
            backgroundColor: "#EB5757",
            color: "whitesmoke",
          }}
        >
            Create Event
        </Button>
        <h3>YOUR EVENTS</h3>
        <div className="profileContainer">
          {currentChef && currentChef.chefBooking?.length
            ? currentChef.chefBooking.map((booking) => (<Card booking={booking} />))
            : "No Events"}
        </div>
            <Button
                variant="contained"
                startIcon={<EditIcon />}
            >
                Edit Event
            </Button>
      </div>
    </>