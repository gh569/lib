// 创建全局样式
import styled from "utils/styled.js";
styled.createGlobal`
  * {
  }
  body {
    
  }
`;
// 创建组件样式
export default  styled`
	&{
		color:blue;
		font-size: 20px;
    border: 0px;

	}
	h1  
			{
		text-align:center;
		border-bottom:4px double #ccc;
		color:blue;
	}
	
	.div-body{
		margin: 10px;
	}
	.row{
		display: flex;
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #ccc;
		/* justify-content:center; */
		align-items:center;
		color:#555;
	}

	.row-arrow{
		text-align: right;
    font-size: 16px;
	}

	.row-text{
		margin-right: auto;
		overflow: hidden;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
`;
