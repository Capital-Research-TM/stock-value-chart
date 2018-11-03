import React from 'react';
import {
  LineChart, Line, ResponsiveContainer, YAxis, XAxis, ReferenceLine, Tooltip,
} from 'recharts';
import CustomToolTip from './CustomToolTip';
import styles from '../styles/GraphConstructor.css';

const GraphConstructor = (props) => {
  const {
    data, handleChartHover, handleChartLeave,
  } = props;
  const openingPrice = data[0].price;
  const currentMarketPrice = data[data.length - 1].price;
  const color = (currentMarketPrice >= openingPrice) ? '#30CD9A' : '#F1563A';
  return (
    <ResponsiveContainer className={styles.chart} width="100%" height="100%">
      <LineChart
        onMouseMove={e => handleChartHover(e)}
        onMouseLeave={() => handleChartLeave()}
        className="chart"
        width={document.getElementById('App').clientWidth}
        height={document.getElementById('App').clientHeight * 6 / 10}
      >
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide />
        <XAxis dataKey="id" type="number" domain={[0, 78]} hide />
        <Tooltip content={<CustomToolTip />} />
        <ReferenceLine y={openingPrice} stroke="black" strokeDasharray="1 8" />
        <Line
          type="monotone"
          dataKey="price"
          data={data}
          strokeWidth={3}
          stroke={color}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphConstructor;
