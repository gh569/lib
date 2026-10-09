import withCssModule from "../utils/with-css-module";
import cssModule from "../utils/css-module";

const mystyle = cssModule`
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .text {
    color: #2c3e50;
    font-size: 36px;
    text-align: center;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .text:hover {
    transform: scale(1.05);
    color: #3498db;
  }
  
  .title {
    color: #34495e;
    font-size: 42px;
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    border-bottom: 3px solid #3498db;
    padding-bottom: 15px;
  }
  
  .card {
    background: white;
    border-radius: 10px;
    padding: 25px;
    margin: 20px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .subtitle {
    color: #e74c3c;
    font-size: 28px;
    margin-bottom: 15px;
    text-align: center;
  }
`;

function Test() {
  return (
    <div className="card">
      <h2 className="subtitle">测试组件</h2>
      <div className="text">Hello World!!!!!</div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="title">CSS Module 示例</h1>
      <div className="text">Hello World</div>
      <Test />
    </div>
  );
}

export default withCssModule(App, mystyle);