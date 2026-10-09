// import stylesContent from './app.css?raw'
import styles from './app.css.js'
// const styles=css ()//`.h1{color:green;text-align: right;}`
console.log(styles)
export default function App() {
  
  return (
    <div>
      <div className='parent'>
      <h1 className="h1">styled-jsx应用</h1>
      <div className='child1'>
        <h2 className="h1">styled-jsx应用</h2>
        </div>
      </div>
	  <Test />
      <style jsx >
        {
          styles
        }
      </style>
    </div>
  );
}

function Test(){
	return (<div>
		<h1 className='test-test-test-h123-h123'>Test</h1>
	<style jsx>
		{styles}
	</style>
	</div>)
}
