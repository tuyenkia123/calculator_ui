import React, { useEffect, useRef, useState } from "react";
import { transactionService } from "@/service/transaction.js";
import { Card, CardContent } from "@/components/ui/card.js";
import { Clock, DollarSign, MessageCircle } from "lucide-react";
import { DatePicker, Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const username = localStorage.getItem("username");
    const fullName = localStorage.getItem("fullName");
    const lastFetchedPage = useRef(null);

    const [type, setType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const { RangePicker } = DatePicker;

    const types = [
        { label: "Tất cả", value: "ALL" },
        { label: "Nhận", value: "RECEIVER" },
        { label: "Vay", value: "BORROW" },
        { label: "Thanh toán", value: "PAID" },
    ];

    useEffect(() => {
        if (isLoading || !hasMore || lastFetchedPage.current === page) return;
        if ((fromDate && !toDate) || (!fromDate && toDate)) return;

        const fetchTransactions = async () => {
            setIsLoading(true);
            lastFetchedPage.current = page;
            try {
                const response = await transactionService.search(username, page, size, type, fromDate, toDate);
                if (response) {
                    setTransactions((prev) => [...prev, ...response.content]);
                    setHasMore(!response.last);
                }
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [page, type, fromDate, toDate, isLoading, hasMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                if (!isLoading && hasMore) {
                    setPage((prev) => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);

    // Reset data when filters change
    useEffect(() => {
        if ((fromDate && toDate) || type) {
            setPage(0);
            setTransactions([]);
            setHasMore(true);
            lastFetchedPage.current = null;
        }
    }, [type, fromDate, toDate]);

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Lịch sử giao dịch của {fullName}</h1>
            <div className="mb-6 flex flex-wrap gap-4">
                <Dropdown
                    overlay={
                        <Menu
                            onClick={({ key }) => {
                                setType(key);
                                setPage(0);
                                setTransactions([]);
                                setHasMore(true);
                                lastFetchedPage.current = null;
                            }}
                            items={types.map((item) => ({
                                key: item.value,
                                label: item.label,
                            }))}
                        />
                    }
                    className="h-10"
                >
                    <Button>
                        {types.find((item) => item.value === type)?.label || "Chọn loại"} <DownOutlined />
                    </Button>
                </Dropdown>

                <RangePicker
                    format="YYYY-MM-DD"
                    placeholder={["Từ ngày", "Đến ngày"]}
                    value={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : null}
                    onChange={(dates, dateStrings) => {
                        setFromDate(dateStrings[0] || "");
                        setToDate(dateStrings[1] || "");
                        if (dateStrings[0] && dateStrings[1]) {
                            setPage(0);
                            setTransactions([]);
                            setHasMore(true);
                            lastFetchedPage.current = null;
                        }
                    }}
                    className="border border-gray-300 p-2 rounded h-10"
                />
            </div>
            {transactions.map((transaction) => (
                <Card key={transaction.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <div>
                                    <p className="font-medium text-lg text-left">{transaction.type}</p>
                                    <div className="mt-2 flex items-center text-sm text-gray-600">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        <span>Số tiền: {transaction.money || "N/A"} VNĐ</span>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-600">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        <span>Nội dung: {transaction.content || "N/A"}</span>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>Thời gian thực hiện: {transaction.createdAt || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            {isLoading && <p className="text-center mt-4">Đang tải...</p>}
            {!hasMore && <p className="text-center mt-4">Đã tải hết dữ liệu.</p>}
        </div>
    );
};

export default TransactionHistory;
