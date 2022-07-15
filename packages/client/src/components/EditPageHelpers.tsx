import { Col, Row } from 'antd';
import React from 'react';
// import { sentenceCase } from 'change-case';

export const withTitle = (propertyName: string, nullable = false, component: React.ReactChild): React.ReactChild => (
	<div>
		<Row>
			<Col span={12}>
				<div style={{ display: 'flex' }}>
					<h2>{propertyName}</h2>
					{!nullable && <span style={{ float: 'right', color: 'red' }}>*</span>}
				</div>
			</Col>
		</Row>

		{component}
	</div>
);

export const WithCol: React.FC<{
	sm?: number;
	xs?: number;
	children: any;
	background?: string;
}> = ({ sm = 12, xs = 24, children, background }) => (
	<Col sm={sm} xs={xs} style={{ background }}>
		{children}
	</Col>
);
