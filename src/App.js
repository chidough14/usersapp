/* import logo from './logo.svg';
import './App.css'; */
import { Table, Space, Button, Modal, Input } from 'antd'
import { useState } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button type="default">Delete</Button>
      </Space>
    ),
  },
];


function App() {
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [user, setUser] = useState({
    name: ""
  })

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setData([...data, user])
    setIsModalVisible(false)
    setUser({name: ""})
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setUser({name: ""})
  }

  return (
    <div >
      <div style={{ margin: "auto", width: "800px"}}>
        <Button type="primary" style={{marginBottom: "20px"}} onClick={showModal}>Add User</Button>
        <Table columns={columns} dataSource={data} />
      </div>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={(e)=> setUser({name: e.target.value})} value={user.name} />
      </Modal>
    </div>
  );
}

export default App;
