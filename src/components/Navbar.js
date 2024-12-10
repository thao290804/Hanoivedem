import React from "react";
import { Layout, Menu, Avatar, Dropdown, Button, Typography } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Sử dụng cho điều hướng
import "../app.css";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
    const navigate = useNavigate();

    // Menu cho dropdown ngôn ngữ
    const languageMenu = (
        <Menu>
            <Menu.Item key="vi">🇻🇳 Tiếng Việt</Menu.Item>
            <Menu.Item key="en">🇬🇧 English</Menu.Item>
        </Menu>
    );

    // Menu cho dropdown của 3 gạch ngang
    const menuItems = (
        <Menu>
            <Menu.Item
                key="my-tickets"
                onClick={() => navigate("/Hanoivedem/my-tickets")} // Đường dẫn đến phần "Vé của tôi"
            >
                Vé của tôi
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            className="sticky-navbar"
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#001529",
                padding: "0 20px",
            }}
        >
            <Title
                level={4}
                style={{
                    margin: 0,
                    flex: 1,
                    color: "#fff",
                    textAlign: "center",
                }}
                onClick={() => navigate("/Hanoivedem")}
            >
                Hà Nội Về Đêm
            </Title>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                <Dropdown overlay={languageMenu} placement="bottomRight">
                    <Button
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#fff",
                        }}
                    >
                        🇻🇳
                    </Button>
                </Dropdown>

                <Dropdown overlay={menuItems} placement="bottomRight">
                    <Button
                        icon={<MenuOutlined />}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#fff",
                        }}
                    />
                </Dropdown>
            </div>
        </Header>
    );
};

export default Navbar;
