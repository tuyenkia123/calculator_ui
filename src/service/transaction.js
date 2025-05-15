import {transactionApi} from '../config/api';

export const transactionService = {
    create: (validRows) =>
        transactionApi('/transaction', {
            method: 'POST',
            body: JSON.stringify(validRows)
        }),

    search: (username, page, size, type, fromDate, toDate) =>
        transactionApi(`/transaction?page=${page}&size=${size}&username=${username}&type=${type}&fromDate=${fromDate}&toDate=${toDate}`, {
            method: "GET",
        })
};