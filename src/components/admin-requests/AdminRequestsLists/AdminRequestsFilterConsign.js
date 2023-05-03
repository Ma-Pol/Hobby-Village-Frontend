import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

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
      aria-label="filter"
    >
      <ToggleButton value="none" aria-label="none" sx={filterBox}>
        전체
      </ToggleButton>
      <ToggleButton
        value="1st-assessing"
        aria-label="1st-assessing"
        sx={filterBox}
      >
        1차 심사 중
      </ToggleButton>
      <ToggleButton
        value="waiting-2nd-assess"
        aria-label="waiting-2nd-assess"
        sx={filterBox}
      >
        2차 심사 대기
      </ToggleButton>
      <ToggleButton
        value="2nd-assessing"
        aria-label="2nd-assessing"
        sx={filterBox}
      >
        2차 심사 중
      </ToggleButton>
      <ToggleButton value="completed" aria-label="completed" sx={filterBox}>
        완료
      </ToggleButton>
      <ToggleButton value="failed" aria-label="failed" sx={filterBox}>
        심사 탈락
      </ToggleButton>
      <ToggleButton
        value="cancel-request"
        aria-label="cancel-request"
        sx={filterBox}
      >
        위탁 철회 요청
      </ToggleButton>
      <ToggleButton value="canceling" aria-label="canceling" sx={filterBox}>
        철회 진행 중
      </ToggleButton>
      <ToggleButton value="canceled" aria-label="canceled" sx={filterBox}>
        철회 완료
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default AdminRequestsFilterConsign;
