import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Divider } from 'antd';

const { Content } = Layout;

const IssuesList = ({ issues }) => (
  <Layout style={{ background: '#fff', padding: '3%' }}>
    <h1 style={{ marginBottom: '0', fontWeight: 200, color: 'rgb(112, 112, 112)' }}>Issues</h1>
    <Divider />
    <Content>
      {issues.map(issue => (
        <h4 key={issue.id}>{issue.title}</h4>
      ))}
    </Content>
  </Layout>
);

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IssuesList;
