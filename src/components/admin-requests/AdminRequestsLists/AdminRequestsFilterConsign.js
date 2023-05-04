import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

// 위탁 카테고리 전용 필터 컴포넌트
const AdminRequestsFilterConsign = ({
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

      {/* 위탁 카테고리 전용 필터 */}
      <ToggleButton value="cancel-request" sx={filterBox}>
        위탁 철회 요청
      </ToggleButton>
      <ToggleButton value="canceling" sx={filterBox}>
        철회 진행 중
      </ToggleButton>
      <ToggleButton value="canceled" sx={filterBox}>
        철회 완료
      </ToggleButton>
      {/* 위탁 카테고리 전용 필터 */}
    </ToggleButtonGroup>
  );
};

export default AdminRequestsFilterConsign;
