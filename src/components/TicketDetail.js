import React, { useState } from "react";
import { Button, Image, Card, Row, Col } from "antd";
import ImageGallery from "./ImageGallery";
import loca from "../location.png";

const allImagesContext = require.context(
    "../assets",
    true,
    /\.(png|jpe?g|svg)$/
);

const TicketDetail = ({ location, locationDetails, address, chitiet }) => {
    const [galleryVisible, setGalleryVisible] = useState(false);

    // Chọn bộ ảnh dựa vào địa điểm
    const getLocationImages = () => {
        const images = allImagesContext
            .keys()
            .filter((imagePath) => imagePath.includes(`/${location}/`)) // Filter by location directory
            .map((imagePath) => allImagesContext(imagePath));

        return Object.values(images);
    };


    const getThumbnail = () => {
        const images = allImagesContext
            .keys()
            .filter((imagePath) => imagePath.includes(`/${location}/`)) // Filter by location directory
            .map((imagePath) => allImagesContext(imagePath));
        return images[0];
    };

    return (
        <>
            {location && (
                <Card hoverable style={{ width: "90%" }}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <div>
                                <h1>{locationDetails[location]}</h1>
                                <Image width={"15px"} src={loca} />{" "}
                                <b>Địa chỉ: </b>
                                {address[location]}
                                <div
                                    style={{
                                        maxHeight: "220px", // Giới hạn chiều cao của phần mô tả
                                        overflow: "auto", // Thêm cuộn khi nội dung vượt quá chiều cao
                                    }}
                                >
                                    <i style={{ paddingLeft: "20px" }}>
                                        {chitiet[location]}
                                    </i>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12}>
                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        marginBottom: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Image
                                        src={getThumbnail()}
                                        height={"60%"}
                                        alt="Ảnh đại diện địa điểm"
                                        style={{
                                            borderRadius: "5px",
                                            maxHeight: "300px", // Giới hạn chiều cao của ảnh
                                        }}
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => setGalleryVisible(true)}
                                >
                                    Xem tất cả ảnh
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <ImageGallery
                        images={getLocationImages()}
                        visible={galleryVisible}
                        onClose={() => setGalleryVisible(false)}
                    />
                </Card>
            )}
        </>
    );
};

export default TicketDetail;
