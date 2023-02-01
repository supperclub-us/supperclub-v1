import React from 'react';
import { useParams } from 'react-router-dom';

const MemberBooking = () => {

  const { bookingId } = useParams();

  return (
    <div>
      TESTING MEMBER BOOKING
    </div>
  )
}

export default MemberBooking
