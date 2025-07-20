'use strict';
 
module.exports = async () => {
  // 运行数据库重置脚本
  await require('../../scripts/reset-db')();
  
  console.log('🎉 Bootstrap completed successfully!');
}; 