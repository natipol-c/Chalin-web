import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Select, MenuItem } from '@mui/material';
import { list } from '../../../functions/user';
import { listOrder } from '../../../functions/order';
import { useSelector } from 'react-redux';
import Chart from '../../../layout/Chart';

const HomepageAdmin = () => {
  const [userCount, setUserCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [selectedOption, setSelectedOption] = useState("ทั้งหมด");

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        if (user && user.user && user.user.token) {
          const res = await list(user.user.token);
          setUserCount(res.data.length);
        } else {
          console.error("Token is missing or invalid");
        }
      } catch (err) {
        console.error('Error fetching user count:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        if (user && user.user && user.user.token) {
          const res = await listOrder(user.user.token);
          const orders = res.data;
          const deliveredOrders = orders.filter(order => order.status === "จัดส่งแล้ว");

          
          const monthlyIncome = {};
          deliveredOrders.forEach(order => {
            const monthIndex = new Date(order.createdAt).getMonth();
            const monthShort = new Date(0, monthIndex).toLocaleString('default', { month: 'short' });

            if (!monthlyIncome[monthShort]) {
              monthlyIncome[monthShort] = 0;
            }
            monthlyIncome[monthShort] += order.totalAmount;
          });

          
          const allMonths = [];
          for (let i = 0; i < 12; i++) {
            const monthShort = new Date(0, i).toLocaleString('default', { month: 'short' });
            allMonths.push(monthShort);
          }

          const formattedData = allMonths.map(month => ({
            month,
            totalAmount: monthlyIncome[month] || 0
          }));

          setMonthlyData(formattedData);

          
          const productSales = {};
          deliveredOrders.forEach(order => {
            order.items.forEach(item => {
              const productName = item.name; 
              const productImage = item.image; 
              const productDetail = item.detail;

              if (!productSales[productName]) {
                productSales[productName] = {
                  name: productName,
                  detail: productDetail,
                  image: productImage,
                  quantity: 0,
                  totalSales: 0
                };
              }
              productSales[productName].quantity += item.quantity; 
              productSales[productName].totalSales += item.price * item.quantity;
            });
          });

          const sortedProducts = Object.values(productSales).sort((a, b) => b.totalSales - a.totalSales);
          setBestSellingProducts(sortedProducts.slice(0, 5));

          if (selectedOption === "ทั้งหมด") {
            const total = deliveredOrders.reduce((acc, order) => acc + order.totalAmount, 0);
            setTotalAmount(total);
          } else if (selectedOption === "วันนี้") {
            const today = new Date().toISOString().split('T')[0];
            const totalToday = deliveredOrders.reduce((acc, order) => {
              const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
              return orderDate === today ? acc + order.totalAmount : acc;
            }, 0);
            setTotalAmount(totalToday);
          } else if (selectedOption === "เดือนนี้") {
            const currentMonth = new Date().getMonth();
            const totalThisMonth = deliveredOrders.reduce((acc, order) => {
              const orderMonth = new Date(order.createdAt).getMonth();
              return orderMonth === currentMonth ? acc + order.totalAmount : acc;
            }, 0);
            setTotalAmount(totalThisMonth);
          }
        } else {
          console.error("Token is missing or invalid");
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchUserCount();
    fetchOrders();
  }, [user, selectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box p={3} style={{ fontFamily: 'Kanit, sans-serif' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <h2 style={{ color: 'Black' }}><strong>รายงาน</strong></h2>
      </Box>

      <Box display="flex" gap={2} alignItems="stretch">
        <Box display="flex" flexDirection="column" gap={2} width="70%">
          <Paper elevation={2} style={{ padding: '35px', backgroundColor: '#fff', flexGrow: 1, borderRadius: '10px', position: 'relative', height: '300px', overflow: 'hidden' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography style={{ marginBottom: '20px', fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}>
                <strong>ภาพรวม</strong>
              </Typography>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                style={{ marginLeft: '20px', width: '100px', height: '40px', backgroundColor: '#EBEBEB', fontFamily: 'Kanit, sans-serif', color: 'rgba(44, 44, 44, 0.7)' }}
              >
                <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                <MenuItem value="เดือนนี้">เดือนนี้</MenuItem>
                <MenuItem value="วันนี้">วันนี้</MenuItem>
              </Select>
            </Box><br />

            <Box display="flex" gap={2} mb={2}>
              <Paper elevation={2} style={{ padding: '15px', backgroundColor: '#EBEBEB', flexGrow: 1, borderRadius: '15px', display: 'flex', justifyContent: 'space-between', width: '100px' }}>
                <Paper elevation={2} style={{ padding: '10px', backgroundColor: '#fff', flexGrow: 0, borderRadius: '15px', width: '250px', textAlign: 'left' }}>
                  <h6 style={{ margin: '0 10px', color: 'rgba(44, 44, 44, 0.7)' }}>ลูกค้า<br /></h6>
                  <h1 style={{ margin: '0 15px' }}>{userCount}</h1>
                </Paper>

                <Paper elevation={2} style={{ padding: '10px', backgroundColor: '#EBEBEB', flexGrow: 0, borderRadius: '15px', width: '300px', textAlign: 'left', boxShadow: 'none' }}>
                  <h6 style={{ margin: '0 20px', color: 'rgba(44, 44, 44, 0.7)' }}>รายได้<br /></h6>
                  <h1 style={{ margin: '0 25px' }}>{totalAmount}</h1>
                </Paper>
              </Paper>
            </Box>
          </Paper>

          <Paper elevation={2} style={{ padding: '20px', backgroundColor: '#fff', flexGrow: 1, borderRadius: '10px', height: '400px', overflow: 'hidden' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography style={{ marginBottom: '20px', fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}>
                <strong>รายได้รวมต่อเดือน</strong>
              </Typography>
            </Box>
            <br />
            <Box display="flex" alignItems="left" justifyContent="space-between">
              <Chart data={monthlyData} />
            </Box>
          </Paper>
        </Box>

        <Paper elevation={2} style={{ padding: '50px', backgroundColor: '#fff', width: '50%', height: '800px', borderRadius: '10px', overflow: 'hidden' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography style={{ fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}><strong>สินค้าที่ขายดีที่สุด</strong></Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            {bestSellingProducts.length > 0 ? bestSellingProducts.map((product, index) => (
              <Paper key={index} elevation={5} style={{ padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} style={{ width: '120px', height: '120px', marginRight: '15px', backgroundColor: '#EBEBEB',objectFit: 'contain' }} /> {/* เพิ่มขนาดเป็น 80px */}
                <Box>
                  <Typography variant="h6" style={{ fontFamily: 'Kanit, sans-serif' }}>{product.name}</Typography>
                  <Typography variant="body2" style={{ fontFamily: 'Kanit, sans-serif' }}>{product.detail}</Typography>
                  <Typography variant="body2" style={{ fontFamily: 'Kanit, sans-serif' }}>ยอดขายรวม: {product.totalSales} บาท</Typography>
                </Box>
              </Paper>

            )) : (
              <Typography variant="body2">ไม่มีข้อมูลสินค้าที่ขายดีที่สุด</Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomepageAdmin;
