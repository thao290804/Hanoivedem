import React, { useEffect, useState } from "react";
import {
    Layout,
    Typography,
    List,
    Card,
    Button,
    Modal,
    Image,
    Spin,
} from "antd";
import "antd/dist/reset.css";
import Navbar from "./Navbar";
import { QRPay, BanksObject } from "vietnam-qr-pay";
import QRCode from "qrcode";
import axios from "axios";

const { Title, Text } = Typography;

const MyTicket = () => {
    // State to hold the tickets and the modal visibility state
    const [tickets, setTickets] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve tickets from localStorage
        const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(savedTickets);

        if (savedTickets.length > 0) {
            const fetchPayments = async () => {
                const payments = {};
                const requests = savedTickets.map(async (ticket) => {
                    const url = `https://script.google.com/macros/s/AKfycbzRFdaaLyjzSk8uSPVg_lTEhkHZi6yWVRFG_J8rBqWzd39qli0XWV2P7DGq8JKTJctg/exec?checkOrder=${ticket.orderId}`;

                    try {
                        const res = await axios.get(url);
                        payments[ticket.orderId] = res.data.paymentStatus ? (
                            <span style={{ color: "blue" }}>Đã thanh toán</span>
                        ) : (
                            <span style={{ color: "red" }}>
                                Chưa thanh toán
                            </span>
                        );
                    } catch (error) {
                        console.error("Error:", error);
                    }
                });

                await Promise.all(requests);
                setPaymentStatus(payments);
                setIsLoading(false); // Stop loading once data is fetched
            };

            fetchPayments();
        } else {
            setIsLoading(false); // No tickets to load
        }
    }, []);

    const handleShowDetails = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedTicket(null);
    };

    const getQrImage = (price, purpose) => {
        const qrPay = QRPay.initVietQR({
            bankBin: BanksObject.mbbank.bin,
            bankNumber: "0373165882", // Số tài khoản
            amount: `${price}`, // Số tiền
            purpose: purpose, // Nội dung chuyển tiền
        });
        const content = qrPay.build();

        console.log(price + "", purpose); // Print the QR content
        var res;
        QRCode.toDataURL(content, (err, url) => {
            res = url;
        });
        return res;
    };

    return (
        <Layout>
            <Navbar />

            <Layout.Content style={{ marginTop: "70px", padding: "30px" }}>
                <Title level={2}>Vé của tôi</Title>
                {isLoading ? (
                    // Display the loading spinner while data is loading
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <Spin size="large" />
                        <p>Đang tải dữ liệu</p>
                    </div>
                ) : tickets.length === 0 ? (
                    <Text>Không có vé nào.</Text>
                ) : (
                    <List
                        grid={{}}
                        dataSource={tickets}
                        renderItem={(ticket) => (
                            <List.Item>
                                <Card
                                    style={{
                                        width: "fit-content",
                                        backgroundColor: "#E5E5D8",
                                    }}
                                    hoverable
                                >
                                    <p>
                                        <b>Địa điểm:</b> {ticket.location}
                                    </p>
                                    <p>
                                        <b>Ngày checkin:</b> {ticket.time}
                                    </p>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            handleShowDetails(ticket)
                                        }
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Card>
                            </List.Item>
                        )}
                    />
                )}
            </Layout.Content>

            <Modal
                style={{ textAlign: "center" }}
                bodyStyle={{ textAlign: "left" }}
                title="Chi tiết vé"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[]}
            >
                {selectedTicket && (
                    <>
                        <p>
                            <b>Địa điểm:</b> {selectedTicket.location}
                        </p>
                        <p>
                            <b>Ngày checkin:</b> {selectedTicket.time}
                        </p>
                        <p>
                            <b>Số vé người lớn:</b>{" "}
                            {selectedTicket.adultTickets}
                        </p>
                        <p>
                            <b>Số vé học sinh(sinh viên):</b>{" "}
                            {selectedTicket.childTickets}
                        </p>
                        <p>
                            <b>Tổng tiền:</b>{" "}
                            {selectedTicket.price.toLocaleString("vi-VN")} đ
                        </p>

                        <p>
                            <b>Mã đơn hàng:</b> {selectedTicket.orderId}
                        </p>
                        <p>
                            <b>Trạng thái:</b>{" "}
                            {paymentStatus[selectedTicket.orderId]}
                        </p>
                        <div style={{ textAlign: "center" }}>
                            <div>Vui lòng quét mã để thanh toán</div>
                            <Image
                                src={getQrImage(
                                    selectedTicket.price,
                                    selectedTicket.orderId
                                )}
                            />
                        </div>
                        <div style={{ color: "gray" }}>
                            * Lưu ý:
                            <br />- Vé chỉ có giá trị sử dụng duy nhất 1 lần
                            <br />- Vé bắt đầu có hiệu lực khi trạng thái chuyển
                            thành <b>Đã thanh toán</b>.
                        </div>
                    </>
                )}
            </Modal>
        </Layout>
    );
};

export default MyTicket;
