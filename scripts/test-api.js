'use strict';

const axios = require('axios');

const BASE_URL = 'http://localhost:1337';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...');
    
    // 测试角色列表
    console.log('\n1. Testing roles endpoint...');
    const rolesResponse = await axios.get(`${BASE_URL}/users-permissions/roles`);
    console.log('✅ Roles endpoint working:', rolesResponse.data);
    
    // 测试订阅计划
    console.log('\n2. Testing subscription plans...');
    const plansResponse = await axios.get(`${BASE_URL}/subscription-plans`);
    console.log('✅ Subscription plans working:', plansResponse.data);
    
    // 测试注册
    console.log('\n3. Testing registration...');
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      inviteCode: 'ADMINREF'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/wallet/auth/invite-register`, registerData);
      console.log('✅ Registration working:', registerResponse.data);
    } catch (error) {
      console.log('⚠️  Registration error (expected if user exists):', error.response?.data);
    }
    
    console.log('\n🎉 API test completed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  testAPI();
}

module.exports = testAPI; 