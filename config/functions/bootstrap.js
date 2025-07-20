'use strict';
 
module.exports = async () => {
  // 运行订阅计划种子数据
  await require('../../database/seeds/001_subscription_plans')();
  
  // 运行数据库初始化
  await require('../../scripts/init-database')();
  
  console.log('🎉 Bootstrap completed successfully!');
}; 