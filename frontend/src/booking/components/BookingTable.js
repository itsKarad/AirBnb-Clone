import React from 'react';
import styles from './BookingTable.module.css';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { Badge } from '@chakra-ui/react'
import { Tooltip } from '@chakra-ui/react';

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}
const beautifulDate = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [
        date.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd,
        ].join('-');
};

const BookingTable = (props) => {
    return (
        <div className = {styles["table-container"]}>
            <Table variant='simple'>
                <TableCaption>Your Bookings</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Booking ID</Th>
                        <Th>Date of Booking</Th>
                        <Th>Place Booked</Th>
                        <Th>Dates</Th>
                        <Th>Amount Paid</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.bookings.reverse().map((booking) => {
                        return (
                            <Tr>
                                <Tooltip label = {booking.id}><Td>{booking.createdAt.slice(0,10) === beautifulDate(new Date()) && <Badge colorScheme='red'>New</Badge>} {truncateString(booking.id, 6)}</Td></Tooltip>
                                <Td>{booking.createdAt.slice(0,10)}</Td>
                                <Td>{booking.placeId.title}</Td>
                                <Td>{(booking.bookingStart).slice(0,10)} - {(booking.bookingEnd).slice(0,10)}</Td>
                                <Td>{booking.price}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Booking ID</Th>
                        <Th>Date of Booking</Th>
                        <Th>Place Booked</Th>
                        <Th>Dates</Th>
                        <Th>Amount Paid</Th>
                    </Tr>
                </Tfoot>
                </Table>
        </div>
    );

};

export default BookingTable;