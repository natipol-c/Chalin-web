import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, Paper, Badge, InputBase,
  IconButton, MenuItem, Select, Drawer,
  Typography, Divider, Radio, RadioGroup, FormControlLabel,
  Card, Grid, Avatar, Dialog, DialogContent
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useSelector } from 'react-redux';
import { listOrder, changeStatus } from '../../../functions/order';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';


const AcceptOrder = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadData(user.user.token);
  }, [user.user.token]);

  const loadData = async (authToken) => {
    await listOrder(authToken)
      .then((res) => {
        const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
        setFilteredData(sortedData);
      })
      .catch(err => console.log(err));
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(data);
      return;
    }

    const searchValue = value.toString();

    const filtered = data.filter(order => {
      return order.orderId.toString().startsWith(searchValue);
    });

    setFilteredData(filtered);
  };


  const statusOptions = ['รอยืนยัน', 'จัดเตรียมออเดอร์', 'กำลังจัดส่ง', 'จัดส่งแล้ว', 'ยกเลิก'];

  const handleChangeStatus = async (id, e) => {
    const newStatus = e.target.value;
    const updateData = {
      id: id,
      status: newStatus,
    };
    await changeStatus(user.user.token, updateData)
      .then((res) => {
        loadData(user.user.token);
      })
      .catch(err => console.log(err));
  }

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFilter = (status) => {
    if (status === 'ทั้งหมด') {
      setFilteredData(data);
    } else if (Array.isArray(status)) {
      const filtered = data.filter(order => status.includes(order.status));
      setFilteredData(filtered);
    } else {
      const filtered = data.filter(order => order.status === status);
      setFilteredData(filtered);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <style>
            @media print {
              @page {
                size: 57mm 60mm;
                margin: 0;
              }
              body {
                font-family: 'Kanit, sans-serif';
                padding: 10mm;
                font-size: 10px;
              }
              h2 {
                text-align: center; 
                font-size: 12px; 
                margin: 5px 0; 
              }
              p {
                margin: 0;
              }
              .divider {
                width: 100%;
                border-top: 1px solid black;
                margin: 5px 0;
              }
              ul {
                padding-left: 0; 
                list-style: none; 
              }
              li {
                font-size: 10px; 
              }
            }
          </style>
        </head>
        <body>
          <div class="divider"></div>
          <h2>ออเดอร์ ${selectedOrder.orderId}</h2>
          <div class="divider"></div>

          <p>คุณ: ${selectedOrder.email}</p>
          
          <ul>
            ${selectedOrder.items.map(item => `
              <li>${item.name} - ${item.quantity} x ${item.price} บาท</li>
            `).join('')}
          </ul>
          <div class="divider"></div>
          <p>ยอดรวม: ${selectedOrder.totalAmount} บาท</p>
          <p>${selectedOrder.delivery}:     ${selectedOrder.address}</p>
          <div class="divider"></div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const getStatusCount = (status) => {
    return data.filter(order => order.status === status).length;
  };
  const totalOrders = data.length;
  const waitCount = getStatusCount('รอยืนยัน');
  const indeliveryCount = getStatusCount('กำลังจัดส่ง');
  const preparingCount = getStatusCount('จัดเตรียมออเดอร์');
  const deliveredCount = getStatusCount('จัดส่งแล้ว');
  const cancelledCount = getStatusCount('ยกเลิก');


  return (
    <Box p={3}>
      {/* หัวข้อ Orders */}
      <Box display="flex" alignItems="center" mb={2}>
        <h2 style={{ fontFamily: 'Kanit, sans-serif', color: 'Black' }}><strong>รายการออเดอร์</strong></h2>
      </Box>


      <Paper elevation={2} style={{ padding: '40px', backgroundColor: '#fff', marginBottom: '20px' }}>
        <Box display="flex" gap={2} mb={2}>

          <Button
            variant="contained"
            onClick={() => handleFilter('ทั้งหมด')}
            style={{
              fontFamily: 'Kanit, sans-serif',
              borderRadius: '8px',
              padding: '10px 20px',
              backgroundColor: '#CD1818',

            }}
          >
            คำสั่งซื้อทั้งหมด
            <Badge badgeContent={totalOrders} color="success" style={{ marginLeft: '20px' }} />
          </Button>

          <Button
            variant="contained"
            onClick={() => handleFilter(['รอยืนยัน', 'จัดเตรียมออเดอร์', 'กำลังจัดส่ง'])}
            style={{
              fontFamily: 'Kanit, sans-serif',
              borderRadius: '8px',
              padding: '10px 20px',
              backgroundColor: '#CD1818',
            }}
          >
            กำลังดำเนินการ
            <Badge badgeContent={waitCount + indeliveryCount + preparingCount} color="success" style={{ marginLeft: '20px' }} />
          </Button>

          <Button
            variant="contained"
            onClick={() => handleFilter('จัดส่งแล้ว')}
            style={{
              fontFamily: 'Kanit, sans-serif',
              borderRadius: '8px',
              padding: '10px 20px',
              backgroundColor: '#CD1818',
            }}
          >
            จัดส่งเรียบร้อย
            <Badge badgeContent={deliveredCount} color="success" style={{ marginLeft: '20px' }} />
          </Button>

          <Button
            variant="contained"
            onClick={() => handleFilter('ยกเลิก')}
            style={{
              fontFamily: 'Kanit, sans-serif',
              borderRadius: '8px',
              padding: '10px 20px',
              backgroundColor: '#CD1818',
            }}
          >
            ยกเลิกคำสั่งซื้อ
            <Badge badgeContent={cancelledCount} color="success" style={{ marginLeft: '20px' }} />
          </Button>

        </Box>


        <Box display="flex" alignItems="center" mb={2} style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '5px 10px' }}>
          <InputBase
            placeholder="ค้นหารหัสคำสั่งซื้อ"
            value={searchTerm}
            onChange={handleSearch}
            style={{ flex: 1, padding: '10px', fontFamily: 'Kanit, sans-serif' }}
          />
          <IconButton color="primary" style={{ padding: '10px' }}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>รหัสคำสั่งซื้อ</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ลูกค้า</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>วัน / เวลา</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>สถานะการสั่งซื้อ</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>วิธีการจัดส่ง</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ที่อยู่จัดส่ง</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>สินค้า</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ราคา</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((order) => (
                <TableRow key={order._id} onClick={() => handleRowClick(order)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      order.status === 'จัดเตรียมออเดอร์' ? '#f9fbe7' :
                        order.status === 'รอยืนยัน' ? '#e0f2f1' :
                          order.status === 'กำลังจัดส่ง' ? '#ffecb3' :
                            order.status === 'จัดส่งแล้ว' ? '#dcedc8' :
                              order.status === 'ยกเลิก' ? '#fde0dc' : 'transparent'

                  }}>

                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleChangeStatus(order._id, e)}
                      defaultValue={order.status} style={{ width: '180px' }}
                    >
                      {statusOptions.map((status, index) => (
                        <MenuItem key={index} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map(item => (
                        <div key={item._id}>
                          <strong>{item.name}</strong> - {item.detail} ({item.quantity} x {item.price} บาท)
                        </div>
                      ))
                    ) : (
                      <div>ไม่มีรายการสินค้า</div>
                    )}
                  </TableCell>
                  <TableCell>{order.totalAmount} บาท</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">ไม่มีข้อมูล</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box p={3} width="800px" role="presentation" sx={{ fontFamily: 'Kanit, sans-serif' }}>
          {selectedOrder && (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius={2}
                sx={{
                  backgroundColor: "#CD1818",
                  padding: 2,
                  width: '100%',
                  maxWidth: 800,
                  height:'100%',
                  maxHeight: 70,
                  margin: 'auto',
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: 'Kanit, sans-serif',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  ออเดอร์ {selectedOrder.orderId}
                </Typography>
              </Box>

              <br />
              {/* รายละเอียดสินค้า */}
              <Box mb={3}>
                <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                    <strong style={{ color: '#CD1818' }}>รายละเอียดสินค้า</strong>
                  </Typography>

                  <div id="printable-content" style={{ display: 'none' }}>

                    <Typography variant="h4">ใบเสร็จ</Typography>
                    <Typography variant="h6">รหัสคำสั่งซื้อ: {selectedOrder.orderId}</Typography>
                    <Typography variant="h6">ลูกค้า: {selectedOrder.email}</Typography>
                    <Typography variant="h6">วันที่: {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
                    <Typography variant="h6">ยอดรวม: {selectedOrder.totalAmount} บาท</Typography>

                  </div>


                  <IconButton onClick={handlePrint} variant="contained" color="black" sx={{ mb: 2, fontSize: '40px' }}>
                    <LocalPrintshopOutlinedIcon fontSize="inherit" />
                  </IconButton>

                </Box>

                {selectedOrder.items?.map((item, idx) => (
                  <Box key={idx} mb={2}>
                    <Card elevation={10}>
                      <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
                        <Box sx={{ width: '150px', height: '150px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {item.image ? (
                            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#EBEBEB' }} />
                          ) : (
                            <Typography variant="caption" color="textSecondary">ไม่มีภาพ</Typography>
                          )}
                        </Box>

                        <Box>
                          <Typography display="flex" alignItems="center">
                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>ชื่อสินค้า</span>
                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.name}</strong></span>
                          </Typography>

                          <Typography display="flex" alignItems="center">
                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>ประเภทสินค้า</span>
                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.detail}</strong></span>
                          </Typography>

                          <Typography display="flex" alignItems="center">
                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>จำนวน</span>
                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.quantity}</strong></span>
                          </Typography>

                          <Typography display="flex" alignItems="center">
                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>ราคา</span>
                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.price}</strong></span>
                          </Typography>

                          <Typography display="flex" alignItems="center">
                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>วัน / เวลา</span>
                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{new Date(selectedOrder.createdAt).toLocaleString()}</strong></span>
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Box>

              {/* รายละเอียดลูกค้า */}
              <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />

              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                  <strong style={{ color: '#CD1818' }}>รายละเอียดลูกค้า</strong>
                </Typography>

                <Card elevation={10} sx={{ width: '100%', padding: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    {/* User Profile Section */}
                    <Grid item xs={3} md={2}>
                      <Avatar src="/assets/user01.png" sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs={9} md={10}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Typography display="flex" alignItems="center">
                            <span style={{ width: '100px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>อีเมล์</span>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 6, color: '#CD1818' }}>
                            {selectedOrder.displayName || selectedOrder.email || 'ไม่มีข้อมูล'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Box>


              {/* รายละเอียดการจัดส่ง */}
              <br />
              <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                  <strong style={{ color: '#CD1818' }}>รายละเอียดการจัดส่ง</strong>
                </Typography>

                <Card elevation={10} sx={{ width: '100%', padding: 2, fontFamily: 'Kanit, sans-serif' }}>
                  <RadioGroup defaultValue={selectedOrder.delivery} sx={{ mb: 1 }}>
                    <FormControlLabel
                      value="รับหน้าร้าน"
                      control={<Radio checked={selectedOrder.delivery === 'รับหน้าร้าน'} />}
                      label={<Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>รับหน้าร้าน</Typography>}
                    />
                    <FormControlLabel
                      value="จัดส่ง"
                      control={<Radio checked={selectedOrder.delivery === 'จัดส่ง'} />}
                      label={<Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>จัดส่ง</Typography>}
                    />
                  </RadioGroup>
                  {selectedOrder.delivery === 'จัดส่ง' && (
                    <Box sx={{ p: 2, backgroundColor: '#FFECEC', borderRadius: '8px' }}>
                      <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>
                        <strong>ที่อยู่:</strong> {selectedOrder.address}
                      </Typography>
                    </Box>
                  )}
                </Card>
              </Box>
              <br />

              <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />

              <Box>

                <Typography display="flex" alignItems="center">
                  <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '25px' }}>ยอดรวม</span>
                  <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif', fontSize: '30px', marginLeft: '140px' }}>
                    <strong>{selectedOrder.totalAmount}</strong>
                  </span>
                  <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '20px', marginLeft: '50px' }}>บาท</span>
                </Typography>

                <Typography display="flex" alignItems="center">
                  <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}>การชำระเงิน</span>
                  <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif', fontSize: '20px', marginLeft: '140px' }}>
                    <strong>{selectedOrder.payment}</strong>
                  </span>
                </Typography>

                <br />



                {/* ตรวจสอบว่าถ้าเลือกวิธีชำระเงินเป็น QR พร้อมเพย์ ให้แสดงรูปสลิป */}
                {selectedOrder.payment === 'QR พร้อมเพย์' && selectedOrder.slipFile && (
                  <Box mt={2} display="flex" justifyContent="left">
                    <Typography variant="subtitle1" sx={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}>
                      สลิปการชำระเงิน
                    </Typography>
                    <img
                      src={`http://localhost:5000/uploads/slips/${selectedOrder.slipFile}`}
                      alt="สลิปการชำระเงิน"
                      style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', cursor: 'pointer', marginLeft: '60px' }}
                      onClick={handleOpenDialog} // เปิด Dialog เมื่อคลิกที่ภาพ
                    />
                  </Box>
                )}

              </Box>

              {/* Dialog สำหรับแสดงภาพขนาดใหญ่ */}
              <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                <DialogContent style={{ padding: 0 }}>
                  <img
                    src={`http://localhost:5000/uploads/slips/${selectedOrder?.slipFile}`}
                    alt="สลิปการชำระเงิน"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </DialogContent>
              </Dialog>
              <br />

            </>
          )}

        </Box>
      </Drawer >
    </Box >
  );
};

export default AcceptOrder;
