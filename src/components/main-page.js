import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import PropTypes from 'prop-types';
import logo from 'assets/images/icon.png';

const { Header, Content, Footer } = Layout;

const MainPage = ({ children }) => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item style={{ padding: '0' }}>
          <Avatar
            size={45}
            style={{ backgroundColor: 'rgb(97, 67, 190)', padding: '5px' }}
            src={logo}
          />
        </Menu.Item>
        <Menu.Item style={{ fontSize: '20px' }}>
          We have
          {' '}
          <mark style={{ padding: '0', backgroundColor: 'rgb(97, 67, 190)', color: 'white' }}>
            Issues
          </mark>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>{children}</Content>
    <Footer>
      <span style={{ float: 'left', textAlign: 'center', width: '100%' }}>
        Nilus - Todos os direitos Reservados
      </span>
      <span
        style={{
          float: 'right',
          width: '34%',
          textAlign: 'right',
          position: 'absolute',
          transform: 'translateX(-100%)',
        }}
      >
        Powered by - Stalo | Software Studio
      </span>
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
