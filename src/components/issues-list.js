import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Divider, Table, Input, Button, Modal, notification,
} from 'antd';
import NewIssue from 'components/new-issue';

import 'components/issues-list.less';

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
    retry: PropTypes.func.isRequired,
    error: PropTypes.shape({}),
  };

  static defaultProps = {
    issues: null,
    total: null,
    currentPage: null,
    error: null,
  };

  state = {
    visible: false,
  };

  onChangeHandler = (pagination, filters) => {
    const { current: newPage } = pagination;
    const { currentPage: prevPage, onPageChange, onFilterChange } = this.props;

    notification.close('errorNotification');
    if (newPage !== prevPage) {
      onPageChange(newPage);
    }

    onFilterChange(filters);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  openErrorNotification = (message, onRetry) => {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          onRetry();
          notification.close('errorNotification');
        }}
      >
        Retry
      </Button>
    );
    notification.open({
      message: 'Error',
      description: message,
      duration: 0,
      btn,
      key: 'errorNotification',
    });
  };

  render() {
    const {
      issues, currentPage, total, onTitleSearch, retry, error,
    } = this.props;
    const { visible } = this.state;

    if (error) this.openErrorNotification(error.message, retry);

    return (
      <Layout className="issuesList">
        <h1 className="title">Issues</h1>
        <Divider />
        <div className="flex">
          <Search
            placeholder="Search issues by title"
            onSearch={onTitleSearch}
            className="search"
          />
          <Button className="button" type="primary" onClick={this.showModal}>
            New Issue
          </Button>
        </div>
        <Modal
          title="New issue"
          visible={visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          destroyOnClose
        >
          <NewIssue />
        </Modal>
        <Content>
          <Table
            dataSource={issues}
            loading={!issues && !error}
            columns={columns}
            onChange={this.onChangeHandler}
            pagination={{
              current: currentPage,
              total,
            }}
            rowKey={data => data.id}
          />
        </Content>
      </Layout>
    );
  }
}

export default IssuesList;
