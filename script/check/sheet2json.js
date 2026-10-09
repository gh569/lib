import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 在 ESM 中创建 __dirname 等效变量
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 指定 Excel 文件路径
const filePath = path.join(__dirname, 'check.xlsx');

// 读取工作簿
const workbook = XLSX.readFile(filePath);

// 获取第一个工作表名称
const sheetName = workbook.SheetNames[0];

// 获取工作表数据
const worksheet = workbook.Sheets[sheetName];

// 读取所有数据（数组格式，用于获取表头）
const allDataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// 读取表头
const header = allDataArray.length > 0 ? allDataArray[0] : [];

// 读取所有数据（JSON格式，键值对形式）
const data = XLSX.utils.sheet_to_json(worksheet);

// 将 JSON 数据写入文件
fs.writeFileSync(path.join(__dirname, 'check_data.json'), JSON.stringify({
  header: header,
  data: data
}, null, 2));

console.log('数据已成功保存到 check_data.json');