import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

// 판매 카테고리 전용 필터 컴포넌트
const AdminRequestsFilterSell = ({
  currentFilter,
  filterChange,
  filterBox,
}) => {
  return (
    <ToggleButtonGroup
      value={String(currentFilter)}
      exclusive
      onChange={filterChange}
    >
      <ToggleButton value="none" sx={filterBox}>
        전체
      </ToggleButton>
      <ToggleButton value="1st-assessing" sx={filterBox}>
        1차 심사 중
      </ToggleButton>
      <ToggleButton value="waiting-2nd-assess" sx={filterBox}>
        2차 심사 대기
      </ToggleButton>
      <ToggleButton value="2nd-assessing" sx={filterBox}>
        2차 심사 중
      </ToggleButton>
      <ToggleButton value="completed" sx={filterBox}>
        완료
      </ToggleButton>
      <ToggleButton value="failed" sx={filterBox}>
        심사 탈락
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default AdminRequestsFilterSell;
