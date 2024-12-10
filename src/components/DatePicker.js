import React from 'react';
import { DatePicker } from 'antd';

const CheckinDatePicker = ({ onChange }) => {
  return (
    <DatePicker
      placeholder="Chọn ngày check-in"
      style={{ width: 200 }}
      onChange={(date, dateString) => onChange(dateString)}
    />
  );
};

export default CheckinDatePicker;
