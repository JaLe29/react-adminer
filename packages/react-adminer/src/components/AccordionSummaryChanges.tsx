import { Collapse, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import type { TableConfig } from 'types/types';
import { getColumnTitle, getFieldByName } from '../utils/config';

interface Props {
	changedKeys: string[];
	original: any;
	updated: any;
	changesCounter: number;
	config: TableConfig;
}
const { Panel } = Collapse;

const AccordionSummaryChanges: React.FC<Props> = ({ changedKeys, original, updated, changesCounter, config }) => {
	const getTableDataSummaryOfChanges = (): { field: string; original: string; changed: string }[] =>
		changedKeys?.map((key: string) => ({
			field: getColumnTitle(getFieldByName(config, key)),
			original: original[key],
			changed: updated[key],
		}));
	return (
		<Collapse accordion>
			<Panel header={`Number of changes: ${changesCounter}`} key="1">
				<Table dataSource={getTableDataSummaryOfChanges()} pagination={false}>
					<Column title="Field" dataIndex="field" />
					<Column title="Original" dataIndex="original" />
					<Column title="Changed on" dataIndex="changed" />
				</Table>
			</Panel>
		</Collapse>
	);
};

export default AccordionSummaryChanges;
