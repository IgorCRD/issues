import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import PropTypes from 'prop-types';
import logo from 'assets/images/icon.png';
import 'components/main-page.less';

const { Header, Content, Footer } = Layout;

const MainPage = ({ children }) => (
  <Layout className="main-page">
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item style={{ padding: '0' }}>
          <Avatar className="avatar" size={45} src={logo} />
        </Menu.Item>
        <Menu.Item style={{ fontSize: '20px' }}>
          We have
          {' '}
          <mark className="mark">Issues</mark>
        </Menu.Item>
      </Menu>
    </Header>
    <Content className="content">{children}</Content>
    <Footer>
      <span className="footer-text1">Nilus - Todos os direitos Reservados</span>
      <span className="footer-text2">Powered by - Stalo | Software Studio</span>
    </Footer>
  </Layout>
);

MainPage.propTypes = {
  children: PropTypes.element,
};

MainPage.defaultProps = {
  children: null,
};

export default MainPage;
