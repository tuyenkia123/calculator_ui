import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {transactionService} from "../service/transaction.js";
import {useNavigate} from "react-router-dom";

const TransactionForm = () => {

    const navigate = useNavigate();

    const [rows, setRows] = useState([
        {money: "", content: "", type: ""},
    ]);

    const handleAddRow = () => {
        setRows([...rows, {money: "", content: "", type: ""}]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const handleSave = async () => {
        const validRows = rows.filter(
            (row) => row.money && row.content && row.type
        );

        if (validRows.length === 0) {
            toast.error("Vui lòng điền đầy đủ thông tin trước khi lưu!", {
                duration: 4000,
                style: {
                    background: '#ff4b4b',
                    color: '#fff',
                }
            });
            return;
        }

        try {
            console.log('validRows', validRows)
            const response = await transactionService.create((validRows));
            console.log('response', response)
            if (response) {
                toast.success("Tạo các giao dịch thành công!", {
                    duration: 4000,
                    style: {
                        background: '#4BB543',
                        color: '#fff'
                    }
                });
                setRows([{ money: "", content: "", type: "" }]);
                navigate("/new-transaction");
            } else {
                throw new Error("Có lỗi xảy ra khi gửi dữ liệu!");
            }
        } catch (error) {
            console.log('error', error)
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Nay tài khoản tiêu những gì thì điền vào đây cho taaaaa
            </h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Số tiền</th>
                    <th className="border border-gray-300 p-2">Nội dung</th>
                    <th className="border border-gray-300 p-2">Loại</th>
                    <th className="border border-gray-300 p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td className="border border-gray-300 p-2">
                            <Input
                                type="number"
                                value={row.money}
                                onChange={(e) =>
                                    handleChange(index, "money", e.target.value)
                                }
                                placeholder="Số tiền"
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <Input
                                type="text"
                                value={row.content}
                                onChange={(e) =>
                                    handleChange(index, "content", e.target.value)
                                }
                                placeholder="Nội dung"
                            />
                        </td>
                        <td className="border border-gray-300 p-2">
                            <select value={row.type}
                                    onChange={
                                        (e) =>
                                            handleChange(index, "type", e.target.value)
                                    }>
                                <option value="">----------------</option>
                                <option value="RECEIVER">Nhận</option>
                                <option value="BORROW">Vay</option>
                                <option value="PAID">Thanh toán</option>
                            </select>
                        </td>
                        <td className="border border-gray-300 p-2">
                            {index === 0 ? (
                                <Button onClick={handleAddRow} className="btn-success">
                                    +
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleRemoveRow(index)}
                                    className="btn-danger"
                                >
                                    -
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end gap-4 mt-4">
                <Button
                    onClick={() => (window.location.href = "/transaction/account")}
                    className="btn-dark"
                >
                    Vào đây để xem chi tiết
                </Button>
                <Button onClick={handleSave} className="btn-primary">
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default TransactionForm;