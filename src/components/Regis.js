import React, { useState, useEffect } from "react";
import { Card, Button, Row, Modal, Input } from "antd";
import { ButtonAmt } from "./ButtonAmt";
import CheckinDatePicker from "./DatePicker";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({
    location,
    checkinDate,
    locationDetails,
    setCheckinDate,
    codedh,
}) => {
    const [cnt1, setCnt1] = useState(0);
    const [cnt2, setCnt2] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy Họ tên và Số điện thoại từ localStorage khi component được tải
        const storedName = localStorage.getItem("name") || "";
        const storedPhone = localStorage.getItem("phone") || "";
        setName(storedName);
        setPhone(storedPhone);
    }, []);

    const openNotification = (msg) => {
        notification.open({
            message: "Thông báo",
            description: msg,
            duration: 3,
        });
    };

    const showNotification = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        console.log("Đã xác nhận");

        const newTicket = {
            location: locationDetails[location],
            time: checkinDate,
            adultTickets: cnt1,
            childTickets: cnt2,
            price: cnt1 * 160000 + cnt2 * 80000,
            orderId: codedh,
            name: name, // Thêm Họ tên vào tham số
            phone: phone, // Thêm Số điện thoại vào tham số
        };

        const url =
            "https://script.google.com/macros/s/AKfycbzRFdaaLyjzSk8uSPVg_lTEhkHZi6yWVRFG_J8rBqWzd39qli0XWV2P7DGq8JKTJctg/exec";

        const params = new URLSearchParams(newTicket);
        const fullUrl = `${url}?${params.toString()}`;

        setIsModalVisible(false);
        try {
            const res = await axios.get(fullUrl);
            console.log(res);
        } catch (error) {
            console.error("Error:", error);
        }

        let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
        tickets.push(newTicket);
        localStorage.setItem("tickets", JSON.stringify(tickets));

        navigate("/Hanoivedem/my-tickets");
    };

    const handleCancel = () => {
        console.log("Đã hủy");
        setIsModalVisible(false);
    };

    const checkingData = () => {
        if (!checkinDate) {
            openNotification("Vui lòng chọn ngày checkin!");
        } else if (!name) {
            openNotification("Vui lòng nhập tên!");
        } else if (!phone) {
            openNotification("Vui lòng nhập số điện thoại!");
        } else if (cnt1 + cnt2 === 0) {
            openNotification("Vui lòng chọn loại vé!");
        } else {
            showNotification();
        }
    };

    return (
        <>
            {location && (
                <Card hoverable style={{ width: "90%", marginTop: "15px" }}>
                    <h1>TÙY CHỌN GÓI DỊCH VỤ</h1>
                    <b>
                        Chọn gói dịch vụ cho {locationDetails[location]} (trẻ em
                        dưới 5 tuổi được miễn phí vé)
                    </b>
                    <div style={{ marginBottom: "20px" }}>
                        <CheckinDatePicker
                            onChange={(date) => setCheckinDate(date)}
                        />
                    </div>
                    <div style={{ marginBottom: "20px", maxWidth: "250px" }}>
                        <Input
                            style={{ textTransform: "uppercase" }}
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value.toUpperCase())
                            }
                        />
                        <Input
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ marginTop: "10px" }}
                        />
                    </div>
                    <Row gutter={16} style={{ marginTop: "16px" }}>
                        <ButtonAmt
                            ct={"Vé người lớn"}
                            price={["200.000", "160.000"]}
                            setCnt={setCnt1}
                        />
                        <ButtonAmt
                            ct={
                                "Vé học sinh, sinh viên (giảm 50% vé người lớn)"
                            }
                            price={["160.000", "80.000"]}
                            setCnt={setCnt2}
                        />
                    </Row>
                    <div style={{ textAlign: "right" }}>
                        <span>Tổng tiền: </span>
                        <b style={{ color: "red" }}>
                            {(cnt1 * 160000 + cnt2 * 80000).toLocaleString(
                                "vi-VN"
                            )}{" "}
                            đ
                        </b>
                        <br />
                        <div>
                            <Button
                                style={{ marginTop: "10px" }}
                                danger
                                type="primary"
                                onClick={checkingData}
                            >
                                Đặt ngay
                            </Button>
                        </div>
                    </div>
                    <Modal
                        title="XÁC NHẬN ĐƠN HÀNG"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="Xác nhận"
                        cancelText="Thoát"
                        style={{ textAlign: "center" }}
                        bodyStyle={{ textAlign: "left" }}
                    >
                        <b>Địa điểm: </b>
                        {locationDetails[location]}
                        <br />
                        <b>Ngày checkin: </b> {checkinDate}
                        <br />
                        <b>Số vé người lớn: </b> {cnt1}
                        <br />
                        <b>Số vé học sinh(sinh viên): </b> {cnt2}
                        <br />
                        <b>Tổng tiền: </b>{" "}
                        {(cnt1 * 160000 + cnt2 * 80000).toLocaleString("vi-VN")}{" "}
                        đ
                        <br />
                        <b>Mã đơn hàng: </b>
                        {codedh}
                        <br />
                        <b>Họ tên: </b> {name}
                        <br />
                        <b>Số điện thoại: </b> {phone}
                    </Modal>
                </Card>
            )}
        </>
    );
};

export default Register;
