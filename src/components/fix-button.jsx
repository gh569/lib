 
 /**
  * 
  * @param {*} param0 : {value, onClick,type}
  * @param {*} value : 按钮的文字
  * @param {*} onClick : 定义按钮的点击事件
  * @returns 
  */
 function FixButton({ value, onClick}) {
  
  const style = {
    position: "absolute",
    top: 'calc(100vh - var(--footer-height) - 86px)',
    right: "20px",
    zIndex: 9999,
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    fontSize: "13px",
    lineHeight: "56px",
    textAlign: "center",
    cursor: "pointer",
    // 添加过渡效果
    transition: "all 0.3s ease",
    // 添加阴影效果
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    
  };

  return <input type='button' onClick={onClick} style={style} value={value} /> ;
}

export default FixButton;