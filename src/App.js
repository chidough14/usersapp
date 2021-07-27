/* import logo from './logo.svg';
import './App.css'; */
import { Table, Space, Button, Modal, Input } from 'antd'
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';




function App() {
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editIsModalVisible, setEditIsModalVisible] = useState(false)
  const [user, setUser] = useState({
    id: "",
    name: ""
  })
  const [editData, setEditData] = useState({
    id: "",
    name: ""
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <p>{text}</p>,
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={()=> showEditModal(text, record)}>Edit</Button>
          <Button type="default" onClick={()=> deleteRecord(text, record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const showEditModal = (text, record) => {
    setIsModalVisible(true)
    setEditIsModalVisible(true)
    setEditData({id: record.id, name: record.name})
  }

  const deleteRecord = (text, record) => {
    setData(data.filter(item => item.id !== record.id))
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  

  const handleOk = () => {
    setData([...data, user])
    setIsModalVisible(false)
    setUser({name: ""})
  }

  const handleEdit = (id) => {
    setEditIsModalVisible(false)
    setIsModalVisible(false)
    console.log(editData)

    setData(
        data.map(item => 
            item.id === id
            ? {...item, name : editData.name} 
            : item 
    ))
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditIsModalVisible(false)
    setUser({name: ""})
  }

  return (
    <div >
      <div style={{ margin: "auto", width: "800px"}}>
        <Button type="primary" style={{marginBottom: "20px"}} onClick={showModal}>Add User</Button>
        <Table columns={columns} dataSource={data} />
      </div>

      <Modal 
        title={editIsModalVisible ? "Edit User" : "Add User"} visible={isModalVisible} 
        onOk={editIsModalVisible ? ()=>handleEdit(editData.id) : handleOk} 
        onCancel={handleCancel}
        okButtonProps={user.name === "" && !editIsModalVisible ? {disabled: true} : {disabled: false}}
      >
        <Input 
          onChange={editIsModalVisible ? (e)=> setEditData({id: editData.id, name: e.target.value}) : (e)=> setUser({id: uuidv1(), name: e.target.value})} 
          value={editIsModalVisible ? editData.name : user.name} 
        />
      </Modal>
    </div>
  );
}

export default App;
