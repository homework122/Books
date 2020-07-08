// 小程序导航
import React, { Component } from 'react';
import './css/AppNav.css'
import { Table } from 'antd';
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Haha',
      dataIndex: 'haha',
    },
  ];
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
      haha:i
    });
  }
class AppSet extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div></div>
                <div>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />,
                </div>
            </div>
         );
    }
}
 
export default AppSet;