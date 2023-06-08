import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const AdminStatsMonthUser = ({ userData }) => {
  return (
    <div
      style={{
        width: '90%',
        margin: '0 auto 30px auto',
        height: '500px',
      }}
    >
      <ResponsiveBar
        data={userData}
        keys={['가입회원', '탈퇴회원']}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.2}
        maxValue={15}
        groupMode="grouped"
        // layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'accent' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', '1.4']],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: '회원 수',
          legendPosition: 'middle',
          legendOffset: 37,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        enableGridX={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 135,
            translateY: 15,
            itemsSpacing: 5,
            itemWidth: 100,
            itemHeight: 30,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 25,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }
      />
    </div>
  );
};

export default AdminStatsMonthUser;
