import { Pagination as AntdPagination, Spin } from 'antd';
import React from 'react';

interface Props {
	pageSize: number;
	page: number;
	loading: boolean;
	totalItems?: number;
	onChange: (page: number, pageSize: number) => void;
}

const Pagination: React.FC<Props> = ({ page, pageSize, loading, totalItems, onChange }) => {
	if (loading) {
		return <Spin />;
	}

	const currentPage = page + 1;
	return (
		<AntdPagination
			showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
			pageSize={pageSize}
			current={currentPage}
			total={totalItems ?? 0}
			onChange={(p, ps) => {
				onChange(p - 1, ps);
			}}
			showSizeChanger
		/>
	);
};

export default Pagination;
