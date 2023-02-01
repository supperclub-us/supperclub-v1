import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleBookingAsync, selectSingleChefBookings } from '../slices/singleBookingSlice';
import { LinearProgress } from '@mui/material';

const MemberBooking = () => {
  const dispatch = useDispatch();
  const { booking, error, isLoading } = useSelector(selectSingleChefBookings);
  console.log("BOOKING FOR MEMBER", booking)
  const { bookingId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleBookingAsync(bookingId));
  }, []);

if (isLoading) {
  return <LinearProgress />
}
if(error) {
  return <div>{error}</div>
}
  return (
    <div>
      {booking.title}
    </div>
  )
}

export default MemberBooking
