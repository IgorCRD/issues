import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Divider, Table, Input,
} from 'antd';

const { Search } = Input;
const { Content } = Layout;

function dateFormater(date) {
  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return <span>{date && new Date(date).toLocaleString(navigator.language, dateOptions)}</span>;
}

const columns = [
  {
    title: 'Issue Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: dateFormater,
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: dateFormater,
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    filters: [{ text: 'open', value: 'open' }, { text: 'closed', value: 'closed' }],
  },
];

class IssuesList extends React.Component {
  static propTypes = {
    issues: PropTypes.arrayOf(PropTypes.object),
    total: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
    onTitleSearch: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    issues: null,
    total: null,
    currentPage: null,
  };

  onChangeHandler = (pagination, filters) => {
    const { current: newPage } = pagination;
    const { currentPage: prevPage, onPageChange, onFilterChange } = this.props;

    if (newPage !== prevPage) {
      onPageChange(newPage);
      return;
    }

    onFilterChange(filters);
  };

  render() {
    const {
      issues, currentPage, total, onTitleSearch,
    } = this.props;

    return (
      <Layout style={{ background: '#fff', padding: '3%' }}>
        <h1 style={{ marginBottom: '0', fontWeight: 200, color: 'rgb(112, 112, 112)' }}>Issues</h1>
        <Divider />
        <Search
          placeholder="Search issues by title"
          onSearch={onTitleSearch}
          style={{
            width: '50%',
            height: '3em',
            marginTop: '1em',
            marginBottom: '3em',
          }}
        />
        <Content>
          <Table
            dataSource={issues}
            loading={!issues}
            columns={columns}
            onChange={this.onChangeHandler}
            pagination={{
              current: currentPage,
              total,
            }}
          />
        </Content>
      </Layout>
    );
  }
}

export default IssuesList;
