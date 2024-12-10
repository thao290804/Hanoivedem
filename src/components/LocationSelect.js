import React from "react";
import { Select } from "antd";

const { Option } = Select;

const LocationSelect = ({ onChange, locationDetails }) => {
    return (
        <>
            <h1>Chọn địa điểm muốn du lịch</h1>
            <Select
                placeholder="Chọn địa điểm"
                style={{ width: 200 }}
                onChange={onChange}
            >
                {Object.entries(locationDetails).map(([key, label]) => (
                    <Option key={key} value={key}>
                        {label}
                    </Option>
                ))}
            </Select>
        </>
    );
};

export default LocationSelect;
